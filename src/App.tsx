import React from 'react';
// import * as Sentry from '@sentry/react';
// import { ConfigProvider } from 'antd';
// import zh_CN from 'antd/lib/locale-provider/zh_CN';
// import { Switch, Router, Route } from 'react-router-dom';
// import { createHashHistory } from 'history';
// import ErrorBoundary from '@components/ErrorBoundary/index';
// import IndexPage from '@/layout/index';
// import Login from '@/pages/Login';
// import './styles/index.less';

// const history = createHashHistory();

// Sentry.init({ dsn: 'https://11f12914dc114782b37d9d94c8839a40@o414598.ingest.sentry.io/5304319' });

interface IProps { }

interface IState {
  ufo: Array<string>;
}

export default class App extends React.Component<IProps, IState> {
  constructor(props) {
    super(props);
    this.state = {
      ufo: []
    }
  }

  componentDidMount(){
    var longArray = new Array(10000).fill('ufo')
    var longArray2  = longArray.map((item,index)=>{
      return index + '----------'
    })
    this.setState({
      ufo:longArray2
    })

    this.long()

  }



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

  render() {
    


    return (
      <>
        {this.state.ufo.map((item,index)=><div onClick={this.onHandle} key={index}>item</div>)}
      </>
      // <div></div>
      // <ConfigProvider locale={zh_CN}>
      //   <Router history={history}>
      //     <Switch>
      //       <Route path='/login' exact component={Login} />
      //       <ErrorBoundary>
      //         <IndexPage />
      //       </ErrorBoundary>
      //     </Switch>
      //   </Router>
      // </ConfigProvider>
    );
  }
}
