import ErrorResponse from '../../models/response/ErrorResponse.js';
import ValidationError from '../../models/errors/ValidationError.js';

function parseError(e) {
    let body, status = 400;
    if (e.name === "ValidationError" ) {
      body = Object.keys(e.errors).reduce( (errors, key) => {
        errors[key] = e.errors[key].message;
        return errors;
      } , {});
    } else if ( e.name === "MongoError" && e.code === 11000 ) {
      body = { email: 'already exists a contact with a specified email'};
    } else if ( e instanceof ValidationError ) {
      body = new ErrorResponse(e.message);
    } else {
      status = 500;
      body = "Something went wrong operating on contact";
    }

    return [ status, body ];
}

export {
  parseError
};
