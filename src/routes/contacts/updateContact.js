import UpdateResponse from "../../models/response/UpdateResponse.js";
import { RevisionTypes } from "../../services/db/index.js";
import saveHistoryRecord from "../../services/saveHistoryRecord.js";
import { parseError, validateBody } from "../../services/utils/index.js";

const updateContact = async (req, res) => {
    const models = req.app.get('models');

    let response = new UpdateResponse(); 
    try {
      const payload = validateBody(req.body);
      let contactDoc = await models.Contacts.findById(payload._id);
      let historyDoc = await saveHistoryRecord(contactDoc, RevisionTypes.UPDATED);
      // update contact
      payload.revision = contactDoc.revision + 1;
      payload.revisionCause = RevisionTypes.UPDATED;
      payload.updatedDate = historyDoc.createdDate;
      await models.Contacts.where({_id: payload._id}).update(payload);
      response.payload = payload;
    } catch(e) {
      console.log(e);
      response = parseError(e);
    }

    res.status(response.status).send(response.body);
}

export default updateContact;