class BaseResponse {
  constructor(status = 200, message = '', payload = {}) {
    this._status = status;
    this._message = message;
    this._payload = payload;
  }

  set message(msg) {
    if ( msg && msg instanceof String ) this._message = msg;
  }

  set status(code) {
    if ( code && code instanceof Number ) this.status = code;
  }

  set payload(data) {
    if ( data ) this._payload = data;
  }

  get payload() {
    return this._payload;
  }

  get status() {
    return this._status;
  }

  get body() {
    return {
      message: this._message,
      payload: this._payload
    };
  }
}

export default BaseResponse;