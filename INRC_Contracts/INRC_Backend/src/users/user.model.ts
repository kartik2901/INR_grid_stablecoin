import { Table, Column, Model, DataType, PrimaryKey, Default } from 'sequelize-typescript';
import { v4 as uuidv4 } from 'uuid';

@Table
export class User extends Model<User> {
  @PrimaryKey
  @Default(uuidv4)
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    allowNull: false,
  })
  id: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  email: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  firstName: string; 

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  middleName: string; 

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  lastName: string; 

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  phone: string; 

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  password: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
    unique: true,
  })
  panNumber: string; 

  @Column({
    type: DataType.STRING,
    allowNull: true,
    unique: true,
  })
  aadharNumber: string; 

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  isEmailVerified: boolean;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  verificationCode: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  resetCode: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  googleId: string;

  // New field to track KYC completion
  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,  // By default, KYC is not completed
  })
  isKycCompleted: boolean;
}
