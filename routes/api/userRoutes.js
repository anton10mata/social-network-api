const router = require('express').Router();
const { User } = require('../../models');

// GET all users
router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET a single user by ID
router.get('/:userId', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);

    if (!user) {
      return res.status(404).json({ message: 'No user found with this ID!' });
    }

    res.json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

// CREATE a user
router.post('/', async (req, res) => {
  try {
    const newUser = await User.create(req.body);
    res.status(201).json(newUser);
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({
        message: 'Duplicate key error. A user with this username or email already exists.',
        keyValue: err.keyValue,
      });
    }
    res.status(500).json(err);
  }
});

// UPDATE a user by ID
router.put('/:userId', async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.userId,
      req.body,
      { new: true, runValidators: true } // Returns the updated document and runs validation
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'No user found with this ID!' });
    }

    res.json(updatedUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

// DELETE a user by ID
router.delete('/:userId', async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.userId);

    if (!deletedUser) {
      return res.status(404).json({ message: 'No user found with this ID!' });
    }

    res.json({ message: 'User successfully deleted!' });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Add a friend to a user's friend list
router.post('/:userId/friends/:friendId', async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.userId,
      { $addToSet: { friends: req.params.friendId } }, // Add friendId to friends array if it doesn't exist
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: 'No user found with this ID!' });
    }

    res.json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Remove a friend from a user's friend list
router.delete('/:userId/friends/:friendId', async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.userId,
      { $pull: { friends: req.params.friendId } }, // Remove friendId from friends array
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: 'No user found with this ID!' });
    }

    res.json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});


module.exports = router;
