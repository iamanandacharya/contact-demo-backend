import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class Contact {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', nullable: false})
  name: string;

  @Column({ type: 'varchar', nullable: false})
  title: string;

  @Column({ type: 'varchar', nullable: false})
  email: string;

  @Column({ type: 'varchar', nullable: false})
  phone: string;

  @Column({ type: 'varchar', nullable: false})
  address: string;

  @Column({ type: 'varchar', nullable: false})
  city: string;
}
