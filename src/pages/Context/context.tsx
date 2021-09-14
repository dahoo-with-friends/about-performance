import React, { Component } from 'react';
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