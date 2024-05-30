module.exports = (mongoose) => {
  const Report = mongoose.model(
    "report",
    mongoose.Schema({
      formatted_date: "string",
      summary: "string",
      precip_type: "string",
      temperature: "number",
      apparent_temperature: "number",
      humidity: "number",
      wind_speed: "number",
      wind_bear: "number",
      visibility: "number",
      loud_cover: "number",
      pressure: "number",
      daily_summary: "string",
    })
  );

  return Report;
};
