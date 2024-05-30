const express = require("express");
const cors = require("cors");

const app = express();

var corsOptions = {
  origin: true,
};

app.use(cors(corsOptions));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

const db = require("./models");
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch((err) => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });

app.get("/", (req, res) => {
  res.json({ message: "NODEJS EXPRESS MONGODB - API" });
});

app.get("/api/report", async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const totalRecords = await db.report.countDocuments();
    const data = await db.report
      .find()
      .sort({ _id: -1 })
      .skip(skip)
      .limit(limit);

    res.json({ data, totalRecords });
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while retrieving reports.",
    });
  }
});

app.get("/api/report/:id", async (req, res) => {
  try {
    const reportId = req.params.id;
    const report = await db.report.findById(reportId);

    if (!report) {
      return res.status(404).send({ message: "Report not found" });
    }

    res.json(report);
  } catch (err) {
    res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving the report.",
    });
  }
});

app.get("/api/report", async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const totalRecords = await db.report.countDocuments();
    const data = await db.report
      .find()
      .sort({ _id: -1 })
      .skip(skip)
      .limit(limit);

    res.json({ data, totalRecords });
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while retrieving reports.",
    });
  }
});

app.put("/api/report/:id", async (req, res) => {
  try {
    const reportId = req.params.id;
    const updateData = req.body;

    const updatedReport = await db.report.findByIdAndUpdate(
      reportId,
      updateData,
      { new: true }
    );

    if (!updatedReport) {
      return res.status(404).send({ message: "Report not found" });
    }

    res.json({ message: "Report updated successfully", data: updatedReport });
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while updating the report.",
    });
  }
});

app.post("/api/report", async (req, res) => {
  try {
    const newReport = new db.report(req.body);
    await newReport.save();
    res.status(201).send(newReport);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while adding the report.",
    });
  }
});

app.delete("/api/report/:id", async (req, res) => {
  const id = req.params.id;

  try {
    await db.report.findByIdAndDelete(id);

    res.status(200).json({ message: "Report deleted successfully" });
  } catch (error) {
    console.error("Error deleting report:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
