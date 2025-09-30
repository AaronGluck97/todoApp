import type { Todo } from "../../../todo-be/src/types/todo";
import type { UpdateTodoRequest } from "../../../todo-be/src/types/updateTodoRequest";

export async function fetchTodos(){
  try {
    const res = await fetch('http://localhost:3001/api/todos');
    if (!res.ok) {
      throw new Error(`Response status: ${res.status}`);
    }
    return res.json();
  } catch (error) {
    throw error;
  }
}

// Add other API functions as needed here

// get by id
export async function fetchATodo(id: number) {
  try {
    const res = await fetch(`http://localhost:3001/api/todos/${id}`);
    if (!res.ok) {
      throw new Error(`Response status: ${res.status}`);
    }
    return res.json();
  }
  catch (error: any) {
    throw error;
  }

}

// add new
export async function addATodo(todoText: string) {

  try {

    const res = await fetch(`http://localhost:3001/api/todos/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: todoText })
    });
    if (!res.ok) {
      throw new Error(`Response status: ${res.status}`);
    }
    return res.json();
  }
  catch (error: any) {
    throw error;
  }


}

//edit
export async function updateATodo(id: number, update: UpdateTodoRequest){
  try {
    const res = await fetch(`http://localhost:3001/api/todos/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(update)
    });
    if (!res.ok) {
      throw new Error(`Response status: ${res.status}`);
    }
    return res.json();
  }
  catch (error: any) {
    throw error;
  }

}

//delete
export async function DeleteATodo(id: number) {
  try {
    const res = await fetch(`http://localhost:3001/api/todos/${id}`, { method: 'DELETE' });
    if (!res.ok) {
      throw new Error(`Response status: ${res.status}`);
    }
  }
  catch (error: any) {
    throw error;
  }

}
