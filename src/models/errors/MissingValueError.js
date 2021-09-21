class MissingValueError extends Error {
  constructor(message) {
    super(message);
    this.name = 'Request Missing a Value Error';
  }
}

export default MissingValueError;