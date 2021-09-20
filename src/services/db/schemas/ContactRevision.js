import mongoose from "mongoose";

import RevisionTypes from "./RevisionTypes.js";

const Schema = mongoose.Schema;

const ContactRevisionSchema = new Schema({
  contactId: {
    type: String,
  },
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  email: {
    type: String,
  },
  phoneNumber: {
    type: String,
  },
  revision: {
    type: Number,
    default: 0,
    required: true
  },
  originalRevisionCause: {
    type: String,
    enum: Object.values(RevisionTypes),
    default: RevisionTypes.NONEXISTENT,
    required: true
  },
  newRevisionCause: {
    type: String,
    enum: Object.values(RevisionTypes),
    default: RevisionTypes.CREATED,
    required: true
  },
  createdDate: {
    type: Date,
    default: Date.now
  }
});

export default ContactRevisionSchema;