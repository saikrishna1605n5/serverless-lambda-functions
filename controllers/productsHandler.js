'use strict';

require('dotenv').config({ path: './variables.env' });

const Note = require('../models/notesModel');
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
    const note = await Note.create(JSON.parse(event.body));
      return getData(note);

      }catch(err){
      return getError(err);
  }
}



module.exports.getAll = async (event, context) => {
try{
  context.callbackWaitsForEmptyEventLoop = false;

  console.log(context);
    const notes = await Note.find();
      return getData(notes);
      
      }catch(err){
        return getError(err);
      }
};


module.exports.update = async (event, context) => {
  try{
    context.callbackWaitsForEmptyEventLoop = true;
  const note = await Note.findByIdAndUpdate(event.pathParameters.id, JSON.parse(event.body), {
      new: true
    })
      return getData(note);

  }catch(err){
        return getError(err);
  }
};

module.exports.delete = async (event , context) => {
  try{
    context.callbackWaitsForEmptyEventLoop = true;
  const note = await  Note.findByIdAndRemove(event.pathParameters.id)
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
   const note =  await Note.findById(event.pathParameters.id);
      return getData(note);
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