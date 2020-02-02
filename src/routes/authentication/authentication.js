import express from 'express';

import UserAuthentificationController from '../../controllers/user-authentication.controllers';

const router = express.Router();

router.get('/test', (req, res) => {
  res.json({ msg: 'post Works' });
});
router.post('/signup', UserAuthentificationController.signupUser);
router.post('/login', UserAuthentificationController.login);

export default router;
