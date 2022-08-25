import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { PhotoGalleryComponent } from './photo-gallery/photo-gallery.component';

const routes: Routes = [  {
  path: '',
  redirectTo: 'dashboard',
  pathMatch: 'full',
},{
  path: 'login',
  component: LoginComponent,

},{
  path: 'dashboard',
  component: PhotoGalleryComponent,
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 
  
}
