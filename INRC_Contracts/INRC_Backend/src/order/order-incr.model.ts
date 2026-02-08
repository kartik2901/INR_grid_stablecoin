import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table
export class OrderInrc extends Model<OrderInrc> {
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    transactionHash: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    userId: string;


    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    userAddress: string;

    @Column({
        type: DataType.FLOAT,
        allowNull: false,
    })
    amount: number;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    chain: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    purpose: string;


    @Column({
        type: DataType.ENUM('Deposit', 'Withdraw'),
        allowNull: false,
    })
    transactionType: 'Deposit' | 'Withdraw';


    @Column({
        type: DataType.ENUM('Done', 'Pending', 'Cancel'),
        allowNull: false,
    })
    status: 'Done' | 'Pending' | 'Cancel';

}
