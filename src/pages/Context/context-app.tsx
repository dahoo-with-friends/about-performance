import React, { Children, Component, forwardRef, useCallback, useContext, useEffect, useImperativeHandle, useLayoutEffect, useMemo, useReducer, useRef, useState } from 'react';
import { ThemeContext, ThemeContext2, themes, UserContext, MainContext, data1,data2, reducerData1,reducerData2 } from './context';
import ThemedButton from './themed-button';
import ThemeTogglerButton from './theme-toggler-button';
import MultiTest from './multi-test';
import ColumnGroup from 'rc-table/lib/sugar/ColumnGroup';
import { Button } from 'antd';
import { context } from 'rc-image/lib/PreviewGroup';
import ContextReducer from './context-reducer';
import Demo1 from './context-reducer2'

// 一个使用 ThemedButton 的中间组件
function Toolbar(props) {
  console.log('render toolbar')
  return (
    <ThemedButton onClick={props.changeTheme}>
      Change Theme
    </ThemedButton>
  );
}



function Other(props) {
  console.log('render Other')

  let rtn = useMemo((e) => {
    console.log('other useMemo', e)
    return null
    // return props.other
  }, [])

  console.log('render other ---')
  return (
    <div>other{rtn}</div>
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

const Layout = forwardRef((props, ref) => {
  console.log('layout render', props, ref)
  return (
    <div>
      <div ref={ref}>ref 123</div>
      <div ref={ref}>ref 456</div>
      <Sidebar />
      <ContentMulti />
    </div>
  );
})


const Imperative = forwardRef((props, ref) => {
  console.log('Imperative render', props, ref)
  const [state1, setstate1] = useState(0)
  const [state2, setstate2] = useState(0)
  const inputRef = useRef()
  useImperativeHandle(
    ref,
    () => {
      return {
        name: 'ufo',
        state1,
        state2,
        focus: () => {
          console.log(inputRef.current)
          inputRef.current.innerText = 9
        }
      }
    },
    [state1]
  )
  return (
    <div>
      <div ref={inputRef}>Imperative 123</div>
      <button onClick={() => {
        setstate1(state1 + 1)
      }}>setstate1{state1}</button>
      <button onClick={() => {
        setstate2(state2 + 1)
      }}>setstate2{state2}</button>
    </div>
  );
})


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
      other: 1,
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

        <div onClick={e => {
          this.setState({
            other: ++this.state.other
          })
        }}>change other</div>
        <Other other={this.state.other}></Other>
        <Other2></Other2>
        <ThemeContext.Provider value={this.state.value1}>
          <UserContext.Provider value={value2}>
            <ThemeContext2.Provider value={this.state}>
              {this.props.children}
            </ThemeContext2.Provider>
          </UserContext.Provider>
        </ThemeContext.Provider>


        <button onClick={() => {
          this.setValue1()
        }}>setValue1</button>
      </div>
    );
  }
}



const useMyHook = (val1, val2) => {
  const [myval1, setmyval1] = useState(val1)
  const add = () => {
    setmyval1(myval1 + val2)
  }
  return { myval1, add }

}


function App() {
  const ref = useRef({ refInit: 999 })
  const imperativeRef = useRef()
  const [data1, setData1] = useState(8)
  const [data2, setData2] = useState(0)
  const cb = useCallback(
    (e) => {
      console.log(e, 'callback')
      return data1 + data2 + e
    },
    [],
  )
  const childEl = useRef(null)

  useEffect(() => {
    console.log('use effect')
    return () => {
      console.log('use effect return ')
    }
  })

  useLayoutEffect(() => {
    console.log('use layout effect')
    return () => {
      console.log('use layout effect return ')
    }
  })

  const { myval1, add } = useMyHook(2, 3)

  const [stateUFO, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case 'setname':
        return { ...state, name: action.name }
      case 'setage':
        return { ...state, age: action.age }
      default:
        return state;
    }

  }, { name: 'ufo', age: 199 })


  return <>

    <ContextApp>
      <div>
        callback:{cb(9)}
      </div>
      <div>
        datas:{data1 + '--' + data2}
      </div>

      <button onClick={e => {
        setData1(data1 + 1)
      }}>set data1</button>
      <button onClick={e => {
        setData2(data2 + 1)
      }}>set data2</button>
      <button onClick={e => {
        console.log(childEl.current)
      }}>获取子组件 DOM</button>
      <div onClick={e => {
        console.log('------', e, ref)
        ref.current.refInit = ref.current.refInit + 1
      }}>ref:{ref.current.refInit} -- {data1}</div>


      <Layout ref={childEl} />
      <Imperative ref={imperativeRef} />
      <button onClick={() => {
        console.log('imperative', imperativeRef)
        imperativeRef.current.focus()
      }}>fetch impoerative data</button>

      <button onClick={() => {
        add()
      }}>自定义hook {myval1}</button>

      <button onClick={() => {
        dispatch({
          type: 'setname',
          name: 'qhm'
        })
      }}>reducer setname {JSON.stringify(stateUFO)}</button>
      <button onClick={() => {
        dispatch({
          type: 'setage',
          age: 299
        })
      }}>reducer setage {JSON.stringify(stateUFO)}</button>

    </ContextApp>

    <ContextReducer></ContextReducer>
    <Demo1></Demo1>
  </>


}

export default App