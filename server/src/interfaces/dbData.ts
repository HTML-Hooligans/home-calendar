import { Model } from "sequelize";

export interface UserAttributes {
  id: number;
  firstname: string;
  lastname: string;
  class: string;
  age: number;
}

export interface UserInstance extends Model<UserAttributes>, UserAttributes {}
