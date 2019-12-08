import ArrowChevronDownIcon from "@skbkontur/react-icons/ArrowChevronDown";
import * as React from "react";

import { Item, TodoItem } from "../TodoItem/TodoItem";

import cn from "./App.less";

interface State {
    isToggle: boolean;
    todos: Item[];
    currentValue: string;
    currentFilter: string;
}

export class App extends React.Component<{}, State> {
    public state: State = {
        isToggle: false,
        todos: [],
        currentValue: "",
        currentFilter: "All",
    };

    private readonly input = React.createRef<HTMLInputElement>();

    public componentDidMount(): void {
        fetch(`https://api.jsonbin.io/b/5dea42a81c19843d88e7777c`, {
            headers: {
                "secret-key": "$2b$10$aEUSApP0na9yZX6MU7L.1.Ba4lbKDv9dgz0fs2HfeV2A.8w9Y7As.",
            },
        })
            .then(res => res.json())
            .then((data: Item[]) => {
                this.setState({ todos: data });
            })
            .catch(error => {
                console.log(error);
            });
    }

    public render(): JSX.Element {
        const { isToggle, currentValue, todos } = this.state;

        return (
            <div className={cn("app")}>
                <div className={cn("label")}>todos</div>
                <div className={cn("list")}>
                    <div className={cn("header")}>
                        <input
                            className={cn("newTodo")}
                            type="text"
                            value={currentValue}
                            placeholder="What needs to be done?"
                            onKeyPress={this.handleKeyPress}
                            onChange={this.handleChange}
                            ref={this.input}
                        />
                        {todos.length > 0 && (
                            <div
                                className={cn("toggleAll", {
                                    active: isToggle,
                                })}
                                onClick={this.handleToggle}>
                                <ArrowChevronDownIcon />
                            </div>
                        )}
                    </div>

                    {todos.length > 0 && (
                        <div className={cn("todo")}>
                            {todos
                                .filter((item: Item) => this.todosFilter(item))
                                .map((todo: Item) => (
                                    <TodoItem
                                        value={todo}
                                        onDelete={() => this.deleteTodo(todo.id)}
                                        onChange={this.changeTodo}
                                        key={todo.id}
                                    />
                                ))}
                            <footer className={cn("todoFooter")}>
                                <span className={cn("todoCount")}>
                                    {`${this.getActiveItems().length} item${this.getActiveItems().length === 1 &&
                                        "s"} left`}
                                </span>
                                <div className={cn("filter")}>
                                    <a
                                        href="#"
                                        className={cn({
                                            selected: this.state.currentFilter === "All",
                                        })}
                                        onClick={this.handleClickFilter}>
                                        All
                                    </a>
                                    <a
                                        href="#"
                                        className={cn({
                                            selected: this.state.currentFilter === "Active",
                                        })}
                                        onClick={this.handleClickFilter}>
                                        Active
                                    </a>
                                    <a
                                        href="#"
                                        className={cn({
                                            selected: this.state.currentFilter === "Completed",
                                        })}
                                        onClick={this.handleClickFilter}>
                                        Completed
                                    </a>
                                </div>
                                <div className={cn("todoClear")}>
                                    {todos.filter((item: Item) => item.completed).length > 0 && (
                                        <button
                                            className={cn("buttonClearCompleted")}
                                            onClick={this.deleteCompletedTodos}>
                                            Clear completed
                                        </button>
                                    )}
                                </div>
                            </footer>
                        </div>
                    )}
                </div>
            </div>
        );
    }

    private readonly deleteCompletedTodos = () => {
        this.setState({ todos: this.getActiveItems() });
    };

    private readonly handleClickFilter = (e: React.MouseEvent) => {
        this.setState({ currentFilter: e.currentTarget.innerHTML });
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

    private readonly makeid: (l: number) => string = length => {
        let result = "";
        const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        const charactersLength = characters.length;
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    };

    private readonly createTodo: (d: string) => Item = description => ({
        description: description,
        completed: false,
        id: this.makeid(5),
    });

    private readonly updateTodoList = (todos: Item[]) => {
        this.setState({
            currentValue: "",
            todos: todos,
            isToggle: todos.filter((item: Item) => item.completed).length === todos.length,
        });
    };

    private readonly handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && this.state.currentValue) {
            const todos = [...this.state.todos, this.createTodo(this.state.currentValue)];
            this.updateTodoList(todos);
        }
    };

    private readonly handleChange = () => {
        this.setState({ currentValue: this.input.current.value });
    };

    private readonly changeTodo = (todo: Item) => {
        const todos = this.state.todos.map((item: Item) => {
            if (item.id === todo.id) {
                return todo;
            }
            return item;
        });
        this.updateTodoList(todos);
    };

    private readonly deleteTodo = (id: string) => {
        this.updateTodoList(this.state.todos.filter((item: Item) => item.id !== id));
    };

    private readonly handleToggle = () => {
        const todos = this.state.todos.map((item: Item) => {
            item.completed = !this.state.isToggle;
            return item;
        });
        this.updateTodoList(todos);
    };

    private readonly getActiveItems = () => this.state.todos.filter((item: Item) => !item.completed);
}
