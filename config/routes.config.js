const express = require('express');
const router = express.Router();

// Middleware
const auth = require('../middlewares/auth.middleware');

// Controllers
const posts = require('../controllers/posts.controller');
const users = require('../controllers/users.controller');

// Users Routes
router.post('/api/login', users.login);
router.post('/api/users', users.create);
router.get('/api/users/:id/activate', users.activate);

// Posts Routes
router.get('/api/posts', auth.checkAuth, posts.list);
router.get('/api/posts/:id', auth.checkAuth, posts.detail);
router.post('/api/posts', auth.checkAuth, posts.create);
router.patch('/api/posts/:id', auth.checkAuth, posts.update);
router.delete('/api/posts/:id', auth.checkAuth, posts.delete);

module.exports = router;