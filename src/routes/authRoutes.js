import express from 'express';

const router = express.Router();

router.get('/register', (req, res) => {
  res.sendStatus(200);
  console.log(`register route on ${req.path}`);
});

export default router;
