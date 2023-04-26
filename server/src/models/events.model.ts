import "reflect-metadata";
import { Model, Table, Column, DataType } from "sequelize-typescript";

@Table({ tableName: "events" })
export class Event extends Model {
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
