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
                                    <TodoItem value={todo}
                                              onDelete={() => this.deleteTodo(todo.id)}
                                              onChange={this.changeTodo}
                                              key={todo.id}/>
                                ))
                            }
                            <footer className={cn("todoFooter")}>
                                <span className={cn("todoCount")}>
                                    {this.getActiveItems().length} {`item${this.getActiveItems().length === 1 ? '' : 's'}`} left
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
                                            onClick={this.deleteCompletedTodos}
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

    private readonly deleteCompletedTodos = () => {
        this.setState({todos: this.getActiveItems()});
    };

    private readonly handleClickFilter = (e: React.MouseEvent) => {
        this.setState({currentFilter: e.currentTarget.innerHTML});
    };

    private readonly todosFilter = (item: Item) => {
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

    private readonly makeid = (length: number) => {
        let result = '';
        let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let charactersLength = characters.length;
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    };

    private readonly createTodo = (description: string) => {
        if (!description) {
            return;
        }
        return {
            description,
            completed: false,
            id: this.makeid(5)
        };
    };

    private readonly updateTodoList = (todos: Array<Item>) => {
        this.setState({currentValue: '', todos, isToggle: (todos.filter((item: Item) => item.completed).length === todos.length)});
    };

    private readonly handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") {
            let todos = [...this.state.todos, this.createTodo(this.state.currentValue)];
            this.updateTodoList(todos);
        }
    };

    private readonly handleChange = () => {
        this.setState({currentValue: this.textInput.current.value});
    };

    private readonly changeTodo = (todo: Item) => {
        let todos = this.state.todos.map((item: Item) => {
            if (item.id === todo.id) {
                item = todo;
            }
            return item;
        });
        this.updateTodoList(todos);
    };

    private readonly deleteTodo = (id: string) => {
        this.updateTodoList(this.state.todos.filter((item: Item) => item.id !== id));
    };

    private readonly handleToggle = () => {
        let todos = this.state.todos.map((item: Item) => {
            item.completed = !this.state.isToggle;
            return item;
        });
        this.updateTodoList(todos);
    };

    private readonly getActiveItems = () => {
        return this.state.todos.filter((item: Item) => !item.completed);
    }
}
