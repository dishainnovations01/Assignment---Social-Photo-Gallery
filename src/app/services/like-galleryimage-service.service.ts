import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PhotoGallery } from '../models/photo-gallery';

@Injectable({
  providedIn: 'root'
})
export class LikeGalleryImageService {
  _url = 'likedislike/';

  constructor(private http:HttpClient) {}

  getGallery(headers: any,params:HttpParams): Observable<any> {
    return this.http.get<any>(this._url, { headers: headers,params: params });
  }

  likeGalleryImage(data: any) {
    return this.http.post<LikeGalleryImageService>(this._url, data);
  }

  updateGalleryImage(data: any) {
    return this.http.patch<LikeGalleryImageService>(this._url, data);
  }

  deleteGalleryImage(data: any) {
    return this.http.delete<any>(this._url, { params: { _id: data } });
  }
}
