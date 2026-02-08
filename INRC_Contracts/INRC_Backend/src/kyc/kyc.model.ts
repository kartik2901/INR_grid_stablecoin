import { Table, Column, Model, DataType, PrimaryKey, Default, ForeignKey } from 'sequelize-typescript';
import { User } from 'src/users/user.model';
import { v4 as uuidv4 } from 'uuid';

@Table
export class Kyc extends Model<Kyc> {
	@PrimaryKey
	@Default(uuidv4)
	@Column({
	  type: DataType.UUID,
	  defaultValue: DataType.UUIDV4,
	  allowNull: false,
	})
	id: string;
  
	@ForeignKey(() => User)
	@Column({
	  type: DataType.UUID,
	  allowNull: false,
	})
	userid: string;

	@Column({
		type: DataType.STRING,
		allowNull: false,
	})
	documentType: string;

	@Column({
		type: DataType.STRING,
		allowNull: false,
	})
	documentNumber: string;

	@Column({
		type: DataType.STRING,
		defaultValue: 'pending',
	})
	status: string;

	@Column({
		type: DataType.STRING,
		allowNull: true,
	})
	rejectionReason: string;

	@Column({
		type: DataType.DATE,
		defaultValue: DataType.NOW,
	})
	submittedAt: Date;

	@Column({
		type: DataType.DATE,
		allowNull: true,
	})
	updatedAt: Date;
}
