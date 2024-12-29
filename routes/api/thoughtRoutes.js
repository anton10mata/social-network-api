const router = require('express').Router();
const { Thought, User } = require('../../models');

// GET all thoughts
router.get('/', async (req, res) => {
  try {
    const thoughts = await Thought.find();
    res.json(thoughts);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET a single thought by ID
router.get('/:thoughtId', async (req, res) => {
  try {
    const thought = await Thought.findById(req.params.thoughtId);

    if (!thought) {
      return res.status(404).json({ message: 'No thought found with this ID!' });
    }

    res.json(thought);
  } catch (err) {
    res.status(500).json(err);
  }
});

// CREATE a new thought
router.post('/', async (req, res) => {
  try {
    const newThought = await Thought.create(req.body);

    // Add the thought to the user's `thoughts` array
    await User.findByIdAndUpdate(
      req.body.userId,
      { $push: { thoughts: newThought._id } },
      { new: true }
    );

    res.status(201).json(newThought);
  } catch (err) {
    res.status(500).json(err);
  }
});

// UPDATE a thought by ID
router.put('/:thoughtId', async (req, res) => {
  try {
    const updatedThought = await Thought.findByIdAndUpdate(
      req.params.thoughtId,
      req.body,
      { new: true, runValidators: true } // Ensures validation and returns updated document
    );

    if (!updatedThought) {
      return res.status(404).json({ message: 'No thought found with this ID!' });
    }

    res.json(updatedThought);
  } catch (err) {
    res.status(500).json(err);
  }
});

// DELETE a thought by ID
router.delete('/:thoughtId', async (req, res) => {
  try {
    const deletedThought = await Thought.findByIdAndDelete(req.params.thoughtId);

    if (!deletedThought) {
      return res.status(404).json({ message: 'No thought found with this ID!' });
    }

    // Remove the thought from the user's `thoughts` array
    await User.findOneAndUpdate(
      { thoughts: req.params.thoughtId },
      { $pull: { thoughts: req.params.thoughtId } },
      { new: true }
    );

    res.json({ message: 'Thought successfully deleted!' });
  } catch (err) {
    res.status(500).json(err);
  }
});

// ADD a reaction to a thought
router.post('/:thoughtId/reactions', async (req, res) => {
  try {
    const updatedThought = await Thought.findByIdAndUpdate(
      req.params.thoughtId,
      { $push: { reactions: req.body } },
      { new: true, runValidators: true }
    );

    if (!updatedThought) {
      return res.status(404).json({ message: 'No thought found with this ID!' });
    }

    res.json(updatedThought);
  } catch (err) {
    res.status(500).json(err);
  }
});

// DELETE a reaction by reaction ID
router.delete('/:thoughtId/reactions/:reactionId', async (req, res) => {
  try {
    const updatedThought = await Thought.findByIdAndUpdate(
      req.params.thoughtId,
      { $pull: { reactions: { reactionId: req.params.reactionId } } },
      { new: true }
    );

    if (!updatedThought) {
      return res.status(404).json({ message: 'No thought found with this ID!' });
    }

    res.json(updatedThought);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
