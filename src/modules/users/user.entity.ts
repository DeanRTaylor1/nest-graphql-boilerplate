import {
  Table,
  Column,
  Model,
  PrimaryKey,
  AutoIncrement,
  Unique,
  IsEmail,
  Default,
  DataType,
} from 'sequelize-typescript';

import { RoleEnum, UserStatusEnum } from './user.enum';

@Table({ tableName: 'users', timestamps: true, underscored: true })
export class User extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id: number;

  @Unique
  @Column(DataType.STRING)
  username: string;

  @Column({ field: 'first_name', type: DataType.STRING })
  firstName: string;

  @Column({ field: 'last_name', type: DataType.STRING })
  lastName?: string;

  @Unique
  @IsEmail
  @Column(DataType.STRING)
  email: string;

  @Column({ field: 'password', type: DataType.STRING })
  password: string;

  @Default('inactive')
  @Column(DataType.ENUM(...Object.values(UserStatusEnum)))
  status?: string;

  @Default('user')
  @Column(DataType.ENUM(...Object.values(RoleEnum)))
  role?: string;

  @Column({ field: 'created_at', type: DataType.DATE })
  createdAt: Date;

  @Column({ field: 'updated_at', type: DataType.DATE })
  updatedAt: Date;
}
