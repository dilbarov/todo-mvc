import DeleteIcon from "@skbkontur/react-icons/Delete";
import * as React from "react";

import { Checkbox } from "../Checkbox/Checkbox";

import cn from "./TodoItem.less";

interface Item {
    id: string;
    completed: boolean;
    desc: string;
    active: boolean;
}

interface Props {
    item: Item;
    onChangeItem(update: Partial<Item>): void;
    onEdit(any): void;
    deleteItem(string): void;
}

interface State {
    isEdit: boolean;
    currentValue: string;
}

export class TodoItem extends React.Component<Props, State> {
    public state = {
        isEdit: false,
        currentValue: this.props.item.desc,
    };

    private readonly textInput = React.createRef<HTMLInputElement>();

    public componentDidUpdate(prevProps, prevState) {
        if (!prevState.isEdit && this.state.isEdit) {
            const todoInput = this.textInput.current;
            todoInput.focus();
            todoInput.setSelectionRange(
                todoInput.value.length,
                todoInput.value.length
            );
        }
    }

    public render(): JSX.Element {
        const { item, deleteItem } = this.props;
        const { isEdit, currentValue } = this.state;

        return (
            <>
                <div key={item.id} className={cn("todoItem")}>
                    {!isEdit && (
                        <>
                            <Checkbox
                                value={item.completed}
                                onChange={this.handleClickCompleted}
                            />
                            <label
                                className={cn("todoItemLabel", {
                                    complete: this.props.item.completed,
                                })}
                                onDoubleClick={this.handleDoubleClick}>
                                {item.desc}
                            </label>
                            <button
                                className={cn("todoItemDeleteButton")}
                                onClick={() => deleteItem(item.id)}>
                                <div className={cn("buttonIcon")}>
                                    <DeleteIcon />
                                </div>
                            </button>
                        </>
                    )}

                    {isEdit && (
                        <input
                            className={cn(`todoItemInput`)}
                            type="text"
                            value={currentValue}
                            onBlur={this.handleBlur}
                            ref={this.textInput}
                            onChange={this.handleChange}
                            onKeyUp={this.handleKeyPress}
                        />
                    )}
                </div>
            </>
        );
    }

    public handleKeyPress = e => {
        if (e.key === "Enter" && e.target.value !== "") {
            const todo = this.props.item;
            todo.desc = this.state.currentValue;
            this.props.onChangeItem({ desc: todo });
            this.setState({ isEdit: false });
        } else if (e.key === "Enter" && e.target.value === "") {
            this.props.deleteItem(this.props.item.id);
        } else if (e.key === "Escape") {
            this.setState({ isEdit: false });
        }
    };

    public handleChange = e => {
        this.setState({ currentValue: e.target.value });
    };

    public handleBlur = e => {
        if (e.target.value !== "" && this.state.isEdit) {
            const todo = this.props.item;
            todo.desc = this.state.currentValue;
            this.props.onEdit(todo);
            this.setState({ isEdit: false });
        } else if (e.target.value === "") {
            this.props.deleteItem(this.props.item.id);
        }
    };

    public handleDoubleClick = () => {
        this.setState({ isEdit: true });
    };

    public handleClickCompleted = (completed: boolean) => {
        this.props.onChangeItem({ completed: completed });
    };
}
