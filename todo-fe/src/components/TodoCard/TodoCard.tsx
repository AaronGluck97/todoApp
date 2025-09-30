
import styles from "./TodoCard.module.scss";
import type { FunctionComponent } from "react";
import FormModal from "../FormModal/FormModal.tsx";
import { useState } from "react";
import { updateATodo } from "../../services/todoApi.ts";
import { DeleteATodo } from "../../services/todoApi.ts";
import Button from "../shared/Button.tsx";


type Todo = {
    id: number,
    text: string,
    completed: boolean,
    created_at: string;
    updated_at: string;
}

interface ITodoProps {
    todo: Todo,
}


const TodoCard: FunctionComponent<ITodoProps> = ({ todo }) => {
    const [thisTodo, setThisTodo] = useState(todo);
    const [deleted, setDeleted] = useState(false)

    if (deleted) {
        return;
    }

    async function makeDone() {
        try {
            const any = await updateATodo(thisTodo.id, { completed: !thisTodo.completed })
            setThisTodo(any)
        }
        catch (err) {
            console.log(err);
            alert(err);
        }
    }
    async function update(text: string) {
        try {
            const any = await updateATodo(thisTodo.id, { text: text });
            setThisTodo(any);
        } catch (error) {
            console.log(error)
            throw error;
        }
    }
    async function deleteTodo() {
        try {
            await DeleteATodo(thisTodo.id);
            setDeleted(true)

        } catch (error) {
            console.log(error)
            alert(error);
        }
    }

    return (
        <div className={thisTodo.completed ? styles.doneCard : styles.todoCard}>

            <input title = "done" className={styles.checkBox} type="checkbox" checked={thisTodo.completed}
                onChange={makeDone} />

            {TodoBody(thisTodo)}

            <div className={styles.buttonContainer}>
                <FormModal todo={thisTodo} action={update} />
                <Button toolTip={"delete"} text ={"🗑️"} onclickFunction={deleteTodo}/>  
            </div>
        </div>
    );
}




function TodoBody(todo: Todo) {
    return (
        <div className={styles.bodyContainer}>
            <div className={styles.todoText}>
                {todo.text}
            </div>
            <div className={styles.dates}>
                {datesString(todo.created_at, todo.updated_at)}
            </div>
        </div>
    );
}

function datesString(created: string, updated: string) {
    const dates = ["created: " + formatDate(created)];

    if (created != updated) {
        dates.push("updated: " + formatDate(updated))
    }

    return dates.join(" | ")
}
function formatDate(badDate: string) {

    const correctDate = new Date(badDate + "Z UTC")
    const today = new Date()


    if (today.toDateString() === correctDate.toDateString()) {
        return correctDate.toLocaleTimeString();
    }

    //same week, day long, and time

    //MM/DD/YY and time

    return correctDate.toDateString() + " " + correctDate.toLocaleTimeString();
}



export default TodoCard;
