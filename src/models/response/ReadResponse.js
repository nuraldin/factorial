import BaseResponse from "./BaseResponse.js";

class ReadResponse extends BaseResponse {
  constructor(message) {
    super(200, message || `Read of resource was successfull`);
  }
}

export default ReadResponse;