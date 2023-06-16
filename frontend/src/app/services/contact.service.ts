import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Contact } from '../models/contact';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  API_SERVER = "http://localhost:3000";
  constructor(
    private http: HttpClient,
  ) { }
  createContact(contact: Contact) {
    return this.http.post<Contact>(`${this.API_SERVER}/contacts/create`, contact);
  }
  getContact() {
    return this.http.get<Contact[]>(`${this.API_SERVER}/contacts`);
  }
  updateContact(contact: Contact, id: string) {
    return this.http.put<Contact>(`${this.API_SERVER}/contacts/${id}/update`, contact);
  }
  deleteContact(id: string) {
    return this.http.delete(`${this.API_SERVER}/contacts/${id}/delete`);
  }
}
