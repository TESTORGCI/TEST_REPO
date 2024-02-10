import { Sequelize } from "sequelize";
import dotenv from "dotenv";
import mysql from "mysql2/promise";

dotenv.config();

const database = process.env.DATABASE;
const databaseUser = process.env.DATABASE_USER;
const databasePassword = process.env.DATABASE_PASSWORD;
const databaseHostName = process.env.DATABASE_HOSTNAME;
const databasePort = process.env.DB_PORT;
const dialect = process.env.DIALECT;

try{
    const mySqlConnection = await mysql.createConnection({
        host: databaseHostName,
        port: databasePort,
        user: databaseUser,
        password: databasePassword
    });
          
    // CREATE DATABASE IF DOES NOT EXISTS IN THE SERVER
    await mySqlConnection.query(`CREATE DATABASE IF NOT EXISTS \`${database}\`;`);
          
    // CLOSE CONNECTION
    await mySqlConnection.end();
} catch(error){

}


//DATABASE CONTEXT
const DbContext = new Sequelize(
    database,
    databaseUser,
    databasePassword,
    {
        host : databaseHostName,
        dialect : dialect,
        // timezone : '-05:00',
        dialectOptions: {
            useUTC: false
        },
    },
);

export default DbContext;