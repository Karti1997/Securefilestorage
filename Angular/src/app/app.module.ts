import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FileUploadModule } from 'ng2-file-upload';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import {CommonModule} from '@angular/common';
import { MatToolbarModule, MatIconModule, MatTabsModule, MatCardModule,MatInputModule,MatListModule} from '@angular/material';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomecomponentComponent } from './homecomponent/homecomponent.component';
import { FileuploadsComponent } from './fileuploads/fileuploads.component';
import {FilelistComponent} from './fileuploads/filelist/filelist.component';
import {LoginComponent} from './homecomponent/login/login.component';
import {StudentComponent} from './homecomponent/student/student.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import {FilterPipe} from './fileuploads/filelist/filter.pipe';
import { Browser } from 'protractor';

@NgModule({
  declarations: [
    AppComponent,
    HomecomponentComponent,
    FileuploadsComponent,
    FilelistComponent,
    LoginComponent,
    StudentComponent,
    FilterPipe
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    AppRoutingModule,
    FileUploadModule,HttpModule,
    MatToolbarModule,MatIconModule,
    MatTabsModule,MatCardModule,
    MatInputModule,MatListModule,
    FormsModule,ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
