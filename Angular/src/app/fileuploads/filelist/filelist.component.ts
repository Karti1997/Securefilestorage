import { Component,ViewChild,ElementRef,OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { FileSelectDirective, FileUploader ,FileDropDirective } from 'ng2-file-upload';
import {FileService} from '../file.service';
import {ActivatedRoute,ParamMap } from '@angular/router';
import { MatIconRegistry } from "@angular/material/icon";
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-filelist',
  templateUrl: './filelist.component.html',
  styleUrls: ['./filelist.component.scss']
})
export class FilelistComponent implements OnInit {
  userid='';
  files = [];
  list=[];
  private url = 'http://localhost:3000/upload/'; 
   uploader: FileUploader;
   @ViewChild('searchbar',{static: true}) searchbar: ElementRef;
   searchText = '';
 
   toggleSearch: boolean = false;
 
   constructor(private fileService:FileService,private route:ActivatedRoute){
    
  }
  openSearch() {
    this.toggleSearch = true;
    this.searchbar.nativeElement.focus();
  }
  searchClose() {
    this.searchText = '';
    this.toggleSearch = false;
  }
 

  downloadPdf(filename, contentType) {
    this.fileService.downloadPDF(filename, contentType).subscribe(
      (res) => {
      const file = new Blob([res.blob()], { type: contentType });
      const fileURL = URL.createObjectURL(file);
      window.open(fileURL);
      }
    );
  }

  ngOnInit(): void {
    
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has("userId")) {
        this.userid = paramMap.get("userId");
      }
    });
    this.uploader = new FileUploader({url: 'http://localhost:3000/upload/'+this.userid});
    this.fileService.showFileNames(this.userid).subscribe(response => {
      for (let i = 0; i < response.json().length; i++) {
        console.log(response);
        if(this.userid==response.json()[i].filename.user){
          console.log("particular user");
          this.files.push( {
            //user: response.json()[i].filename.user,
            filename: response.json()[i].filename.filename,
            originalname: response.json()[i].originalname,
            contentType: response.json()[i].contentType
          });
        }
        
      }
      this.list=this.files;
    });
    this.uploader.onAfterAddingFile = (file) => {
          file.withCredentials = false;
          };
  }

}
