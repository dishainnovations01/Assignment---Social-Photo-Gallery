import { HttpErrorResponse } from '@angular/common/http';
import { Component,Inject, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PhotoGallery } from '../models/photo-gallery';
import { PhotoGalleryService } from '../services/photo-gallery-service.service';

@Component({
  selector: 'app-photo-gallery',
  templateUrl: './photo-gallery.component.html',
  styleUrls: ['./photo-gallery.component.css']
})
export class PhotoGalleryComponent implements OnInit {
  photogallery?: PhotoGallery 
  constructor(
    private _snackBar: MatSnackBar,
    private photogalleryservice: PhotoGalleryService,
  ) {
  }

  ngOnInit(): void {
   this.photogallery = new PhotoGallery()
  }

  CreateBase64String(fileInput: any) {
    if (fileInput.target.files && fileInput.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const image = new Image();
        image.src = e.target.result;
        image.onload = rs => {
          const imgBase64Path = e.target.result;
          this.photogallery!.image = imgBase64Path;         
          console.log(imgBase64Path);
        };
      };
      reader.readAsDataURL(fileInput.target.files[0]);
    }
  }

  
  save() {
      let data = {
        imageName: this.photogallery!.imageName,
        image: this.photogallery!.image,
        description: this.photogallery!.description
      };
      console.log(data)
      this.photogalleryservice.insertGalleryImage(data).subscribe(
          (result: any) => {
            // this.photogallery = result;
            this.openSnackBar('Image saved successfully', 'SAVED');
          },
          (err: HttpErrorResponse) => {
            this.openSnackBar('Category cannot be saved.', 'ERROR');
          }
        );
    
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 5000,
    });
  }
}
