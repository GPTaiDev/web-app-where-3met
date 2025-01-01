const express = require('express');
const bcrypt = require('bcrypt');
const passport = require('passport');

const User = require('../models/User');

const router = express.Router();

// Register User
router.post('/register', (req, res) => {
  const { email, password } = req.body;
  User.findOne({ email: email.toLowerCase() }, async (err, user) => {
    if (user) return res.status(400).json({ message: 'Email already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      email,
      password: hashedPassword
    });

    newUser.save()
      .then(user => res.json(user))
      .catch(err => res.status(500).json({ message: 'Error registering new user' }));
  });
});

// Login User
router.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) return res.status(500).json({ message: 'Error during authentication' });
    if (!user) return res.status(400).json(info);

    req.logIn(user, (err) => {
      if (err) return res.status(500).json({ message: 'Error logging in' });
      return res.json(user);
    });
  })(req, res, next);
});

// Logout User
router.get('/logout', (req, res) => {
  req.logout();
  res.json({ message: 'User logged out' });
});

module.exports = router;
