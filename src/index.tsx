import React from 'react';
import ReactDOM from 'react-dom';
import AntdApp from './AntdApp';
import ReactApp from './ReactApp';
import { getQueryString } from './utils/index'

console.log(getQueryString())
if (getQueryString().antd) {
    ReactDOM.render(<AntdApp />, document.getElementById('root'));
} else if (getQueryString().react) {
    ReactDOM.render(<ReactApp />, document.getElementById('root'));
}
