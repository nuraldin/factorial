const readHistory = async (req, res, next) => {
    const models = req.app.get('models');

    let timeline = [];
    try {
      let contactRevisionDocuments = await models.ContactRevision.find({}).sort({ createdDate: 'descending' });
      let contactRevisions = contactRevisionDocuments.map( contactRevisionDocument => contactRevisionDocument.toObject() );
      timeline = contactRevisions.map( contactRevision => {
        return {
          date: contactRevision.createdDate,
          event: contactRevision.newRevisionCause,
          contact: `${contactRevision.firstName} ${contactRevision.lastName}`
        };
      })
    } catch(e) {
      console.log(e);
      return res.status(500).send("Something happened while fetching contacts");
    }

    return res.status(200).send(timeline);
}

export default readHistory;