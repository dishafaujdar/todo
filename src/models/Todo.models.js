import mongoose, { modelNames } from 'mongoose';

const todoSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      require: true,
    },
    complete: {
      type: Boolean,
      default: false,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    subTodos: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Subtodo',
      },
    ],
  },
  { timestamps: true }
);

const Todo = mongoose.model('Todo', todoSchema);
module.exports= Todo