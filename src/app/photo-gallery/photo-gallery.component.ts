import { HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Component, HostListener, Inject, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PhotoGallery } from '../models/photo-gallery';
import { PhotoGalleryService } from '../services/photo-gallery-service.service';
import { ScrollEvent, Utility } from 'src/app/models/utilitt';
import { environment } from 'src/environments/environment';
import { LikeGalleryImageService } from '../services/like-galleryimage-service.service';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import { User } from '../models/user';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-photo-gallery',
  templateUrl: './photo-gallery.component.html',
  styleUrls: ['./photo-gallery.component.css']
})
export class PhotoGalleryComponent implements OnInit {
  photogallery?: PhotoGallery
  photogalleryList: PhotoGallery[] = []
  page = 1;
  userId: string = ""
  params = new HttpParams;
  user?: User
  socket?: WebSocket;

  constructor(
    private _snackBar: MatSnackBar,
    private photogalleryservice: PhotoGalleryService,
    private likephotogalleryservice: LikeGalleryImageService,
    private userservice: LoginService,
    private rooute: Router

  ) {
    this.socket = new WebSocket(environment.WS_URL);

    this.socket?.addEventListener('open', function (event) {
      console.log("Connected...");
    });
  }
  @ViewChild('login') login?: NgForm;

  @HostListener('window:scroll', ['$event'])
  onWindowScroll($event: any) {
    console.log($event)
    if (ScrollEvent.ReachedToEnd($event)) {
      this.page++;
      this.fillData();
    }
  }

  
  
  ngOnInit(): void {
     this.userId = localStorage.getItem("user") || "";
    let userDataId = localStorage.getItem("user") || "";
    this.params = this.params.set("_id", userDataId)
    if(userDataId==""){
      this.rooute.navigateByUrl('/login')
    }else{
      this.userservice.getUserDetails(this.params).subscribe((result) => {
        this.user = result;
      });
    }

    this.socket?.addEventListener('message', (event) => {
      console.log(JSON.parse(event.data))
      let resData = JSON.parse(event.data)
      this.photogalleryList.forEach(elemement => {
        if (elemement._id == resData._id) {
          elemement.liked = resData.liked
          elemement.disliked = resData.disliked
          elemement.dislikeReactions = resData.dislikeReactions
          elemement.likeReactions = resData.likeReactions
        }
      })
    });
    this.photogallery = new PhotoGallery()
    this.fillData();
  }

  fillData() {
    let headers = {
      page: this.page.toString(),
      limit: "10",
    };
    let userDataId = localStorage.getItem("user") || "";
    this.params = this.params.set("userId", userDataId)
    this.photogalleryservice.getGallery(headers, this.params).subscribe((result) => {
      console.log(result)
      this.photogalleryList?.push(...result);
      console.log(this.photogalleryList)
    });
  }

  getImagePath(imageName: string) {
    console.log(Utility.baseImageUrl)
    return Utility.baseImageUrl + imageName;
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
        this.photogalleryList?.push(result);
        this.openSnackBar('Image saved successfully', 'SAVED');
        this.photogallery = new PhotoGallery()

      },
      (err: HttpErrorResponse) => {
        this.openSnackBar('Image cannot be saved.', 'ERROR');
      }
    );

  }

  like(imageId: string) {
    console.log(imageId)
    let data = {
      imageId: imageId,
      userId: this.userId,
      like: true
    };
    console.log(data)
    this.likephotogalleryservice.likeGalleryImage(data).subscribe(
      (result: any) => {
        this.photogalleryList.forEach(elemement => {
          if (elemement._id == imageId) {
            elemement.liked = result.liked
            elemement.disliked = result.disliked
            elemement.dislikeReactions = result.dislikeReactions
            elemement.likeReactions = result.likeReactions
          }
        })
        this.openSnackBar('Image liked Successfully', 'SAVED');
      },
      (err: HttpErrorResponse) => {
        this.openSnackBar('Cannot Like Image.', 'ERROR');
      }
    );
  }

  unlike(imageId: string) {
    console.log(imageId)
    let data = {
      imageId: imageId,
      userId: this.userId,
      dislike: true
    };
    console.log(data)
    this.likephotogalleryservice.likeGalleryImage(data).subscribe(
      (result: any) => {
        this.photogalleryList.forEach(elemement => {
          if (elemement._id == imageId) {
            elemement.liked = result.liked
            elemement.disliked = result.disliked
            elemement.dislikeReactions = result.dislikeReactions
            elemement.likeReactions = result.likeReactions
          }
        })
        this.openSnackBar('Image Disliked successfully', '');
      },
      (err: HttpErrorResponse) => {
        this.openSnackBar('Cannot Dislike Image.', 'ERROR');
      }
    );
  }


  deleteimage(imageId: string) {
    if (confirm("Are You sure you want to delete the image!")) {
      this.photogalleryservice.deleteGalleryImage(imageId).subscribe(
        (result: any) => {
  
          this.photogalleryList?.splice(this.photogalleryList.findIndex(ele => ele._id == imageId), 1);
          this.openSnackBar('Image Deleted Successfully', '');
        },
        (err: HttpErrorResponse) => {
          this.openSnackBar('Cannot Delete Image.', 'ERROR');
        }
      );
    }

  }
  logOut() {
    localStorage.clear()
    this.rooute.navigateByUrl('/login')
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 5000,
    });
  }
}
