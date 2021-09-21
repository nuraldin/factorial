import BaseResponse from "./BaseResponse.js";

class DeleteResponse extends BaseResponse {
  constructor(message) {
    super(200, message || `The contact was deleted successfully`);
  }
}

export default DeleteResponse;