import * as React from 'react';
import * as ReactDOM from "react-dom";
import Index from './components/Index';

window.onload = function () {
    ReactDOM.render(<Index/>, document.getElementById("container"));
};