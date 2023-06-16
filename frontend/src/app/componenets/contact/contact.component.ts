import { Component, OnInit } from '@angular/core';
import { Contact } from 'src/app/models/contact';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit{
  displayedColumns  :  string[] = ['id', 'name', 'title', 'email', 'phone', 'address', 'city', 'actions'];
  dataSource  = [];
  contactData: any[]= [];
  private contactSubscription: any;
  contact = {
    name: '',
    address: '',
    city: '',
    email: '',
    id: '',
    phone: '',
    title: '',

  };
  constructor(
    private contactService: ContactService
  ) {
  }
ngOnInit(): void {
  this.getContact();
}
ngOnDestroy(): void {
  //Called once, before the instance is destroyed.
  //Add 'implements OnDestroy' to the class.
  this.contactSubscription.unsubscribe();
}
selectContact(contact: any){
  console.log("selected: ", contact);

  this.contact = contact;
  console.log("selected: ", this.contact.name);
}

newContact(){
  this.contact = {name: '',
  address: '',
  city: '',
  email: '',
  id: '',
  phone: '',
  title: '',};
}
getContact() {
  this.contactSubscription = this.contactService.getContact().subscribe((response: any) => {
    this.contactData = response;
    console.log(' this.contactData' +  JSON.stringify(this.contactData));
  });
}
createContact(contact: any) {
  console.log('create contact' + this.contact);

  this.contactService.createContact(contact.value).subscribe((res) => {
    console.log('create contact' + JSON.stringify(res));
  })
}
updateContact(contact: any) {
  console.log('create contact' + this.contact.id);

  // contact.value.id = this.contact['id'];
  this.contactService.updateContact(contact.value, this.contact.id).subscribe((res) => {
    console.log('create contact' + JSON.stringify(res));
  })
}
deleteContact(id: string) {
  this.contactService.deleteContact(id).subscribe((res) => {
    console.log('create contact' + JSON.stringify(res));
  })
}
}
