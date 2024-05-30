import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ReportService } from '../../services/report.service';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add.component.html',
  styleUrl: './add.component.css',
})
export class AddComponent {
  reportForm: FormGroup;
  showAlert: boolean = false;

  constructor(
    private fb: FormBuilder,
    private reportService: ReportService,
    private router: Router
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

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.reportForm.valid) {
      this.reportService.create(this.reportForm.value).subscribe(
        (response) => {
          this.showAlert = true;
          this.reportForm.reset();
          this.router.navigate(['/']);
        },
        (error) => {
          console.error('Error adding report:', error);
        }
      );
    }
  }

  hideAlert(): void {
    this.showAlert = false;
  }
}
