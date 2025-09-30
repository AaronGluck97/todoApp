import type { FunctionComponent } from "react";
import styles from "./Button.module.scss"

interface IButtonProps{
    text:string;
    toolTip:string,
    onclickFunction: ()=>void;
    type?: string;
}

const Button : FunctionComponent<IButtonProps> = ({onclickFunction, text, toolTip, type}) => {
    return(

        <button className={type} title={toolTip} onClick={onclickFunction}>{text}</button>
    )
}
export default Button;