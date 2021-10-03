import config from "../../config.js";
import { RevisionTypes } from "./db/index.js";
const models = config.models;

const saveHistoryRecord = async (contactDoc, revisionType = RevisionTypes.CREATED) =>  {
  let contactObj = contactDoc.toObject();
  contactObj.contactId = contactObj._id;
  contactObj.revisionCause = revisionType;
  delete contactObj._id;
  delete contactObj.updatedDate;
  delete contactObj.createdDate;
  return await models.History.create(contactObj);
}

export default saveHistoryRecord;