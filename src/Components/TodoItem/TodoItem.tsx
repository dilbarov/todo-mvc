import * as React from "react";
import  cn from './TodoItem.less';

import {Checkbox} from '../Checkbox/Checkbox'
import DeleteIcon from "@skbkontur/react-icons/Delete";

interface Props extends Item{
    changeItem(Item): void;
    deleteItem(string): void;
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
    state: State = {
        isEdit: false,
        currentValue: this.props.description,
    };

    private readonly textInput = React.createRef<HTMLInputElement>();

    componentDidUpdate(prevProps: Props, prevState: State) {
        if (!prevState.isEdit && this.state.isEdit) {
            let todoInput = this.textInput.current;
            todoInput.focus();
            todoInput.setSelectionRange(todoInput.value.length, todoInput.value.length);
        }
    }

    render() {
        let {description, completed, id, deleteItem} = this.props;
        let {isEdit, currentValue} = this.state;
        return (
            <>
                <div key={id} className={cn('todoItem')}>
                    {
                        !isEdit && <>
                            <div className={cn("indicator")}>
                                <Checkbox
                                    checked={completed}
                                    onClick={this.handleClickCompleted}
                                />
                            </div>
                            <label className={cn('todoItemLabel', {complete: completed})}
                                   onDoubleClick={this.handleDoubleClick}>{description}
                            </label>
                            <button className={cn("todoItemDeleteButton")}
                                    onClick={() => deleteItem(id)}>
                                <div className={cn("buttonIcon")}></div>
                            </button>
                        </>
                    }

                    {
                        isEdit && <input className={cn(`todoItemInput`)}
                                         type="text"
                                         value={currentValue}
                                         onBlur={this.handleBlur}
                                         ref={this.textInput}
                                         onChange={this.handleChange}
                                         onKeyUp={this.handleKeyPress}
                        />
                    }
                </div>
            </>
        );
    }

    descriptionChange = () => {
        let {completed, id} = this.props;
        this.props.changeItem({completed, id, description: this.state.currentValue});
        this.setState({isEdit: false})
    };

    handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && this.textInput.current.value) {
            this.descriptionChange();
        } else if (e.key === "Enter" && !this.textInput.current.value) {
            this.props.deleteItem(this.props.id)
        } else if (e.key === "Escape") {
            this.setState({isEdit: false, currentValue: this.props.description})
        }
    };

    handleChange = () => {
        this.setState({currentValue: this.textInput.current.value})
    };

    handleBlur = () => {
        if (this.textInput.current.value && this.state.isEdit) {
            this.descriptionChange();
        } else if (!this.textInput.current.value) {
            this.props.deleteItem(this.props.id)
        }
    };

    handleDoubleClick = () => {
        this.setState({isEdit: true});
    };

    handleClickCompleted = () => {
        let {description, id} = this.props;
        let value: boolean = !this.props.completed;
        this.props.changeItem({description, id, completed: value});
    };
}
