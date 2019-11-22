import * as React from "react";

import TodoItem from "../TodoItem";
import './App.less';

import ArrowChevronDownIcon from "@skbkontur/react-icons/ArrowChevronDown";

interface State {
    isToggle: boolean;
    todos: any;
    currentValue: string;
    currentFilter: string;
}

class App extends React.Component<{}, State> {
    state = {
        isToggle: false,
        todos: [],
        currentValue: '',
        currentFilter: 'All'
    };

    render() {
        const {isToggle, currentValue, todos} = this.state;

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
                            <div className={`toggle_all${isToggle ? "-active" : ""}`}
                                 onClick={this.handleToggle}>
                                <ArrowChevronDownIcon/>
                            </div>
                        }
                    </div>

                    {
                        todos.length > 0 && <div className={"todo"}>
                            {
                                todos.filter(item => this.todosFilter(item)).map(todo => (
                                    <TodoItem item={todo} deleteItem={this.deleteTodo} changeItem={this.changeTodo}
                                              key={todo.id} onEdit={this.changeTodo}/>
                                ))
                            }
                            <footer className={"todo__footer"}>
                                <span
                                    className={"todo_count"}>{this.getActiveItemsCount()} {`item${this.getActiveItemsCount() === 1 ? '' : 's'}`} left</span>
                                <div className={"filter"}>
                                    <a href="#/" className={this.state.currentFilter === 'All' ? "selected" : ''}
                                       data-target={"All"}
                                       onClick={this.handleClickFilter}>All</a>
                                    <a href="#/active"
                                       className={this.state.currentFilter === 'Active' ? "selected" : ''}
                                       data-target={"Active"}
                                       onClick={this.handleClickFilter}>Active</a>
                                    <a href="#/completed"
                                       className={this.state.currentFilter === 'Completed' ? "selected" : ''}
                                       data-target={"Completed"}
                                       onClick={this.handleClickFilter}>Completed</a>
                                </div>
                                <div className={"todo_clear"}>
                                    {
                                        todos.filter(item => item.completed === true).length > 0 &&
                                        <button
                                            className={"button__clear_completed"}
                                            onClick={this.deleteCompleteTodos}
                                        >
                                            Clear completed
                                        </button>
                                    }
                                </div>
                            </footer>
                        </div>
                    }
                </div>
            </div>
        );
    }

    deleteCompleteTodos = () => {
        let todos = this.state.todos.filter(item => item.completed === false);
        this.setState({todos});
    };

    handleClickFilter = (e) => {
        this.setState({currentFilter: e.target.dataset.target});
    };

    todosFilter = (item) => {
        switch (this.state.currentFilter) {
            case "All":
                return item;
            case "Active":
                return item.active === true;
            case "Completed":
                return item.completed === true;
            default:
                return item;
        }
    };

    makeid = (length) => {
        let result = '';
        let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let charactersLength = characters.length;
        for (let i = 0; i < length; i++) {
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
        if (e.key === "Enter" && e.target.value !== '') {
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
            item.active = isToggle;
            item.completed = !isToggle;
            return item;
        });
        this.setState({todos});
        this.checkToggle(todos);
    };

    checkToggle = (todos) => {
        let completedTodosCount = todos.filter(item => item.completed === true).length;
        let todosCount = todos.length;
        this.setState({isToggle: (completedTodosCount === todosCount)});
    };

    getActiveItemsCount = () => {
        return this.state.todos.filter(item => item.active === true).length;
    }

}


export default App;