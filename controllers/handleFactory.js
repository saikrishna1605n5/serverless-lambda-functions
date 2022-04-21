
module.exports.create = Model => async (event, context) => {
  try{
    context.callbackWaitsForEmptyEventLoop = true;
    console.log(event.body);
    console.log(Model);

    const data = await Model.create(JSON.parse(event.body));
    console.log(data);
      return {
        statusCode: 200,
            body: JSON.stringify({
              status:'success',
              data: data
            })
          }

      }catch(err){
      return {
        statusCode: err.statusCode || 500,
        body: JSON.stringify({
          status:'fail',
          message: err.message
        })
      }
  }
}

module.exports.getAll = Model => async (event, context) => {
try{
  context.callbackWaitsForEmptyEventLoop = false;

    const data = await Model.find();

    return {
        statusCode: 200,
            body: JSON.stringify({
              status:'success',
              data: data
            })
          }

      }catch(err){
      return {
        statusCode: err.statusCode || 500,
        body: JSON.stringify({
          status:'fail',
          message: err.message
        })
      }
  }
}


module.exports.update = Model => async (event, context) => {
  try{
    context.callbackWaitsForEmptyEventLoop = true;
  const data = await Model.findByIdAndUpdate(event.pathParameters.id, JSON.parse(event.body), {
      new: true
    })
    return {
        statusCode: 200,
            body: JSON.stringify({
              status:'success',
              data: data
            })
          }

      }catch(err){
      return {
        statusCode: err.statusCode || 500,
        body: JSON.stringify({
          status:'fail',
          message: err.message
        })
      }
  }
}

module.exports.delete = Model => async (event , context) => {
  try{
    context.callbackWaitsForEmptyEventLoop = true;
  const data = await  Model.findByIdAndRemove(event.pathParameters.id)
  return {
    statusCode: 200,
        body: JSON.stringify({
        message: 'Removed data with id: ' + data._id,
        })
      }

  }catch(err){
  return {
    statusCode: err.statusCode || 500,
    body: JSON.stringify({
      status:'fail',
      message: err.message
    })
  }
}
}


module.exports.getOne = Model => async(event, context) => {
  try {
    context.callbackWaitsForEmptyEventLoop = true;
   const data =  await Model.findById(event.pathParameters.id);

   return {
    statusCode: 200,
        body: JSON.stringify({
          status:'success',
          data: data
        })
      }

  }catch(err){
  return {
    statusCode: err.statusCode || 500,
    body: JSON.stringify({
      status:'fail',
      message: err.message
    })
  }
}
}
