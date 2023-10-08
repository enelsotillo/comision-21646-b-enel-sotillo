import { Sequelize } from "sequelize";
//const db_foros = process.env.DB_TABLE;

export const sequelize = new Sequelize("db_foros","root", "", {
    host: "localhost",
    dialect: "mysql",
  });

 export const startDb = async () => {
    try {
        await sequelize.authenticate();
        //await sequelize.sync({force: true}); // solo guardar borra toda de la bd y los id inicio desde 1
        await sequelize.sync();
        console.log('Connection has been established successfully.');
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
  }
  