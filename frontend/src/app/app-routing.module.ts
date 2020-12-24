import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';


const routes: Routes = [
  {
    path: 'upload',
    loadChildren: () => import('./views/upload/upload.module').then(m => m.UploadModule)
  },
  { path: 'home', loadChildren: () => import('./views/home/home.module').then(m => m.HomeModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
