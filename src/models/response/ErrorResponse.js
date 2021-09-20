class ErrorResponse {
  constructor(message) {
    this.message = message || `There was an error in your request`;
  }
}

export default ErrorResponse;