import React, { Component, DispatchWithoutAction, useReducer } from 'react';
export const themes = {
    light: {
        foreground: '#000000',
        background: '#eeeeee',
    },
    dark: {
        foreground: '#ffffff',
        background: '#222222',
    },
};

export const ThemeContext = React.createContext({
    themes: themes.dark, // 默认值
    toggleTheme: () => { }
});

export const ThemeContext2 = React.createContext({
    themes: themes.dark, // 默认值
    toggleTheme: () => { }
});

export const UserContext = React.createContext({
    name: 'Guest',
});



export const reducerData1 = (state, action) => {
    console.log(state,action)
    switch (action.type) {
        case 'setname':
            let sex = state.sex + 1
            return {
                ...state,
                name: action.name,
                sex
            }
        case 'setage':
            return {
                ...state,
                age: action.age
            }

        default:
            return state
    }
}

export const reducerData2 = (state, action) => {
    console.log(state,action)
    switch (action.type) {
        case 'setIndexPrice':
            // let sex = state.indexPrice + 1
            return {
                ...state,
                indexPrice: action.indexPrice,
                // sex
            }
        case 'setMarkPrice':
            return {
                ...state,
                markPrice: action.markPrice
            }
        case 'setSymbolName':
            return {
                ...state,
                symbolName: action.symbolName
            }

        default:
            return state
    }
}

interface MyContext {
    dispatch: DispatchWithoutAction;
    state:any;
}

export const data1 = {
    name: 'ufo',
    age: 99,
    sex:'male',
}

export const data2 = {
    indexPrice: 100,
    markPrice: 99,
    symbolName:'2019-C',
}
// const [state, dispatch] = useReducer(reducer, data)
// export let contextData = {state,dispatch}

export const MainContext = React.createContext();

