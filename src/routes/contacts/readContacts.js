import ReadResponse from "../../models/response/ReadResponse.js";
import { parseError } from "../../services/utils/index.js";

const readContacts = async (req, res) => {
    const models = req.app.get('models');
    
    let response = new ReadResponse(); 
    try {
      response.payload = await models.Contacts.find({});
    } catch(e) {
      console.log(e);
      response = parseError(e);
    }

    res.status(response.status).send(response.body);
}

export default readContacts;
