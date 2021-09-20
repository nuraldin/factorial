import ReadResponse from "../../models/response/ReadResponse.js";
import Timeline from "../../models/Timeline.js";
import { parseError } from "../../services/utils/parseError.js";

const readHistory = async (req, res) => {
    const models = req.app.get('models');

    let body = new ReadResponse();
    let status = 200;
    try {
      let revisionDocuments = await models.ContactRevision.find({}).sort({ createdDate: 'descending' });
      let revisions = revisionDocuments.map( document => document.toObject() );
      body.payload = revisions.map( revision => new Timeline(revision) );
    } catch(e) {
      console.log(e);
      [status, body] = parseError(e);
    }

    return res.status(status).send(body);
}

export default readHistory;