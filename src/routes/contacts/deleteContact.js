import DeleteResponse from "../../models/response/DeleteResponse.js";
import { RevisionTypes } from "../../services/db/index.js";
import { parseError } from "../../services/utils/parseError.js";

const deleteContact = async (req, res) => {
    const models = req.app.get('models');
    const id = req.params.id;

    let body = new DeleteResponse();
    let status = 200;
    try {
      // get current contact, change revision and save last revision.
      let currentContactDocument = await models.CurrentContact.findById({ _id: id });

      let currentContact = currentContactDocument.toObject();
      currentContact.originalRevisionCause = currentContact.revisionCause;
      currentContact.newRevisionCause = RevisionTypes.DELETED;
      if ( currentContact.createdDate ) delete currentContact.createdDate;
      if ( currentContact.updatedDate ) delete currentContact.updatedDate;
      currentContact.contactId = currentContact._id;
      delete currentContact._id;
      console.log(currentContact);
      await models.ContactRevision.create(currentContact);

      // delete original document
      await models.CurrentContact.deleteOne({_id: id});
    } catch(e) {
      console.log(e);
      [status, body] = parseError(e);
    }

    return res.status(status).send(body);
}

export default deleteContact;