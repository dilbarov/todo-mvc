/* tslint:disable:no-default-export */
import { action } from "@storybook/addon-actions";
import * as React from "react";

import { Checkbox } from "../src/Components/Checkbox/Checkbox";

export default { title: "Checkbox" };

export const checked = () => (
    <Checkbox value={true} onChange={action("change")} />
);

export const unchecked = () => (
    <Checkbox value={false} onChange={action("change")} />
);

export const twoCheckboxes = () => (
    <div>
        <Checkbox value={true} onChange={action("change")} />
        <Checkbox value={true} onChange={action("change")} />
    </div>
);

export const stateFull = () => {
    const [value, change] = React.useState(false);

    return <Checkbox value={value} onChange={change} />;
};
