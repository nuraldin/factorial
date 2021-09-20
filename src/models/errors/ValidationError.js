class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = 'Request Input Validation Error';
  }
}

export default ValidationError;