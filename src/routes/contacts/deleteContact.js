import RevisionTypes from "../../schemas/RevisionTypes.js";

const deleteContact = async (req, res, next) => {
    const models = req.app.get('models');
    const id = req.params.id;

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
      return res.status(500).send("Something went wrong while updating contacts");
    }

    return res.status(200).send(`Deleted contact with id:${id}`);
}

export default deleteContact;