import { resolve } from 'path';
import db from '../db/database';
import { Todo } from '../types/todo';
import { TodoError } from '../types/todoError'
import { UpdateTodoRequest } from '../types/updateTodoRequest';
import { ToDoDataChecker } from '../types/TodoDatachecker';
import { RunResult } from 'sqlite3';
import { text } from 'stream/consumers';
import { CreateTodoRequest } from '../types/createTodoRequest';

export class TodoDAL {
  //Get all todos from database ordered by created_at DESC
  async getAllTodos(): Promise<Todo[]> {
    return new Promise((resolve, reject) => {
      db.all("SELECT * FROM todos ORDER BY created_at DESC", (err: Error | null, rows: any[]) => {
        if (err) {
          console.error('Error fetching todos:', err.message);
          reject(new Error('Failed to fetch todos'));
          return;
        }
        resolve(rows);
      });
    });
  }
  //get by id
  async getTodoById(id: number): Promise<Todo> {
    return new Promise((resolve, reject) => {
      db.get("SELECT * FROM todos WHERE id = (?)", id, (err: Error | null, result: any) => {

        if (err) {
          console.error(err.message);
          reject(new TodoError(500, err.message));
          return;
        }
        if (result == undefined) {
          console.error(`todo not found with id: ${id}`);
          reject(new TodoError(404, `todo not found with id: ${id}`))
          return;
        }
        resolve(result);

      });
    });
  }

  async newTodo(newTodo: CreateTodoRequest): Promise<Todo> {
    return new Promise((resolve, reject) => {
      db.get("INSERT INTO todos (text) VALUES  (?) RETURNING *", newTodo.text, (err: Error | null, result: any) => {
        if (err) {
          console.error(err.message);
          reject(new TodoError(500, err.message));
          return;
        }
        resolve(result);
      });
    });
  }
  async updateTodo(id: number, update: UpdateTodoRequest): Promise<Todo> {
    return new Promise((resolve, reject) => {

      const params: any[] = [
        update.text != undefined ? update.text : null,
        update.completed != undefined ? (update.completed ? 1 : 0) : null, id];
      if (params[0] == null && params[1] == null) {
        reject(new TodoError(400, 'Invalid Entry'));
        return;
      }

      db.get(`UPDATE todos 
              SET text = coalesce((?), text), completed = coalesce((?), completed), updated_at = CURRENT_TIMESTAMP 
              WHERE id = (?) RETURNING *`,
        params, (err: Error | null, result: any) => {
          if (err) {
            console.error(err.message);
            reject(new TodoError(500, err.message));
            return;
          }
          if (result == undefined) {
            console.error(`todo not found with id: ${id}`);
            reject(new TodoError(404, `todo not found with id: ${id}`));
            return;
          }
          resolve(result);
        });
    });
  }

  async deleteTodo(id: number): Promise<number> {
    return new Promise((resolve, reject) => {
      db.run("DELETE FROM todos WHERE id = (?)", id, function (this: RunResult, err: Error | null) {
        if (err) {
          console.error(err.message);
          reject(new TodoError(500, err.message));
          return;
        }
        if (this.changes === 0) {
          console.error(`todo not found with id: ${id}`);
          reject(new TodoError(404, `todo not found with id: ${id}`));
          return;
        }
        resolve(this.changes);
      });
    });
  }
}
