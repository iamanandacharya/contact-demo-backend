import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert } from "typeorm";
import * as bcrypt from 'bcrypt';
@Entity() 
export class User {
    @PrimaryGeneratedColumn('uuid') id: string;
    @Column({ type: 'varchar', nullable: false, unique: true }) username: string;
    @Column({ type: 'varchar', nullable: false }) password: string;
    @Column({ type: 'varchar', nullable: false }) email: string;
    //  @BeforeInsert() hook that the code uses from TypeORM module. This hook runs and gives the developer the opportunity to run any code before saving the Entity in the database
    // the code hashes the original password entered by 
    // the user so that you don't store any plain text passwords. 
    //For this purpose, the code makes use of a bcyrpt package to do so.
    @BeforeInsert() async hashPassword() {
        this.password = await bcrypt.hash(this.password, 10);
    }
}