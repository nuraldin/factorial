import { ValidationError, MissingValueError } from '../../models/errors/index.js';

function validateBody( body ) {
  if ( body.constructor === Object && Object.keys(body).length === 0) {
    throw new ValidationError(`Payload cannot be empty`);
  } else if ( Object.values(body).some(value => !value ) ) {
    throw new MissingValueError(`All payload values must not be null`);
  } else if ( Object.values(body).some(value => value === 'null' )) {
    throw new MissingValueError(`All payload values must not be null`);
  }

  return body;
}

export default validateBody;