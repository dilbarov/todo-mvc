import * as React from "react";

import {TodoItem} from "../src/Components/TodoItem/TodoItem";

export default {title: "Button"};

export const simpleCase = () => {
    return (
        <TodoItem id={"hgf"}
                  description={"sdfsdf"}
                  completed={false}
                  changeItem={() => {
                  }}
                  deleteItem={() => {
                  }}/>

    )
};