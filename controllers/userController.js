const User = require('../models/user');
const createError = require('http-errors');

exports.getUsers = (req, res, next) => {
  User.find()
    .then(users => res.json(users))
    .catch(err => {
      // Pass error handling to the next middleware.
      next(err, req, res, next);
    });
};

exports.getUser = (req, res, next) => {
  const id = req.params.id;

  User.findById(id)
    .then(user => {
      if (!user) throw createError(404, 'User not found.');
      res.json(user);
    })
    .catch(next);
};

exports.createUser = (req, res, next) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    throw createError(422, 'Please fill in the required fields.');
  }

  User.create({
    name,
    email,
    password,
  })
    .then(user => res.json(user))
    .catch(next);
};

exports.updateUser = (req, res, next) => {
  const id = req.params.id;

  let { name, email, password } = req.body;

  let updatedData = {
    name,
    email,
    password,
  };

  User.findByIdAndUpdate(id, updatedData, { runValidators: true })
    .then(affectedUser => {
      if (!affectedUser) throw createError(404, 'User not found.');

      res.json(affectedUser);
    })
    .catch(next);
};

exports.deleteUser = (req, res, next) => {
  const id = req.params.id;

  User.findByIdAndDelete(id)
    .then(deletedUser => {
      if (!deletedUser) throw createError(404, 'User not found.');
      res.json({ msg: 'User deleted.', deleted_user: deletedUser });
    })
    .catch(next);
};
