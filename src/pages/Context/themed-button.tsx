import {ThemeContext,UserContext} from './context';
import React, { Component } from 'react';

class ThemedButton extends React.Component {
  render() {
    console.log('render  themedButton')
    let props = this.props;
    let {themes} = this.context;
    console.log('ThemedButton', this.props,this.context)
    return (
      <button
        {...props}
        style={{backgroundColor: themes.background,width:'300px',height:'50px'}}
      />
    );
  }
}
ThemedButton.contextType = ThemeContext;


export default ThemedButton;