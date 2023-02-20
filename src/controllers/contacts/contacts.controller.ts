import { Controller, Get, Post,Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ContactService } from 'src/contact/contact.service';
import { Contact } from 'src/entities/contact.entity';

@Controller('contacts')
export class ContactsController {
    constructor(
        private contactService: ContactService
    ) {
    }
    @Get()
        read(): Promise<Contact[]> {
            return this.contactService.readAll();
    }
    @UseGuards(AuthGuard()) 
    @Post('create')
    async create(@Body() contact: Contact): Promise<Contact> {
        return this.contactService.create(contact);
    }
    @UseGuards(AuthGuard()) 
    @Put(':id/update')
    async update(@Param('id') id, @Body() contact: Contact): Promise<any> {
        contact.id = Number(id)
        return this.contactService.update(contact);
    }
    @UseGuards(AuthGuard()) 
    @Delete(':id/delete')
    async delete(@Param('id') id): Promise<any> {
        return this.contactService.delete(id);
    }

}
