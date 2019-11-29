import * as React from "react";
import  cn from './TodoItem.less';

import DeleteIcon from "@skbkontur/react-icons/Delete";

interface Props {
    item: any;
    changeItem(any): void;
    onEdit(any): void;
    deleteItem(string): void;
}

interface State {
    isEdit: boolean;
    currentValue: string;
}

export class TodoItem extends React.Component<Props, State> {
    state = {
        isEdit: false,
        currentValue: this.props.item.desc,
    };

    private textInput = React.createRef<HTMLInputElement>();

    componentDidUpdate(prevProps, prevState) {
        if (!prevState.isEdit && this.state.isEdit) {
            let todoInput = this.textInput.current;
            todoInput.focus();
            todoInput.setSelectionRange(todoInput.value.length, todoInput.value.length);
        }
    }

    render() {
        let {item, deleteItem} = this.props;
        let {isEdit, currentValue} = this.state;
        return (
            <>
                <div key={item.id} className={cn('todoItem')}>
                    {
                        !isEdit && <>
                            <label className={cn("checkbox")}>
                                <input type={"checkbox"}
                                       checked={item.completed}
                                       onChange={this.handleClickCompleted}/>
                                <div className={cn("checkboxText")} />
                            </label>
                            <label className={cn('todoItemLabel', {complete: this.props.item.completed})}
                                   onDoubleClick={this.handleDoubleClick}>{item.desc}
                            </label>
                            <button className={cn("todoItemDeleteButton")}
                                    onClick={() => deleteItem(item.id)}>
                                <div className={cn("buttonIcon")}><DeleteIcon/></div>
                            </button>
                        </>
                    }

                    {
                        isEdit && <input className={`todoItemInput`}
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

    handleKeyPress = (e) => {
        if (e.key === "Enter" && e.target.value !== '') {
            let todo = this.props.item;
            todo.desc = this.state.currentValue;
            this.props.onEdit(todo);
            this.setState({isEdit: false})
        } else if (e.key === "Enter" && e.target.value === '') {
            this.props.deleteItem(this.props.item.id)
        } else if (e.key === "Escape") {
            this.setState({isEdit: false})
        }
    };

    handleChange = (e) => {
        this.setState({currentValue: e.target.value})
    };

    handleBlur = (e) => {
        if (e.target.value !== '' && this.state.isEdit) {
            let todo = this.props.item;
            todo.desc = this.state.currentValue;
            this.props.onEdit(todo);
            this.setState({isEdit: false});
        } else if (e.target.value === '') {
            this.props.deleteItem(this.props.item.id)
        }

    };

    handleDoubleClick = () => {
        this.setState({isEdit: true});
    };

    handleClickCompleted = () => {
        let {item} = this.props;
        item.completed = !item.completed;
        item.active = !item.active;
        this.props.changeItem(item);
    };
}
