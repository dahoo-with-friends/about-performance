import React, { useContext, useReducer } from "react"
import { ThemeContext, ThemeContext2, themes, UserContext, MainContext, data1,data2, reducerData1,reducerData2 } from './context';


function Text1() {
    console.log('text1')
    return (
      <div>
        <Text11/>
      </div>
    )
  }
  function Text11(props) {
    console.log('text11')
    const { state1, dispatch1 } = useContext(MainContext)
    return (
      <div>
        <button onClick={() => {
          dispatch1({
            type: 'setname',
            name: 'qhm'
          })
        }}>类似 redux 去修改另外组件的数据 setname</button>
        <div>{JSON.stringify(state1.name)}</div>
      </div>
    )
  }
  
  
  function Text2() {
    console.log('text2')
    return (
      <div>
        <Text22 />
      </div>
    )
  }
  function Text22() {
    console.log('text22')
    return (
      <div>
        <Text222 />
      </div>
    )
  }
  function Text222() {
    console.log('text222')
    return (
      <div>
        <Text2222 />
      </div>
    )
  }
  function Text2222() {
    console.log('text2222')
    const { state1, dispatch1 } = useContext(MainContext)
    return (
      <div>
        <button onClick={() => {
          dispatch1({
            type: 'setage',
            age: 9999
          })
        }}>类似 redux 去修改另外组件的数据 setage</button>
        <div>{JSON.stringify(state1.age)}</div>
      </div>
    )
  }
  
  function Text3() {
    console.log('text3')
    
    // const [state, setstate] = useState(1)
    const { state1 } = useContext(MainContext)
  
    // useEffect(() => {
    //   console.log('text3 useeffect')
    //   return () => {
    //     console.log('text3  useeffect return')
    //   }
    // },[sex])
  
    console.log('sex',state1.sex)
  
    return (
      <div>
        <h1>{state1.sex}</h1>
      </div>
    )
  }
  function Text4() {
    console.log('text4')
    
    // const [state, setstate] = useState(1)
    const { state2 } = useContext(MainContext)
  
    // useEffect(() => {
    //   console.log('text3 useeffect')
    //   return () => {
    //     console.log('text3  useeffect return')
    //   }
    // },[sex])
  
  
    return (
      <div>
        <h1>{state2.indexPrice}</h1>
      </div>
    )
  }
  function Text5(props) {
    console.log('text5')
    const { state2, dispatch2 } = useContext(MainContext)
    return (
      <div>
        <button onClick={() => {
          dispatch2({
            type: 'setIndexPrice',
            indexPrice: 'indexprice ---- '
          })
        }}>类似 redux 去修改另外组件的数据 indexPrice</button>
        <div>{JSON.stringify(state2.indexPrice)}</div>
      </div>
    )
  }
  
  
  
  
  function ReducerC(props) {
    const [state1, dispatch1] = useReducer(reducerData1, data1)
    const [state2, dispatch2] = useReducer(reducerData2, data2)
  
    return <MainContext.Provider value={{
     state1,
     state2,
      dispatch1,
      dispatch2,
    }}>
      {props.children}
    </MainContext.Provider>
  }
  
  
  export default  function ContextReducer(props){
      return <ReducerC>
      <Text1></Text1>
      <Text2></Text2>
      <Text3></Text3>
      <Text4></Text4>
      <Text5></Text5>
    </ReducerC>
  }