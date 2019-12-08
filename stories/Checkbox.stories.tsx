import { action } from "@storybook/addon-actions";
import * as React from "react";

import { Checkbox } from "../src/Components/Checkbox/Checkbox";
import Button from "@skbkontur/react-ui/Button";

export default { title: "Checkbox" };

export const checked = () => <Checkbox checked={true} onClick={action("change")} />;

export const unchecked = () => <Checkbox checked={false} onClick={action("change")} />;

export const twoCheckboxes = () => (
    <div>
        <Checkbox checked={true} onClick={action("change")} />
        <Checkbox checked={true} onClick={action("change")} />
        <Button>asdasd</Button>
    </div>
);

export const stateFull = () => {
    const [isChecked, change] = React.useState(false);

    return <Checkbox checked={isChecked} onClick={() => change(!isChecked)} />;
};
