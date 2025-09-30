import { fetchTodos } from '../../services/todoApi.ts';
import { addATodo } from '../../services/todoApi.ts';
import { fetchATodo } from '../../services/todoApi.ts';
import { DeleteATodo } from '../../services/todoApi.ts';
import type { Todo } from "../../../../todo-be/src/types/todo.ts"
import TodoCard from '../TodoCard/TodoCard.tsx';
import { useEffect, useState } from 'react';
import Head from "../Head/Head.tsx"
import styles from "./TodosDisplay.module.scss"





function TodosDisplay() {
    const [todoItems, setTodoItems] = useState<Todo[]>([])
    useEffect(function () {
        async function init() {
            try{
                const any = await fetchTodos();
                console.log(any);
                console.log("inside of useeffect")
                setTodoItems(any);
            }
            catch(error){
                console.error(error);
                alert(error);
            }
        }
        init();
    }, [])

    const todos = todoItems.map(todo =>
        <TodoCard key={todo.id} todo={todo}/>
    );

    return (
        <div >
            
            <div className={styles.mainDisplay}>
                <Head todos={todoItems} setTodos={setTodoItems} />
                <div>{todos}</div>
            </div>
            
        </div>
    )
}

/*function sortDone(todos:Todo[], doneLast:boolean) {        
        
        todos.sort((a: Todo, b: Todo) => {
            if (a.completed && !b.completed) {
                return doneLast? 1: -1;
            }
            if (!a.completed && b.completed) {
                return doneLast? -1: 1;
            }
            return 0;
        });
    }*/

export default TodosDisplay;



