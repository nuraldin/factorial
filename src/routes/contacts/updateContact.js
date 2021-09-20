import UpdateResponse from "../../models/response/UpdateResponse.js";
import { RevisionTypes } from "../../services/db/index.js";
import { parseError } from "../../services/utils/parseError.js";

const updateContact = async (req, res) => {
    const models = req.app.get('models');

    let body = new UpdateResponse(); 
    let status = 200;
    try {
      const payload = validateBody(req.body);
      // get and save previous revision as it is
      let currentContactDocument = await models.CurrentContact.findById(payload._id);

      let currentContact = currentContactDocument.toObject();
      currentContact.contactId = currentContact._id; // save this id for later querying.
      if ( currentContact.createdDate ) delete currentContact.createdDate;
      if ( currentContact.updatedDate ) delete currentContact.updatedDate;
      delete currentContact._id;
      currentContact.originalRevisionCause = currentContact.revisionCause;
      currentContact.newRevisionCause = RevisionTypes.UPDATED;
      let contactRevision = await models.ContactRevision.create(currentContact);

      // update revision and revision cause and save contact updates as current contact
      payload.revision = currentContact.revision + 1;
      payload.revisionCause = RevisionTypes.UPDATED;
      payload.updatedDate = contactRevision.createdDate;
      await models.CurrentContact.where({_id: payload._id}).update(payload);
    } catch(e) {
      console.log(e);
      [status, body] = parseError(e);
    }

    res.status(status).send(body);
}

export default updateContact;