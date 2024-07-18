import mongoose, { modelNames } from 'mongoose';

const todoSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
    },
    Date: {
      type:Date,
      required:true
    },
    Priority: {
      type: String,
      enum: ['Low','High'],
      required: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true }
);

const Todo = mongoose.model('Todo', todoSchema);
export default Todo;

  // complete: {
    //   type: Boolean,
    //   default: false,
    // },
    // subTodos: [
    //   {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'Subtodo',
    //   },