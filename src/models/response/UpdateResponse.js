import BaseResponse from "./BaseResponse.js";

class UpdateResponse extends BaseResponse {
  constructor(message) {
    super(200, message || `The contact was updated successfully`);
  }
}

export default UpdateResponse;