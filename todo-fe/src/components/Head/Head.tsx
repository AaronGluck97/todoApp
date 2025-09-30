import styles from "./Head.module.scss"
import FormModal from "../FormModal/FormModal.tsx";
import loadform from "../FormModal/FormModal.tsx"
import type { Todo } from "../../../../todo-be/src/types/todo.ts";
import { addATodo } from "../../services/todoApi.ts";
import type { FunctionComponent } from "react";
import Button from "../shared/Button.tsx";

interface IHeadProps {
    todos: Todo[],
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const Head: FunctionComponent<IHeadProps> = ({ todos, setTodos }) => {

    async function makeNew(text: string) {
        try {
            const one = await addATodo(text);
            console.log(one);
            setTodos([one, ...todos]);
        }
        catch (error: any) {
            throw error;
        }
    }

    return (
        <div className={styles.header}>
            <h1>Todo App.</h1>
            <div className={styles.addNewButton}>
                <FormModal action={makeNew} />
            </div>
        </div>

    );
}

export default Head;