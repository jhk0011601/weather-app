import { Component, OnInit, Renderer2, ElementRef } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReportService } from '../../services/report.service';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css',
})
export class EditComponent {
  reportForm: FormGroup;
  showAlert: boolean = false;
  renderer: any;
  elRef: any;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private reportService: ReportService
  ) {
    this.reportForm = this.fb.group({
      formatted_date: [''],
      summary: [''],
      precip_type: [''],
      temperature: [''],
      apparent_temperature: [''],
      humidity: [''],
      wind_speed: [''],
      wind_bear: [''],
      visibility: [''],
      cloud_cover: [''],
      pressure: [''],
      daily_summary: [''],
    });
  }

  ngOnInit(): void {
    const reportId = this.route.snapshot.paramMap.get('id');
    if (reportId) {
      this.reportService.get(reportId).subscribe((report: any) => {
        if (report.formatted_date) {
          report.formatted_date = this.formatDateForInput(
            report.formatted_date
          );
        }
        this.reportForm.patchValue(report);
      });
    }
  }

  formatDateForInput(date: string): string {
    const d = new Date(date);
    return d.toISOString().split('T')[0];
  }

  onSubmit(): void {
    if (this.reportForm.valid) {
      const reportId = this.route.snapshot.paramMap.get('id');
      this.reportService.update(reportId!, this.reportForm.value).subscribe(
        (response: any) => {
          console.log('Report updated successfully', response);
          this.showSuccessAlert();
        },
        (error: any) => {
          console.error('Error updating report', error);
        }
      );
    }
  }

  showSuccessAlert(): void {
    this.showAlert = true;
  }

  hideAlert(): void {
    this.showAlert = false;
  }
}
