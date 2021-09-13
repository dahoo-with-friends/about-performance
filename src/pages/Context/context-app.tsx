import React, { Component } from 'react';
import { ThemeContext, themes, UserContext } from './context';
import ThemedButton from './themed-button';
import ThemeTogglerButton from './theme-toggler-button';
import MultiTest from './multi-test';

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

function Sidebar() {
  return (
    <div>
      Sidebar
    </div>
  );
}

function Layout() {
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
  return (
    <div>
      <MultiTest />
    </div>
  );
}

class ContextApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      themes: themes.light,
      toggleTheme: this.toggleTheme,
    };

    this.toggleTheme = () => {
      console.log('toggleTheme')
      this.setState(state => ({
        themes:
          state.themes === themes.dark
            ? themes.light
            : themes.dark,
      }));
    };
  }

  render() {
    // 在 ThemeProvider 内部的 ThemedButton 按钮组件使用 state 中的 theme 值，
    // 而外部的组件使用默认的 theme 值
    console.log('state', this.state)
    const value1 = 'value1--'
    const value2 = 'value2--'
    return (
      <div>
        <ThemeContext.Provider value={this.state}>
          <Toolbar changeTheme={this.toggleTheme} />
        </ThemeContext.Provider>
        <div style={{ height: '50px', width: "300px" }}>
          <ThemedButton onClick={this.toggleTheme} ufo="ufo">UFO</ThemedButton>
        </div>
        <ThemeContext.Provider value={this.state}>
          <Toolbar changeTheme={this.toggleTheme} />
        </ThemeContext.Provider>
        {/* <div style={{height:'50px',width:"300px"}}> */}
        <ThemedButton onClick={this.toggleTheme} ufo="ufo">UFO</ThemedButton>
        {/* </div> */}
        <ThemeContext.Provider value={this.state}>
          <Content />
        </ThemeContext.Provider>

        <ThemeContext.Provider value={value1}>
          <UserContext.Provider value={value2}>
            <Layout />
          </UserContext.Provider>
        </ThemeContext.Provider>
        <Other></Other>
      </div>
    );
  }
}

export default ContextApp