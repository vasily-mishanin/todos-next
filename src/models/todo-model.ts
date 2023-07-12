import mongoose from 'mongoose';

const dodoSchema = new mongoose.Schema({
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
  },
});

const Todo = mongoose.models.todos || mongoose.model('todos', dodoSchema);

export default Todo;
