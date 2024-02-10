import dotenv from 'dotenv';
import express from 'express';
import router from './Routes/router.js';
import DbContext from './DataContext/DbContext.js';
import defaultHeaders from './Middlewear/responseHeaders.js';

// ENVIRONMENT VARIABLES CONFIGURATION
dotenv.config();

//EXPRESS APPLICATION INSTANCE
const app = express();


//MIDDLEWEAR CONFIGURATION OF THE APP
app.use(defaultHeaders);
app.use(express.json());
app.use(router);


const hostname = process.env.WEBSERVER_HOSTNAME;
const port = process.env.PORT;

async function App() {
  try {
    await DbContext.sync();
    app.listen(port, hostname, () => {
      console.log(`Server running at http://${hostname}:${port}/`);
    });
  } catch (error) {
    
    //DATABASE SYNC FAILED DUE TO SERVICE UNAVIALABILITY, STARTING THE SERVER
    app.listen(port, hostname, () => {
      console.log(`Server running at http://${hostname}:${port}/`);
    });
  }
}

// CHECK DB CONNECTIVITY AND START THE APP
App();