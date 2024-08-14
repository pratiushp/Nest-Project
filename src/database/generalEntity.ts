import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Timestamp,
  UpdateDateColumn,
} from 'typeorm';

export enum Status {
  Active = 'Active',
  Inative = 'Inactive',
}

export class GeneralEntity extends BaseEntity {
  @CreateDateColumn({ name: 'CreatedAt', type: 'timestamptz' })
  createdAt: Timestamp;

  @UpdateDateColumn({ name: 'UpdateAt', type: 'timestamptz' })
  updatedAt: Timestamp;

  @Column({
    name: 'Status',
    type: 'enum',
    enum: Status,
    default: Status.Active,
  })
  status: Status;
}
