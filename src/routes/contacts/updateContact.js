import RevisionTypes from "../../schemas/RevisionTypes.js";

const updateContact = async (req, res, next) => {
    const models = req.app.get('models');
    const payload = req.body;

    if ( payload.constructor === Object && Object.keys(payload).length === 0) {
      return res.status(400).send({
        message: `Payload cannot be empty`
      });
    } 

    try {
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
      if (e.name === "ValidationError" ) {
        let errors = Object.keys(e.errors).reduce( (errors, key) => {
          errors[key] = e.errors[key].message;
          return errors;
        } , {});
        return res.status(400).send(errors);
      } 

      return res.status(500).send("Something went wrong while updating contacts");
    }

    return res.status(200).send(`Updated contact successfully`);
}

export default updateContact;