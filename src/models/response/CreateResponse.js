import BaseResponse from "./BaseResponse.js";

class CreateResponse extends BaseResponse {
  constructor(message) {
    super(201, message || `The contact was created successfully`);
  }
}

export default CreateResponse;