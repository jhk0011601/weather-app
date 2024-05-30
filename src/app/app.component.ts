import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { FooterComponent } from './partials/footer/footer.component';
import { NavigationComponent } from './partials/navigation/navigation.component';
import { HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ReportService } from './services/report.service';
import { Report } from './models/report.model';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    FooterComponent,
    NavigationComponent,
    HomeComponent,
    AboutComponent,
    RouterLink,
    FormsModule,
    HttpClientModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [HttpClientModule, ReportService],
})
export class AppComponent {
  title = 'weather-app';
}
