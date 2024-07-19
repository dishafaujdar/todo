import mongoose from 'mongoose';

// Custom validator function to validate time format
const validateTimeFormat = (value) => {
  // Regular expression to match HH:mm or HH:mm:ss or HH:mm:ss.SSS
  const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)(:[0-5]\d(\.\d{1,3})?)?$/;
  return timeRegex.test(value);
};

const todoSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  time: {
    type: String,
    required: true,
    validate: {
      validator: validateTimeFormat,
      // message: (props) => `${props.value} is not a valid time format! The format should be "HH:mm", "HH:mm:ss", or "HH:mm:ss.SSS"`,
    },
  },
  priority: {
    type: String,
    enum: ['Low', 'Medium', 'High'],
    required: true,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

const Todo = mongoose.model('Todo', todoSchema);
export default Todo;
