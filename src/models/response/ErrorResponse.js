import BaseResponse from "./BaseResponse.js";

class ErrorResponse extends BaseResponse {
  constructor(message) {
    super(400, message || `There was an error in your request` );
  }
}

export default ErrorResponse;