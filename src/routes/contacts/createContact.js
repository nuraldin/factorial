import CreateResponse from "../../models/response/CreateResponse";

const createContact = async (req, res) => {
    const models = req.app.get('models');
    let body = new CreateResponse();
    let status = 201;

    try {
      const payload = validateBody(req.body);

      let contactDocument = await models.CurrentContact.create(payload);

      let contactObj = contactDocument.toObject();
      contactObj.contactId = contactObj._id;
      delete contactObj._id;
      await models.ContactRevision.create(contactObj);
      body.payload = contactDocument;
    } catch(e) {
      console.log(e);
      [ status, body ] = parseError(e);
    }

    res.status(status).send(body);
}

export default createContact;