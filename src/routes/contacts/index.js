import express from 'express';

import readContacts from './readContacts.js';
import createContacts from './createContact.js';
import updateContacts from './updateContact.js';
import deleteContact from './deleteContact.js';

const router = express.Router();

router.get('/', readContacts);
router.put('/', updateContacts);
router.post('/', createContacts);
router.delete('/:id', deleteContact);

export default router;