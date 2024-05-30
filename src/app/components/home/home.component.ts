import { Component, OnInit } from '@angular/core';
import { HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import moment from 'moment';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ReportService } from '../../services/report.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  providers: [HttpClientModule],
})
export class HomeComponent implements OnInit {
  reports: any[] = [];
  currentPage: number = 1;
  totalRecords: number = 0;
  recordsPerPage: number = 10; // Ensure recordsPerPage is properly initialized
  totalPages: number = 0;
  showSuccessAlert: boolean = false;

  constructor(private reportService: ReportService) {}

  ngOnInit(): void {
    this.loadReports(this.currentPage);
  }

  loadReports(page: number): void {
    this.reportService.getAll(page, this.recordsPerPage).subscribe(
      (response: any) => {
        this.reports = response.data;
        this.totalRecords = response.totalRecords || 0;
        this.totalPages = Math.ceil(this.totalRecords / this.recordsPerPage);
        console.log(
          `Total Records: ${this.totalRecords}, Total Pages: ${this.totalPages}`
        );
      },
      (error) => {
        console.error('Error fetching reports:', error);
      }
    );
  }

  firstPage(): void {
    if (this.currentPage > 1) {
      this.currentPage = 1;
      this.loadReports(this.currentPage);
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.loadReports(this.currentPage);
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadReports(this.currentPage);
    }
  }

  lastPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage = this.totalPages;
      this.loadReports(this.currentPage);
    }
  }

  formatDate(date: string): string {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
    return new Date(date).toLocaleDateString(undefined, options);
  }

  confirmDelete(reportId: string): void {
    if (window.confirm('Are you sure you want to delete this report?')) {
      // Call the delete method here
      this.deleteReport(reportId);
    }
  }

  deleteReport(reportId: string): void {
    // Call the service method to delete the report from the server
    this.reportService.delete(reportId).subscribe(
      () => {
        // If deletion from server is successful, remove the report from the view
        this.reports = this.reports.filter((report) => report._id !== reportId);
        this.showSuccessAlert = true;
      },
      (error: HttpErrorResponse) => {
        console.error('Error deleting report:', error);
      }
    );
  }

  dismissAlert(): void {
    this.showSuccessAlert = false;
  }
}
