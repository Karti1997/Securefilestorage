import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Http} from '@angular/http';
import {Router } from '@angular/router';
import { AuthData } from './auth-data.model';

@Injectable({providedIn: "root"})
export class AuthService{

    private token:string;
    private userId:string;
    public authenticateduser:boolean;
    constructor(private http: Http,private router: Router,private http1:HttpClient){}
    
    createUser(firstname: string,username: string,password: string,confirmpassword: string,email: string,phoneno:Number){
        const authdata:AuthData ={firstname: firstname,
            username: username,
            password: password,
            confirmpassword: confirmpassword,
            email: email,
            phoneno:phoneno}
         this.http1.post<{message:string,id:string}>('http://127.0.0.1:3000/api/user/signup',authdata)
        .subscribe(response=>{
            console.log(response.message);
            this.router.navigate(['/fileuploads',response.id]);
        })
        
    }
    login(username: string, password:string){
        const authdata ={username: username,password: password};
        this.http1.post<{token: string,userId: string}>("http://localhost:3000/api/user/login",authdata)
        .subscribe(response =>{
            //console.log(response);
            const token=response.token;
            this.token=token;
            if (token) {
                this.userId=response.userId;
                console.log(this.userId);
                this.router.navigate(['/filelist',this.userId]);
              } else{
                alert('Invalid credentials');
              }
        })
    }
}