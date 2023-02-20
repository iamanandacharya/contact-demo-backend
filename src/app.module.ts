import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Contact } from './entities/contact.entity';
import { User } from './User/user/user.entity';
import { ContactsController } from './controllers/contacts/contacts.controller';
import { ContactService } from './contact/contact.service';
import { UserModule } from './User/user/user.module';
import { AuthModule } from './auth/auth/auth.module';
import { ContactModule } from './contact/contact/contact.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'nest_db_config',
      password: 'nest_DB_c0nf!g',
      database: 'nest_db_config',
      entities:  [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    UserModule,
    AuthModule,
    ContactModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
