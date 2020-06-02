import { Component, OnInit } from '@angular/core';
import { FileSelectDirective, FileUploader ,FileDropDirective } from 'ng2-file-upload';
import {FileService} from './file.service';
import {ActivatedRoute,ParamMap,Router } from '@angular/router';

@Component({
  selector: 'app-fileuploads',
  templateUrl: './fileuploads.component.html',
  styleUrls: ['./fileuploads.component.css']
})
export class FileuploadsComponent implements OnInit {
  userid='';
  files = [];
  private url = 'http://localhost:3000/upload/'; 
   uploader: FileUploader;

   constructor(private fileService:FileService,private route:ActivatedRoute, private router:Router){
    
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
    });
    this.uploader.onAfterAddingFile = (file) => {
          file.withCredentials = false;
          };
  }

}
