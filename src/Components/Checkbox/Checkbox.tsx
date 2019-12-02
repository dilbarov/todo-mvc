import * as React from "react";
import  cn from './Checkbox.less';

interface CheckboxProps {
    checked: boolean;
    onClick(): boolean | void | React.SetStateAction<boolean>;
}

export const Checkbox = (props: CheckboxProps) => {
    return (
        <label className={cn("checkbox")}>
            <input type={"checkbox"}
                   checked={props.checked}
                   onChange={props.onClick}/>
            <div className={cn("checkboxProjector")} />
        </label>
    )
};