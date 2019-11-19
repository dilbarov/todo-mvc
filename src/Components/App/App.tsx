import * as React from "react";
import styles from './App.less';

class App extends React.Component {

    handler = () => {
        return "Hello";
    };

    render() {
        return (
            <div>
                <div className={styles.label}>My React App! {`${this.handler()?.length}`}</div>
            </div>
        );
    }
}

export default App;