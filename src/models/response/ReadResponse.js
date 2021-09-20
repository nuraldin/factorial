class ReadResponse {
  constructor(message, payload = {}) {
    this.message = message || `Read of resource was successfull`;
    this.payload = payload;
  }
}

export default ReadResponse;