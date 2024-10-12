import express from 'express';

const router = express.Router();

router.get('/register', (req, res) => {
  res.status(200).json({ msg: "register route" });
});

export default router;
