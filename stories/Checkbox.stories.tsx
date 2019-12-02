import { action } from "@storybook/addon-actions";
import * as React from "react";

import { Checkbox } from "../src/Components/Checkbox/Checkbox";

export default { title: "Checkbox" };

export const checked = () => (
    <Checkbox checked={true} onClick={action("change")} />
);

export const unchecked = () => (
    <Checkbox checked={false} onClick={action("change")} />
);

export const twoCheckboxes = () => (
    <div>
        <Checkbox checked={true} onClick={action("change")} />
        <Checkbox checked={true} onClick={action("change")} />
    </div>
);

export const stateFull = () => {
    const [checked, change] = React.useState(false);

    return <Checkbox checked={checked} onClick={() => change(!checked)} />;
};