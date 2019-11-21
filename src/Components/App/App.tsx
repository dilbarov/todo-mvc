import * as React from "react";

import TodoItem from "../TodoItem/TodoItem";
import './App.less';

import ArrowChevronDownIcon from "@skbkontur/react-icons/ArrowChevronDown";

interface State {
    isToggle: boolean;
    todos: any;
    currentValue: string;
}

class App extends React.Component<{}, State> {
    state = {
        isToggle: false,
        todos: [],
        currentValue: '',
    };

    render() {
        const { isToggle, currentValue, todos } = this.state;
        return (
            <div className={"app"}>
                <div className={"label"}>todos</div>
                <div className={"list"}>
                    <div className={"header"}>
                        <input className={"new__todo"} type="text" value={currentValue}
                               placeholder="What needs to be done?"
                               onKeyPress={this.handleKeyPress}
                               onChange={this.handleChange}/>
                        {
                            todos.length > 0 &&
                            <div className={`toggle_all${ isToggle ? "-active" : "" }`}
                                 onClick={this.handleToggle}>
                                <ArrowChevronDownIcon/>
                            </div>
                        }
                    </div>

                    {
                        todos.length > 0 && <div className={"todo"}>
                            {
                                todos.map(todo => (
                                    <TodoItem item={todo} deleteItem={this.deleteTodo} changeItem={this.changeTodo} key={todo.id} onEdit={this.changeTodo}/>
                                ))
                            }
                        </div>
                    }
                </div>
            </div>
        );
    }

    makeid = (length) => {
        let result = '';
        let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let charactersLength = characters.length;
        for ( let i = 0; i < length; i++ ) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    };

    createTodo = (desc: string) => {
        return {
            desc: desc,
            active: true,
            completed: false,
            id: this.makeid(5)
        };
    };

    handleKeyPress = (e) => {
        if (e.key === "Enter") {
            let value = this.state.currentValue;
            let todos = this.state.todos;
            this.setState({currentValue: ''});
            todos.push(this.createTodo(value));
            this.checkToggle(todos);
        }
    };

    handleChange = (e) => {
        this.setState({currentValue: e.target.value});
    };

    changeTodo = (todo) => {
        let todos = this.state.todos.map(item => {
            if (item.id === todo.id) {
                item = todo;
            }
            return item;
        });
        this.setState({todos});
        this.checkToggle(todos);
    };

    deleteTodo = (id) => {
        let {todos} = this.state;
        todos = todos.filter(item => item.id !== id);
        this.setState({todos});
        this.checkToggle(todos);
    };

    handleToggle = () => {
        let {isToggle} = this.state;
        let todos = this.state.todos.map(item => {
            item.active = !isToggle;
            item.completed = !isToggle;
            return item;
        });
        this.setState({todos});
        this.checkToggle(todos);
    };

    checkToggle = (todos = undefined) => {
        let completedTodos = this.state.todos.filter(item => item.completed === true);
        let todosCount = todos ? todos.length : this.state.todos.length;
        this.setState({ isToggle: (completedTodos.length === todosCount) });
    }

}


export default App;