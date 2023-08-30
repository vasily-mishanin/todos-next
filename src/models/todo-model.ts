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

  boardId: {
    type: String,
    //required: [true, 'Todo should have board Id'],
  },

  done: {
    type: Boolean,
    default: false,
  },

  by: {
    type: String,
  },

  order: {
    type: Number,
  },
});

const Todo = mongoose.models.todos || mongoose.model('todos', todoSchema);

export default Todo;
