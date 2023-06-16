import { NgModule } from '@angular/core';
import { Router, RouterModule, Routes } from '@angular/router';
import { ContactComponent } from './componenets/contact/contact.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: "contacts"},
  { path: 'contacts', component: ContactComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {
  
 }
