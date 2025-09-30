import { TodoDAL } from '../dal';
import { CreateTodoRequest } from '../types/createTodoRequest';
import { Todo } from '../types/todo';
import { TodoError } from '../types/todoError'
import { UpdateTodoRequest } from '../types/updateTodoRequest';

export class TodoIntent {
  private todoDAL: TodoDAL;

  constructor() {
    this.todoDAL = new TodoDAL();
  }

  /**
   * Get all todos ordered by created_at DESC
   */
  async getAllTodos(): Promise<Todo[]> {
    try {
      const rows = await this.todoDAL.getAllTodos();

      // Convert SQLite boolean values to JavaScript booleans
      const todos: Todo[] = rows.map((row: any) => ({
        ...row,
        completed: Boolean(row.completed)
      }));

      return todos;
    } catch (error) {
      throw error;
    }
  }

  //get todo by id

  async getTodoById(id: number): Promise<Todo> {
    try {
      const row = await this.todoDAL.getTodoById(id);
      const todo: Todo = { ...row, completed: Boolean(row.completed) };
      return todo;
    }
    catch (error: any) {
      throw error;
    }
  }

  //add new todo
  async newTodo(newTodo: CreateTodoRequest): Promise<Todo> {
    try {
      const idNum = await this.todoDAL.newTodo(newTodo);

      console.log(idNum);

      const today = new Date().toISOString().slice(0, 19).replace('T', ' ');
      const todo: Todo = {
        id: idNum,
        text: newTodo.text,
        created_at: today,
        updated_at: today,
        completed: false
      };
      return todo;
    }
    catch (error: any) {
      throw error;
    }
  }

  //update todo
  async updateTodo(id: number, update: UpdateTodoRequest): Promise<Todo> {
    try {
      const result = await this.todoDAL.updateTodo(id, update);
      return await this.getTodoById(id);
    }
    catch (error: any) {
      throw error;
    }
  }

  //delete todo
  async deleteTodo(id: number): Promise<number> {
    try {
      const result = await this.todoDAL.deleteTodo(id);
      return result;
    }
    catch (error: any) {
      throw error;
    }
  }
}
