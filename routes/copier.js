const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const express = require('express');
const router = express.Router();

const { validateLoginInput } = require('../util/validators.js');

function generateToken(user, expiresIn) {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
    },
    'test server for copier app',
    { expiresIn }
  );
}

// login
router.post('/login', async function (req, res) {
  if (req && req.body) {
    const { email, password } = req.body;

    if (email && password) {
      const { errors, valid } = validateLoginInput(email, password);
      if (!valid) {
        return res.status(400).json(errors);
      }

      try {
        if (email === 'raul@gmail.com') {
          if (password === '123456') {
            const token = generateToken({ id: '111111', email }, '7d');

            return res.status(200).json({
              id: '111111',
              token,
            });
          } else {
            return res.status(400).json({ password: 'Incorrect password' });
          }
        } else {
          return res.status(404).json({ email: 'Incorrect email' });
        }
      } catch (err) {
        return res.status(500).json({ general: 'Internal server error' });
      }
    } else {
      return res.status(400).json({ general: 'Invalid data' });
    }
  } else {
    return res.status(400).json({ general: 'Invalid data' });
  }
});

// xml
router.get('/xml', async (req, res) => {
  let data = '<?xml version="1.0" encoding="UTF-8"?>';
  data += '<product>';
  data += '<item><name>Copier</name><price>free</price></item>';
  data += '</product>';
  res.header('Content-Type', 'application/xml');
  return res.status(200).send(data);
});

module.exports = router;
