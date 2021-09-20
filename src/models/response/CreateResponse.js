class CreateResponse {
  constructor(message, payload = {}) {
    this.message = message || `The contact was created successfully`;
    this.payload = payload;
  }
}

export default CreateResponse;