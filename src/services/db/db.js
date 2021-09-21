import mongoose from 'mongoose';

import ContactSchema from './schemas/Contact.js';
import RevisionRecordSchema from './schemas/RevisionRecord.js';

export default async function startDB(user = 'user', password = 'password') {
  await mongoose.connect(
    `mongodb+srv://${user}:${password}@cluster0.yimby.mongodb.net/contactsDB?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
  });

  const db = mongoose.connection;
  const Contacts = db.model('Contact', ContactSchema);
  const History = db.model('RevisionRecord', RevisionRecordSchema);

  return {
    Contacts,
    History
  };
}