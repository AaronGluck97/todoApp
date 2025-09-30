import Popup from "reactjs-popup";
import styles from "./FormModal.module.scss";
import type { FunctionComponent } from "react";
import { useEffect, useState } from "react";
import { addATodo } from '../../services/todoApi.ts';
import { updateATodo } from "../../services/todoApi.ts";
import type { Todo } from "../../../../todo-be/src/types/todo.ts";
import type { UpdateTodoRequest } from "../../../../todo-be/src/types/updateTodoRequest.ts";
import Button from "../shared/Button.tsx";


interface IFormProps {
    todo?: Todo,
    action: (text: string) => void
}

export function loadForm(props: IFormProps) {

    return <FormModal todo={props.todo} action={props.action} />
}

const FormModal: FunctionComponent<IFormProps> = ({ todo, action }) => {
    const [text, setText] = useState(todo ? todo.text : "");
    const [open, setOpen] = useState(false);
   /* useEffect(
        function () { 
            setup(){
            setText(todo ? todo.text : "")
        }
        setup()
    },open);*/
    return (
        <>
            <Button type={"primary"} toolTip={todo ? "edit" : "add new todo"} onclickFunction={()=> setOpen(true)} text={todo ? "📝" : "+"}/>
            <Popup open={open} closeOnDocumentClick={false}>
                <div className={styles.module}>
                    <h3>{todo ? "Edit Todo" : "Add a Todo"}</h3>
                    <label className={styles.todoMoc}>Todo: <textarea value={text} onChange={(e) => setText(e.target.value)}></textarea></label>
                    <div className={styles.buttonContainer}>
                        <button className={styles.secondary} onClick={(e) => {
                            setText(todo ? todo.text : "");
                            setOpen(false);
                        }
                        }>cancel</button>

                        <button className={styles.primary} onClick={(e) => {
                            if (!text.trim()) {
                                alert("no text entered");
                                return;
                            }
                            if (todo && text.trim() == todo.text) {
                                alert("no changes made");
                                return;
                            }
                            try {
                                action(text);
                                setText(todo ? text : "");
                                setOpen(false);
                            }
                            catch (error) {
                                console.log(error);
                                alert(error);
                            }
                        }}>confirm</button>
                    </div>
                </div>
            </Popup >
        </>
    )
}
export default FormModal;