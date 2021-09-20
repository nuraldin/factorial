class Timeline {
  constructor(obj) {
    this.date = obj.createdDate,
    this.event =  obj.newRevisionCause,
    this.contact = `${obj.firstName} ${obj.lastName}`
  }
}

export default Timeline;