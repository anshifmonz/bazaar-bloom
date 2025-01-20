import express from "express";

import csrfTokenGenerator from "../controller/csrfTokenGenerator";

const router = express.Router();

router.get('/generate-csrf-token', csrfTokenGenerator);
router.post('/validate-csrf-token', );

export default router;
