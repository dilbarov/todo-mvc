import * as React from "react";
import {Item, TodoItem} from "../TodoItem/TodoItem";

import cn from './App.less';

import ArrowChevronDownIcon from "@skbkontur/react-icons/ArrowChevronDown";

interface State {
    isToggle: boolean;
    todos: Array<Item>;
    currentValue: string;
    currentFilter: string;
}

export class App extends React.Component<{}, State> {
    state = {
        isToggle: false,
        todos: [],
        currentValue: '',
        currentFilter: 'All'
    };

    private readonly textInput = React.createRef<HTMLInputElement>();

    render() {
        const {isToggle, currentValue, todos} = this.state;

        return (
            <div className={cn("app")}>
                <div className={cn("label")}>todos</div>
                <div className={cn("list")}>
                    <div className={cn("header")}>
                        <input className={cn("newTodo")} type="text" value={currentValue}
                               placeholder="What needs to be done?"
                               onKeyPress={this.handleKeyPress}
                               onChange={this.handleChange}
                               ref={this.textInput}/>
                        {
                            todos.length > 0 &&
                            <div className={cn('toggleAll', {active: isToggle})}
                                 onClick={this.handleToggle}>
                                <ArrowChevronDownIcon/>
                            </div>
                        }
                    </div>

                    {
                        todos.length > 0 && <div className={cn("todo")}>
                            {
                                todos.filter((item: Item) => this.todosFilter(item)).map((todo: Item) => (
                                    <TodoItem id={todo.id}
                                              description={todo.description}
                                              completed={todo.completed}
                                              deleteItem={this.deleteTodo}
                                              changeItem={this.changeTodo}
                                              key={todo.id}/>
                                ))
                            }
                            <footer className={cn("todoFooter")}>
                                <span className={cn("todoCount")}>
                                    {this.getActiveItemsCount()} {`item${this.getActiveItemsCount() === 1 ? '' : 's'}`} left
                                </span>
                                <div className={cn("filter")}>
                                    <a href="#" className={cn({selected: this.state.currentFilter === 'All'})}
                                       onClick={this.handleClickFilter}>All</a>
                                    <a href="#"
                                       className={cn({selected: this.state.currentFilter === 'Active'})}
                                       onClick={this.handleClickFilter}>Active</a>
                                    <a href="#"
                                       className={cn({selected: this.state.currentFilter === 'Completed'})}
                                       onClick={this.handleClickFilter}>Completed</a>
                                </div>
                                <div className={cn("todoClear")}>
                                    {
                                        todos.filter((item: Item) => item.completed).length > 0 &&
                                        <button
                                            className={cn("buttonClearCompleted")}
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
        let todos = this.state.todos.filter((item: Item) => !item.completed);
        this.setState({todos});
    };

    handleClickFilter = (e: React.MouseEvent) => {
        this.setState({currentFilter: e.currentTarget.innerHTML});
    };

    todosFilter = (item: Item) => {
        switch (this.state.currentFilter) {
            case "All":
                return item;
            case "Active":
                return !item.completed;
            case "Completed":
                return item.completed;
            default:
                return item;
        }
    };

    makeid = (length: number) => {
        let result = '';
        let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let charactersLength = characters.length;
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    };

    createTodo = (description: string) => {
        return {
            description,
            completed: false,
            id: this.makeid(5)
        };
    };

    handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && this.textInput.current.value) {
            let value = this.state.currentValue;
            let todos = this.state.todos;
            this.setState({currentValue: ''});
            todos.push(this.createTodo(value));
            this.checkToggle(todos);
        }
    };

    handleChange = () => {
        this.setState({currentValue: this.textInput.current.value});
    };

    changeTodo = (todo: Item) => {
        let todos = this.state.todos.map((item: Item) => {
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
        todos = todos.filter((item: Item) => item.id !== id);
        this.setState({todos});
        this.checkToggle(todos);
    };

    handleToggle = () => {
        let {isToggle} = this.state;
        let todos = this.state.todos.map((item: Item) => {
            item.completed = !isToggle;
            return item;
        });
        this.setState({todos});
        this.checkToggle(todos);
    };

    checkToggle = (todos: Array<Item>) => {
        let completedTodosCount = todos.filter((item: Item) => item.completed).length;
        let todosCount = todos.length;
        this.setState({isToggle: (completedTodosCount === todosCount)});
    };

    getActiveItemsCount = () => {
        return this.state.todos.filter((item: Item) => !item.completed).length;
    }
}
