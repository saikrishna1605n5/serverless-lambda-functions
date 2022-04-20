// const mongoose = require('mongoose');
//     mongoose.Promise = global.Promise;
//     let isConnected;
//     module.exports = connectToDatabase = () => {
//       if (isConnected) {
//         console.log('=> using existing database connection');
//         return Promise.resolve();
//       }
//       console.log('=> using new database connection');
//       return mongoose.connect(process.env.DB).then(db => {
//         isConnected = db.connections[0].readyState;
//       });
//     };



const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: './variables.env' });
mongoose.Promise = global.Promise;
    mongoose.connect(process.env.DB, {
        useNewUrlParser: true,
        useUnifiedTopology: true,   })   
    .then(() => console.log("Database connected!"))


