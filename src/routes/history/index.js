import express from 'express';

import readHistory from '../history/readHistory.js';

const router = express.Router();

router.get('/', readHistory);

export default router;