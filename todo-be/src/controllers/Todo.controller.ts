import express from 'express';
import { TodoIntent } from '../intents';
import { TodoError } from '../types/todoError'
import { UpdateTodoRequest } from '../types/updateTodoRequest';
import { register } from 'module';
import { text } from 'stream/consumers';
import { ToDoDataChecker } from '../types/TodoDatachecker';

const router = express.Router();
const todoIntent = new TodoIntent();

const td = ToDoDataChecker.getInstance();

// GET /api/todos - Get all todos
router.get('/', async (req: any, res: any) => {
  try {
    const todos = await todoIntent.getAllTodos();
    res.json(todos);
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }

});

// GET /api/todos/:id - Get a specific todo
router.get('/:id', async (req: any, res: any) => { 
  try {
    const todo = await todoIntent.getTodoById(td.id(req.params.id));
    res.status(200).json(todo);
  }
  catch (error: any) {
    return res.status(error.code ?? 500).json({ error: `${error.message}` });
  }
});

// POST /api/todos - Create a new todo
router.post('/', async (req: any, res: any) => {
  try {
    const todo = await todoIntent.newTodo({ text:td.text(req.body.text)})
    res.status(201).json(todo);
  }
  catch (error: any) {
    return res.status(error.code || 500).json({ error: `${error.message}` });
  }
});

// PUT /api/todos/:id - Update a todo
router.put('/:id', async (req: any, res: any) => {
  try{
      const todo = await todoIntent.updateTodo(td.id(req.params.id),td.update(req.body.text, req.body.completed));
      return res.status(200).json(todo);
  }
  catch(error : any){
    return res.status(error.code || 500).json({ error: `${error.message}`});
  }
});


// DELETE /api/todos/:id - Delete a todo
router.delete('/:id', async (req: any, res: any) => {
  try {
    const result = await todoIntent.deleteTodo(td.id(req.params.id))
    res.status(204).json();
  }
  catch (error: any) {
    return res.status(error.code || 500).json({ error: `${error.message}` });
  }
});

export default router;
