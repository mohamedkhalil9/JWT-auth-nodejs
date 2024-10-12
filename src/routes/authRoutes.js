import express from 'express';

const router = express.Router();

router.get('/register', (req, res) => {
  res.status(200).json({ success: true, msg: "register route" });
});

export default router;
