import ValidationError from '../../models/errors/ValidationError.js';

function validateBody( body ) {
  if ( body.constructor === Object && Object.keys(body).length === 0) {
    throw new ValidationError(`Payload cannot be empty`);
  }

  return body;
}

export default validateBody;