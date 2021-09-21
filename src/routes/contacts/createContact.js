import CreateResponse from "../../models/response/CreateResponse.js";
import saveHistoryRecord from "../../services/saveHistoryRecord.js";
import { parseError, validateBody } from "../../services/utils/index.js";

const createContact = async (req, res) => {
  const models = req.app.get('models');
  
  let response = new CreateResponse();
  try {
    const validBody = validateBody(req.body);
    response.payload = await models.Contacts.create(validBody);
    console.log(response);
    await saveHistoryRecord(response.payload);
  } catch(e) {
    console.log(e);
    response = parseError(e);
  }

  res.status(response.status).send(response.body);
}

export default createContact;