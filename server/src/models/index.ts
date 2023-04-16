import fs from "fs";
import path from "path";
import { Sequelize, DataTypes } from "sequelize";
import { dbConfig } from "../config/config";

const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const config = dbConfig[env];

const db = {} as any;

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".ts"
    );
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file)).default(
      sequelize,
      DataTypes
    );
    db[model.name] = model;
    console.log("Jaki model bazy? ", db[model.name]);
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;

export default db;
