import ReadResponse from "../../models/response/ReadResponse.js";
import { parseError } from "../../services/utils/parseError.js";

const readContacts = async (req, res) => {
    const models = req.app.get('models');
    
    let body = new ReadResponse(); 
    let status = 200;
    try {
      body.payload = await models.CurrentContact.find({});
    } catch(e) {
      console.log(e);
      [status, body] = parseError(e);
    }

    res.status(status).send(body);
}

export default readContacts;
