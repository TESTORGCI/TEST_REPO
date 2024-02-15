import dotenv from 'dotenv';
import express from 'express';
import router from './Routes/router.js';
import DbContext from './DataContext/dbContext.js';
import defaultHeaders from './Middlewear/responseHeaders.js';

// ENVIRONMENT VARIABLES CONFIGURATION
dotenv.config();

//EXPRESS APPLICATION INSTANCE
const App = express();


//MIDDLEWEAR CONFIGURATION OF THE APP
App.use(defaultHeaders);
App.use(express.json());
App.use(router);


const hostname = process.env.WEBSERVER_HOSTNAME;
const port = process.env.PORT;

// async function App() {
//   try {
//     await DbContext.sync();
//     app.listen(port, hostname, () => {
//       console.log(`Server running at http://${hostname}:${port}/`);
//     });
//   } catch (error) {
    
//     //DATABASE SYNC FAILED DUE TO SERVICE UNAVIALABILITY, STARTING THE SERVER
//     app.listen(port, hostname, () => {
//       console.log(`Server running at http://${hostname}:${port}/`);
//     });
//   }
// }

// // CHECK DB CONNECTIVITY AND START THE APP
// App();
try{
  DbContext.sync().then(() => {
    console.log('Database synchronized');
    App.listen(port, () => {
        console.log(`Server running on port ${port}.`);
    });
  }).catch((error) => {
    console.error('Unable to start the application: Check database connectivity');
  });
} catch(error){
  console.error('Unable to start the application');
}


export default App;
