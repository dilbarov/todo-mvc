import { action } from "@storybook/addon-actions";
import * as React from "react";

import { TodoItem } from "../src/Components/TodoItem/TodoItem";

export default { title: "TodoItem" };

export const simpleItem = () => (
    <TodoItem
        value={{ id: "123", description: "sadfsdf", completed: false }}
        onChange={() => {
            action("Change");
        }}
        onDelete={() => {
            action("Delete");
        }}
    />
);

export const twoItem = () => (
    <>
        <TodoItem
            value={{ id: "123", description: "sadfsdf", completed: false }}
            onChange={() => {
                action("Change");
            }}
            onDelete={() => {
                action("Delete");
            }}
        />
        <TodoItem
            value={{ id: "456", description: "sadasdfsdf", completed: false }}
            onChange={() => {
                action("Change");
            }}
            onDelete={() => {
                action("Delete");
            }}
        />
    </>
);
