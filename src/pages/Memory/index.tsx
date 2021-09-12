import React, { Component } from 'react';
import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import 'antd/lib/style/index.css';
import './index.less';

interface IProps {
  history: {
    push(url: string): void;
  };
}

interface IState {
  items: Array<string>;
}


class Login extends Component<IProps,IState> {
  constructor(props) {
    super(props);
    console.log('memory')
    this.state = {
      items: []
    };
  }

  // componentDidMount(){
  //   var longArray = new Array(10000).fill('ufo')
  //   var longArray2  = longArray.map((item,index)=>{
  //     return index + '----------'
  //   })
  //   this.setState({
  //     items:longArray2
  //   })

  //   this.long()

  // }


  long() {
    var observer = new PerformanceObserver(function (list) {
      var perfEntries = list.getEntries();
      for (var i = 0; i < perfEntries.length; i++) {
        // Process long task notifications:
        // report back for analytics and monitoring
        // ...
        console.log(perfEntries[i])
      }
    });
    // register observer for long task notifications
    observer.observe({ entryTypes: ["longtask"] });
  }


  onHandle(e){
    console.log(e)
  }

  // 表单提交
  handleSubmit = values => {
    const { history } = this.props;
    history.push('/dashboard');
  };

  render() {
    return (
      <>
        {/* {this.state.items.map((item,index)=><div onClick={this.onHandle} key={index}>item</div>)} */}
      </>
    );
  }
}

export default Login;
