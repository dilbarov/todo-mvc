import * as React from "react";

import {TodoItem} from "../src/Components/TodoItem/TodoItem";

export default {title: "Button"};

export const simpleCase = () => {
    return (
        <TodoItem value={ {id: '123', description: "sadfsdf", completed: false } }
                  onChange={() => {
                  }}
                  onDelete={() => {
                  }}/>

    )
};