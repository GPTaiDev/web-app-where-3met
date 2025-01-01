const express = require('express');
const Habit = require('../models/Habit');

const router = express.Router();

// Get all habits for user
router.get('/:userId', (req, res) => {
  Habit.find({ user: req.params.userId })
    .then(habits => res.json(habits))
    .catch(err => res.status(500).json({ message: 'Error fetching habits' }));
});

// Add new habit
router.post('/', (req, res) => {
  const { user, name, goal } = req.body;
  const newHabit = new Habit({ user, name, goal });

  newHabit.save()
    .then(habit => res.json(habit))
    .catch(err => res.status(500).json({ message: 'Error adding new habit' }));
});

// Update habit
router.put('/:habitId', (req, res) => {
  Habit.findByIdAndUpdate(req.params.habitId, req.body, { new: true })
    .then(habit => res.json(habit))
    .catch(err => res.status(500).json({ message: 'Error updating habit' }));
});

// Delete habit
router.delete('/:habitId', (req, res) => {
  Habit.findByIdAndRemove(req.params.habitId)
    .then(() => res.json({ message: 'Habit deleted' }))
    .catch(err => res.status(500).json({ message: 'Error deleting habit' }));
});

module.exports = router;
