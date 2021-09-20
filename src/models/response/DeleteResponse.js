class DeleteResponse {
  constructor(message) {
    this.message = message || `The contact was deleted successfully`;
  }
}

export default DeleteResponse;