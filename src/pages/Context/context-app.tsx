import React, { Component, useRef, useState } from 'react';
import { ThemeContext, ThemeContext2, themes, UserContext } from './context';
import ThemedButton from './themed-button';
import ThemeTogglerButton from './theme-toggler-button';
import MultiTest from './multi-test';
import ColumnGroup from 'rc-table/lib/sugar/ColumnGroup';

// 一个使用 ThemedButton 的中间组件
function Toolbar(props) {
  console.log('render toolbar')
  return (
    <ThemedButton onClick={props.changeTheme}>
      Change Theme
    </ThemedButton>
  );
}
function Other() {
  console.log('render Other')
  return (
    <div>other</div>
  );
}
function Other2() {
  console.log('render Other2')
  return (
    <div>other</div>
  );
}

function SidebarInner() {
  console.log('sidebarInner render')
  return (
    <div>
      Sidebar inner
    </div>
  );
}

function Sidebar() {
  console.log('sidebar render')
  return (
    <div>
      Sidebar
      <SidebarInner></SidebarInner>
    </div>
  );
}

function Layout() {
  console.log('layout render')
  return (
    <div>
      <Sidebar />
      <ContentMulti />
    </div>
  );
}

function Content() {
  return (
    <div>
      <ThemeTogglerButton />
    </div>
  );
}

function ContentMulti() {
  console.log('contentmulti render')
  return (
    <div>
      <MultiTest />
    </div>
  );
}


class ContextApp extends React.Component {
  toggleTheme: () => void;
  setValue1: () => void;
  constructor(props) {
    super(props);

    this.toggleTheme = () => {
      console.log('toggleTheme')
      this.setState(state => ({
        themes:
          state.themes === themes.dark
            ? themes.light
            : themes.dark,
      }));
    };
    this.state = {
      themes: themes.light,
      toggleTheme: this.toggleTheme,
      value1: 0,
    };

    this.setValue1 = () => {
      this.setState({
        ...this.state,
        value1: ++this.state.value1,
      })
    }
  }



  render() {
    // 在 ThemeProvider 内部的 ThemedButton 按钮组件使用 state 中的 theme 值，
    // 而外部的组件使用默认的 theme 值
    console.log('state', this.state)
    const value2 = 'value2--'
    return (
      <div>
        {/* <ThemeContext.Provider value={this.state}>
          <Toolbar changeTheme={this.toggleTheme} />
        </ThemeContext.Provider>
        <div style={{ height: '50px', width: "300px" }}>
          <ThemedButton onClick={this.toggleTheme} ufo="ufo">UFO</ThemedButton>
        </div>
        <ThemeContext.Provider value={this.state}>
          <Toolbar changeTheme={this.toggleTheme} />
        </ThemeContext.Provider>
        <ThemedButton onClick={this.toggleTheme} ufo="ufo">UFO</ThemedButton>
        <ThemeContext.Provider value={this.state}>
          <Content />
        </ThemeContext.Provider> */}

        <Other></Other>
        <Other2></Other2>
        <ThemeContext.Provider value={this.state.value1}>
          <UserContext.Provider value={value2}>
            <ThemeContext2.Provider value={this.state}>
              {this.props.children}
            </ThemeContext2.Provider>
          </UserContext.Provider>
        </ThemeContext.Provider>
       
        
        <button onClick={()=>{
          this.setValue1()
        }}>setValue1</button>
      </div>
    );
  }
}


function App() {
  const ref = useRef({ refInit: 999 })
  let [data1, setData1] = useState(8)
  console.log('app----------')
  return <ContextApp>
    <Layout />
    <button name="test  data1" onClick={e => {
      setData1(++data1)
    }}>set data1</button>
    <div onClick={e => {
      console.log('------', e, ref)
      ref.current.refInit = ref.current.refInit + 1
    }}>ref:{ref.current.refInit} -- {data1}</div>
  </ContextApp>
}

export default App