import { ThemeContext, ThemeContext2, UserContext } from './context';
import React, { Component, useContext } from 'react';

function ProfilePage(props) {
  console.log('ProfilePage render')
  const context = useContext(ThemeContext)
  return <div>
    <ProfilePageInner {...props}/>
    {props.user}--{props.theme} -- {context}</div> 
}

function ProfilePageInner(props){
  console.log('ProfilePageInner render')
  return <div>ProfilePageInner</div> 
}
// 第一种用法
// function MultiTest() {
//   return (<ThemeContext.Consumer>
//     {value1 => {
//       console.log('------------------', value1)
//       // return <div></div>
//       return <UserContext.Consumer>
//         {value2 => {
//           console.log('value2--------',value2)
//           return <ProfilePage user={value2} theme={value1} />
//         }}
//       </UserContext.Consumer>
//     }}
//   </ThemeContext.Consumer>)
// }


// 第二种用法
class MultiTest extends React.Component {

  render() {
    console.log('MultiTest render')
    return <div>
      {
        console.log('this1', this.context)
      }
      <UserContext.Consumer>
        {
          value2 => {
            // console.log('this2', this.context, value2)
            return <ProfilePage  theme={value2} />
          }
        }
      </UserContext.Consumer>
      <ThemeContext2.Consumer>
        {
          v => {
            console.log('ThemeContext2 render')
            return <div onClick={v.toggleTheme}>UFOUFO--{v.themes.background}</div>
          }
        }
      </ThemeContext2.Consumer>
    </div>
  }
}

// MultiTest.contextType = ThemeContext



export default MultiTest;