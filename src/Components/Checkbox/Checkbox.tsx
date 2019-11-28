import * as React from "react";

import cn from "./Checkbox.less";

interface Props {
    value: boolean;
    onChange: (value: boolean) => void;
}

export class Checkbox extends React.Component<Props> {
    public render(): JSX.Element {
        return (
            <label className={cn("checkbox")}>
                <input
                    type={"checkbox"}
                    checked={this.props.value}
                    onChange={this.handleChange}
                />
                <div className={cn("checkboxText")} />
            </label>
        );
    }

    private readonly handleChange = (): void => {
        this.props.onChange(!this.props.value);
    };
}
