import { GeneralEntity } from 'src/database/generalEntity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { UserEntity } from './user.entity';

@Entity()
export class OTP extends GeneralEntity {
  @PrimaryGeneratedColumn({ name: 'Id' })
  id: number;
  @Column({ name: 'OtpCode' })
  otpCode: string;

  @Column({ name: 'ExpiresAt' })
  expiresAt: Date;

  @ManyToOne(() => UserEntity, (user) => user.otps)
  @JoinColumn()
  user: UserEntity;
}
