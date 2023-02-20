import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth/auth.module';
import { ContactsController } from 'src/controllers/contacts/contacts.controller';
import { Contact } from 'src/entities/contact.entity';
import { UserModule } from 'src/User/user/user.module';
import { ContactService } from '../contact.service';

@Module({
    imports: [
        UserModule,
        AuthModule,
        TypeOrmModule.forFeature([Contact]),
      ],
      controllers: [ContactsController],
      providers: [ContactService],
})
export class ContactModule {}
