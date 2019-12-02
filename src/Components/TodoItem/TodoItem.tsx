import * as React from "react";

import { Checkbox } from "../Checkbox/Checkbox";

import cn from "./TodoItem.less";

interface Props {
    value: Item;
    onChange: (x: Item) => void;
    onDelete: () => void;
}

interface State {
    isEdit: boolean;
    currentValue: string;
}

export interface Item {
    id: string;
    completed: boolean;
    description: string;
}

export class TodoItem extends React.Component<Props, State> {
    public state: State = {
        isEdit: false,
        currentValue: this.props.value.description,
    };

    private readonly textInput = React.createRef<HTMLInputElement>();

    public componentDidUpdate(prevProps: Props, prevState: State): void {
        if (!prevState.isEdit && this.state.isEdit) {
            const todoInput = this.textInput.current;
            todoInput.focus();
            todoInput.setSelectionRange(todoInput.value.length, todoInput.value.length);
        }
    }

    public render(): JSX.Element {
        const { description, completed, id } = this.props.value;
        const { onDelete } = this.props;
        const { isEdit, currentValue } = this.state;
        return (
            <div key={id} className={cn("todoItem")}>
                {!isEdit && (
                    <>
                        <div className={cn("indicator")}>
                            <Checkbox checked={completed} onClick={this.handleClickCheckbox} />
                        </div>
                        <label
                            className={cn("todoItemLabel", {
                                complete: completed,
                            })}
                            onDoubleClick={this.handleDoubleClick}>
                            {description}
                        </label>
                        <button className={cn("todoItemDeleteButton")} onClick={onDelete}>
                            <div className={cn("buttonIcon")} />
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
        );
    }

    private readonly handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") {
            this.completeEdit();
        } else if (e.key === "Escape") {
            this.cancelEdit();
        }
    };

    private readonly handleChange = () => {
        this.setState({ currentValue: this.textInput.current.value });
    };

    private readonly handleBlur = () => {
        this.completeEdit();
    };

    private readonly handleDoubleClick = () => {
        this.beginEdit();
    };

    private readonly handleClickCheckbox = () => {
        this.props.onChange({
            ...this.props.value,
            completed: !this.props.value.completed,
        });
    };

    private readonly beginEdit = () => {
        this.setState({
            isEdit: true,
            currentValue: this.props.value.description,
        });
    };

    private readonly completeEdit = () => {
        this.setState({ isEdit: false });
        if (this.state.currentValue) {
            this.props.onChange({
                ...this.props.value,
                description: this.state.currentValue,
            });
        } else {
            this.props.onDelete();
        }
    };

    private readonly cancelEdit = () => {
        this.setState({ isEdit: false, currentValue: "" });
    };
}
