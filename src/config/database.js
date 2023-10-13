import { Sequelize } from "sequelize";
import "dotenv/config";

export const sequelize = new Sequelize(process.env.DB_NAME,process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: "mysql",
  });

 export const startDb = async () => {
    try {
       //para prueba de error
        console.log(process.env.DB_NAME)
        console.log(process.env.DB_HOST)
        console.log(process.env.DB_USER)
        console.log(process.env.DB_PASSWORD)
        await sequelize.authenticate();
        //await sequelize.sync({force: true}); // solo guardar borra toda de la bd y los id inicio desde 1
        await sequelize.sync();
        console.log('Connection has been established successfully.');
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
  }
  