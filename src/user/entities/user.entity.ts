import { GeneralEntity } from 'src/database/generalEntity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { OTP } from './otp.entity';

@Entity('User')
export class UserEntity extends GeneralEntity {
  @PrimaryGeneratedColumn({ name: 'Id', type: 'bigint' })
  id: number;

  @Column({ name: 'Name', type: 'varchar' })
  name: string;
  @Column({ name: 'Address', type: 'varchar', nullable: true })
  address: string;
  @Column({ name: 'Phone', type: 'varchar', nullable: true, unique: true })
  phone: string;
  @Column({ name: 'Email', type: 'varchar', unique: true })
  email: string;
  @Column({ name: 'Password', type: 'varchar' })
  password: string;

  @OneToMany(() => OTP, (otp) => otp.user)
  otps: OTP[];
}
