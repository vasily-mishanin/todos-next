import mongoose from 'mongoose';

const boardSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please, provide a title of the board'],
  },
});

const Board = mongoose.models.boards || mongoose.model('boards', boardSchema);

export default Board;
