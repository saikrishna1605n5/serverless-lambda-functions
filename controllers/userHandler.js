'use strict';

require('dotenv').config({ path: './variables.env' });

const User = require('../models/userModel');
const connectToDatabase = require('../server');

module.exports.hello = (event, context, callback) => {
  console.log('Hello World');
  callback(null, 'Hello World');
};

async function getData(info){
    return {
      statusCode: 200,
          body: JSON.stringify({
            status:'success',
            data:info
          })
        }
}
async function getError(info){
  return {
    statusCode: info.statusCode || 500,
    body: JSON.stringify({
      status:'fail',
      data:info
    })
  }
}

module.exports.create = async (event, context) => {
  try{
    context.callbackWaitsForEmptyEventLoop = true;
    const user = await User.create(JSON.parse(event.body));
      return getData(user);

      }catch(err){
      return getError(err);
  }
}

module.exports.getAll = async (event, context) => {
try{
  context.callbackWaitsForEmptyEventLoop = false;

    const users = await User.find();
      return getData(users);
      
      }catch(err){
        return getError(err);
      }
};


module.exports.update = async (event, context) => {
  try{
    context.callbackWaitsForEmptyEventLoop = true;
  const user = await User.findByIdAndUpdate(event.pathParameters.id, JSON.parse(event.body), {
      new: true
    })
      return getData(user);

  }catch(err){
        return getError(err);
  }
};

module.exports.delete = async (event , context) => {
  try{
    context.callbackWaitsForEmptyEventLoop = true;
  const user = await  User.findByIdAndRemove(event.pathParameters.id)
      return {
          statusCode: 200,
          body: JSON.stringify({
            message: 'Removed note with id: ' + note._id,
          })
        }
  }catch(err){
        return getError(err);
      }
  }


module.exports.getOne = async(event, context) => {
  try {
    context.callbackWaitsForEmptyEventLoop = true;
   const user =  await User.findById(event.pathParameters.id);
      return getData(user);
    }catch (err) {
      return getError(err);
  }
}

module.exports.getUserBasedOnTheName = async(event, context) => {
    try {
      context.callbackWaitsForEmptyEventLoop = true;
     const user =  await User.findOne({name : event.pathParameters.name});
        return getData(user);
      }catch (err) {
        return getError(err);
    }
  }

//------------------------this function is working ----------------------


// module.exports.getOne = (event, context, callback) => {
//   context.callbackWaitsForEmptyEventLoop = false;

//   connectToDatabase().then(() => {
//     Note.findById(event.pathParameters.id)
//       .then(note =>
//         callback(null, {
//           statusCode: 200,
//           body: JSON.stringify(note)
//         })
//       )
//       .catch(err =>
//         callback(null, {
//           statusCode: err.statusCode || 500,
//           headers: { 'Content-Type': 'text/plain' },
//           body: 'Could not fetch the note.'
//         })
//       );
//   });
// }`