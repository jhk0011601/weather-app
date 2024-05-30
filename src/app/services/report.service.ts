import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Report } from '../models/report.model';
import { map } from 'rxjs';
import { catchError } from 'rxjs/operators';

const baseUrl = 'http://localhost:8080/api/report';

@Injectable({
  providedIn: 'root',
})
export class ReportService {
  private apiUrl = 'http://localhost:8080/api/report';
  constructor(private http: HttpClient) {}

  // getAll(): Observable<Report[]> {
  //   // return this.http.get<Report[]>(baseUrl);
  //   return this.http
  //     .get<any[]>(this.apiUrl)
  //     .pipe(
  //       map((dataArray: Report[]) => dataArray.map((data) => new Report(data)))
  //     );
  // }

  getAll(page: number, recordsPerPage: number): Observable<any> {
    // Make an HTTP GET request to fetch data
    // Example URL: `/api/reports?page=${page}&perPage=${recordsPerPage}`
    return this.http.get<any>(
      `${this.apiUrl}?page=${page}&perPage=${recordsPerPage}`
    );
  }

  get(id: any): Observable<Report> {
    return this.http.get(`${baseUrl}/${id}`);
  }

  create(data: any): Observable<any> {
    return this.http.post(baseUrl, data);
  }

  update(id: any, data: any): Observable<any> {
    return this.http.put(`${baseUrl}/${id}`, data);
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`);
  }

  deleteAll(): Observable<any> {
    return this.http.delete(baseUrl);
  }

  findByTitle(title: any): Observable<Report[]> {
    return this.http.get<Report[]>(`${baseUrl}?title=${title}`);
  }
}
