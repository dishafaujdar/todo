// Models
const User = mongoose.model('User', new mongoose.Schema({
    email: String,
    password: String,
  }));
  
  const Todo = mongoose.model('Todo', new mongoose.Schema({
    userId: String,
    task: String,
    completed: Boolean,
  }));
  
  