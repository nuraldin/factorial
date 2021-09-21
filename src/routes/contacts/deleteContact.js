import DeleteResponse from "../../models/response/DeleteResponse.js";
import { RevisionTypes } from "../../services/db/index.js";
import saveHistoryRecord from "../../services/saveHistoryRecord.js";
import { parseError } from "../../services/utils/index.js";

const deleteContact = async (req, res) => {
    const models = req.app.get('models');
    const id = req.params.id;

    let response = new DeleteResponse();
    try {
      let contactDoc = await models.Contacts.findById({ _id: id });
      await saveHistoryRecord(contactDoc, RevisionTypes.DELETED);
      await models.Contacts.deleteOne({_id: id});
    } catch(e) {
      console.log(e);
      response = parseError(e);
    }

    return res.status(response.status).send(response.body);
}

export default deleteContact;