import { ThemeContext, UserContext } from './context';
import React, { Component } from 'react';

function ProfilePage(props) {
  return <div>{props.user}--{props.theme}</div>
}

function MultiTest() {
  return (<ThemeContext.Consumer>
    {value1 => {
      console.log('------------------', value1)
      // return <div></div>
      return <UserContext.Consumer>
        {value2 => {
          console.log('value2--------',value2)
          return <ProfilePage user={value2} theme={value1} />
        }}
      </UserContext.Consumer>
    }}
  </ThemeContext.Consumer>)
}



export default MultiTest;