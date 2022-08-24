import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PhotoGallery } from '../models/photo-gallery';

@Injectable({
  providedIn: 'root'
})
export class PhotoGalleryService {
  _url = 'photogallery/';

  constructor(private http:HttpClient) {}

  getGallery(headers: any,params:HttpParams): Observable<any> {
    return this.http.get<any>(this._url, { headers: headers,params: params });
  }

  insertGalleryImage(data: any) {
    return this.http.post<PhotoGallery>(this._url, data);
  }

  updateGalleryImage(data: any) {
    return this.http.patch<PhotoGallery>(this._url, data);
  }

  deleteGalleryImage(data: any) {
    return this.http.delete<any>(this._url, { params: { _id: data._id } });
  }
}
