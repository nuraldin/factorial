import ReadResponse from "../../models/response/ReadResponse.js";
import Timeline from "../../models/Timeline.js";
import { parseError } from "../../services/utils/index.js";

const readHistory = async (req, res) => {
    const models = req.app.get('models');

    let response = new ReadResponse();
    try {
      let historyDocs = await models.History.find({}).sort({ createdDate: 'descending' });
      response.payload = historyDocs.map( doc => { 
        let entry = doc.toObject(); 
        return new Timeline(entry);
      });
    } catch(e) {
      console.log(e);
      response = parseError(e);
    }

    return res.status(response.status).send(response.body);
}

export default readHistory;