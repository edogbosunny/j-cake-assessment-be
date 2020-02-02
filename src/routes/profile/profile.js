import express from 'express';

import ProfileController from '../../controllers/user-profile.controller';

const router = express.Router();

router.get('/profile/:id', ProfileController.viewProfile);
router.put('/profile/:id', ProfileController.updateProfile);

export default router;
