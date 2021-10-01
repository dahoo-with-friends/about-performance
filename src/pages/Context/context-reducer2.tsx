import React, {
    useState,
    useEffect,
    useReducer,
    createContext,
    useContext,
  } from "react";
  
  export const reducer = (state: any, action: any) => {
    const ss = state.formData.a + state.selectImSymbol.b + state.iInstrument.c;
    switch (action.type) {
      case "refresh":
        return { ...state, formData: { a: action.payload }, ss };
      case "refreshIm":
        return {
          ...state,
          selectImSymbol: action.singleAreaData.selectImSymbol ?? {},
          totalRequireMargin: action.singleAreaData.totalRequireMargin ?? "0.00",
          ss,
        };
      case "refreshIndexPrice":
        return {
          ...state,
          indexPrice: action.singleAreaData.indexPrice ?? "",
          ss,
        };
      case "refreshInstrument":
        return {
          ...state,
          iInstrument: action.singleAreaData.iInstrument ?? {},
          ss,
        };
      case "refreshOutBook":
        return {
          ...state,
          orderBookData: action.singleAreaData.orderBookData ?? {},
          ss,
        };
      default:
        return state;
    }
  };
  export const OrderContext = createContext<{
    singleAreaData: any;
    dispatch?: React.Dispatch<any>;
  }>({
    singleAreaData: {},
  });
  
  const Child21 = React.memo(() => {
    console.log("demo1-Child21");
    return <div>Child21</div>;
  });
  
  const Child1 = () => {
    console.log("demo1-Child1");
    const { dispatch, singleAreaData } = useContext(OrderContext);
    return <div>Child1 {JSON.stringify(singleAreaData.orderBookData)}</div>;
  };
  
  const Child2 = React.memo(() => {
    const { dispatch, singleAreaData } = useContext(OrderContext);
    const { indexPrice, ss } = singleAreaData;
    console.log("demo1-Child2");
    const onClick1 = () => {
      dispatch?.({
        type: "refresh",
        payload: ss + 1,
      });
    };
    const onClick2 = () => {
      dispatch?.({
        type: "refreshIndexPrice",
        singleAreaData: { indexPrice: indexPrice + 1 },
      });
    };
    const onClick3 = () => {
      dispatch?.({
        type: "refreshIndexPrice",
        singleAreaData: { indexPrice: indexPrice + 1 },
      });
    };
    console.log("demo1-store", singleAreaData);
    console.log("demo1-store.indexPrice", singleAreaData.indexPrice);
    return (
      <div>
        <button onClick={onClick1}>btn1</button>
        <button onClick={onClick2}>btn2</button>
        <button onClick={onClick3}>btn3</button>
        <Child21 />
      </div>
    );
  });
  const Child3 = () => {
    const { singleAreaData } = useContext(OrderContext);
    console.log("demo1-Child3");
    return <div>Child3={singleAreaData.ss}</div>;
  };
  
  function Demo1(props: any) {
    const [value] = useState({});
  
    const [singleAreaData, dispatch] = useReducer<any>(reducer, {
      formData: { a: 1 },
      selectImSymbol: { b: 2 },
      indexPrice: 0,
      iInstrument: { c: 3 },
      orderBookData: {},
      ss: 0, // a+b+c
    });
  
    return (
      <div className="App">
        <OrderContext.Provider value={{ singleAreaData, dispatch }}>
          {props.children}
        </OrderContext.Provider>
      </div>
    );
  }
  
  const App = () => {
    return (
      <Demo1>
        <Child1 />
        <Child2 />
        <Child3 />
      </Demo1>
    );
  };
  
  export default App;