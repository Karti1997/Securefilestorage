import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { HomecomponentComponent } from './homecomponent/homecomponent.component';
import {FileuploadsComponent} from './fileuploads/fileuploads.component';
import {FilelistComponent} from './fileuploads/filelist/filelist.component';

const routes: Routes = [
  {path:'fileuploads',component:FileuploadsComponent},
  {path:'',component:HomecomponentComponent},
  {path: 'fileuploads/:userId', component: FileuploadsComponent },
  {path: 'filelist/:userId', component:FilelistComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
