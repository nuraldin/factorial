const readContacts = async (req, res, next) => {
    const models = req.app.get('models');
    const id = req.params.id;

    let query = id ? { _id: id } : {};

    let contacts;
    try {
      contacts = await models.CurrentContact.find(query);
    } catch(e) {
      return res.status(500).send("Something while fetching contacts");
    }

    return res.status(200).send(contacts);
}

export default readContacts;