import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';
import {Product} from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  apiUrl = 'http://localhost:8080/api';

  constructor(protected http: HttpClient, protected router: Router) {
  }

  uploadFile(file): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/upload`, file);
  }

  getAllFiles(): Observable<[Product]> {
    return this.http.get<[Product]>(`${this.apiUrl}/`);
  }
}
