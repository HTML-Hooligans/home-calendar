import 'reflect-metadata';
import { Model, Table, Column, DataType, Index } from 'sequelize-typescript';

@Table({
  timestamps: false,
  tableName: 'events',
})
export class Event extends Model {
  @Index
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  userID! : number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  eventName!: string;

  @Column({
    type: DataType.DATEONLY,
    allowNull: false,
  })
  eventDate!: Date;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  description!: string;
}
