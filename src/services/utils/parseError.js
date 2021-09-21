import ErrorResponse from '../../models/response/ErrorResponse.js';
import { ValidationError, MissingValueError } from '../../models/errors/index.js';

function parseError(e) {
  let error = new ErrorResponse();
  if (e.name === "ValidationError" ) {
    error.payload = Object.keys(e.errors).reduce( (errors, key) => {
      errors[key] = e.errors[key].message;
      return errors;
    } , {});
  } else if ( e.name === "MongoError" && e.code === 11000 ) {
    error.payload = { email: 'already exists a contact with a specified email'};
  } else if ( e instanceof ValidationError || e instanceof MissingValueError ) {
    error.message = e.message;
  } else {
    errror.status = 500;
    error.message = "Something went wrong operating on contact";
  }

  return error;
}

export default parseError;