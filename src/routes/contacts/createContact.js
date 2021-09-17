const createContact = async (req, res, next) => {
    const models = req.app.get('models');
    const payload = req.body;

    if ( payload.constructor === Object && Object.keys(payload).length === 0) {
      return res.status(400).send({
        message: `Payload cannot be empty`
      });
    } 

    let contact = {};
    try {
      let contactDocument = await models.CurrentContact.create(payload);
      
      let contactObj = contactDocument.toObject();
      contactObj.contactId = contactObj._id;
      delete contactObj._id;
      await models.ContactRevision.create(contactObj);
      contact = contactDocument;
    } catch(e) {
      console.log(e);
      if (e.name === "ValidationError" ) {
        let errors = Object.keys(e.errors).reduce( (errors, key) => {
          errors[key] = e.errors[key].message;
          return errors;
        } , {});
        return res.status(400).send(errors);
      } else if ( e.name === "MongoError" && e.code === 11000 ) {
        return res.status(400).send({ email: 'already exists a contact with a specified email'});
      }
      return res.status(500).send("Something went wrong creating contact");
    }

    return res.status(201).send(contact);
}

export default createContact;