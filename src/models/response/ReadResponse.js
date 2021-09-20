class ReadResponse {
  constructor(message, payload = {}) {
    this.message = message || `The contacts were successfully`;
    this.payload = payload;
  }
}

export default ReadResponse;