import React, { Component } from 'react';
import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import 'antd/lib/style/index.css';
import './index.less';

interface IProps {
  history: {
    push(url: string): void;
  },
  theme: string,
}

interface CProps {
  theme: string,
}

interface IState {
  theme: string;
}


const ThemeContext = React.createContext('light');


class Context extends Component<IProps, IState> {
  constructor(props) {
    super(props);
    console.log('-------')
    this.state = {
      theme:'dark',
    };
  }

  render() {
    console.log('parent1')
    return (
      <ThemeContext.Provider value="dark">
        ufo
        <B1 theme="dark" />
        <C1 theme="dark" />
      </ThemeContext.Provider>
    )
  }
}


function B1(props: CProps) {
  // Toolbar 组件接受一个额外的“theme”属性，然后传递给 ThemedButton 组件。
  // 如果应用中每一个单独的按钮都需要知道 theme 的值，这会是件很麻烦的事，
  // 因为必须将这个值层层传递所有组件。
  console.log('B1')
  return (
    <div>
      {/* <ThemedButton theme={props.theme} /> */}
      <B2 />
    </div>
  );
}

class B2 extends React.Component {
  static contextType = ThemeContext;
  

  render() {
    console.log('B2') 
    // return <Button theme={this.props.theme} />;
    return <Button theme={this.context} />;
  }
}

function C1(props: CProps) {
  // Toolbar 组件接受一个额外的“theme”属性，然后传递给 ThemedButton 组件。
  // 如果应用中每一个单独的按钮都需要知道 theme 的值，这会是件很麻烦的事，
  // 因为必须将这个值层层传递所有组件。
  console.log('c1')
  return (
    <div>
      {/* <ThemedButton theme={props.theme} /> */}
      <C2 />
    </div>
  );
}

class C2 extends React.Component {
  static contextType = ThemeContext;
  

  render() {
    console.log('c2')
    // return <Button theme={this.props.theme} />;
    return <Button theme={this.context} />;
  }
}

export default Context;
