import mongoose from 'mongoose';

const todoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please, provide a title'],
  },

  details: {
    type: String,
    required: false,
  },

  userId: {
    type: String,
    required: [true, 'Please, provide user Id'],
  },

  done: {
    type: Boolean,
    default: false,
  },

  by: {
    type: String,
  },
});

const Todo = mongoose.models.todos || mongoose.model('todos', todoSchema);

export default Todo;
