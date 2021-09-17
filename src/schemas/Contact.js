import mongoose from "mongoose";

import RevisionTypes from "./RevisionTypes.js";

const Schema = mongoose.Schema;

const CurrentContactSchema = new Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  phoneNumber: {
    type: String,
    required: true
  },
  revision: {
    type: Number,
    default: 0,
    required: true
  },
  revisionCause: {
    type: String,
    enum: Object.values(RevisionTypes),
    default: RevisionTypes.CREATED,
    required: true
  },
  createdDate: {
    type: Date,
    default: Date.now
  },
  updatedDate: {
    type: Date
  }
});

export default CurrentContactSchema;