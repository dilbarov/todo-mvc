import * as React from "react";
import * as ReactDOM from 'react-dom';
import './TodoItem.less';

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

class TodoItem extends React.Component<Props, State> {
    state = {
        isEdit: false,
        currentValue: this.props.item.desc,
    };

    componentDidUpdate(prevProps, prevState) {
        if (!prevState.isEdit && this.state.isEdit) {
            let todoInput = (ReactDOM.findDOMNode(this.refs[this.props.item.id]) as HTMLInputElement);
            todoInput.focus();
            todoInput.setSelectionRange(todoInput.value.length, todoInput.value.length);
        }
    }

    render() {
        let {item, deleteItem} = this.props;
        let {isEdit, currentValue} = this.state;
        return (
            <>
                <div key={item.id} className={"todo__item"}>
                    <input className={"toggle"} type={"checkbox"} checked={item.completed}
                           onChange={this.handleClickCompleted}/>
                    <label className={"todo__item_label"} onDoubleClick={this.handleDoubleClick}>{item.desc}</label>
                    <button className={"todo__item_delete"} onClick={() => deleteItem(item.id)}>
                        <div className={"button__icon"}><DeleteIcon/></div>
                    </button>
                    <input className={`todo__item_input${isEdit ? "-edit" : ""}`} type="text"
                           value={currentValue} onBlur={this.handleBlur} ref={item.id} onChange={this.handleChange}
                           onKeyPress={e => this.handleKeyPress(e)}/>
                </div>

            </>

        );
    }

    handleKeyPress = (e) => {
        if (e.key === "Enter") {
            let todo = this.props.item;
            todo.desc = this.state.currentValue;
            this.props.onEdit(todo);
            this.setState({isEdit: false})
        }
    };

    handleChange = (e) => {
        this.setState({currentValue: e.target.value})
    };

    handleBlur = () => {
        this.setState({isEdit: false});
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

export default TodoItem;