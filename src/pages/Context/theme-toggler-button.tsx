import { ThemeContext } from './context';
import React, { Component } from 'react';

function ThemeTogglerButton() {
  // Theme Toggler 按钮不仅仅只获取 theme 值，
  // 它也从 context 中获取到一个 toggleTheme 函数
  return (
    <ThemeContext.Consumer>
      {({ themes, toggleTheme }) => (
        <button
          onClick={toggleTheme}
          style={{ backgroundColor: themes.background }}>
          Toggle Theme
        </button>
      )}
    </ThemeContext.Consumer>
  );
}

//   return 
//     (<ThemeContext.Consumer>
//         {theme => (
//             <UserContext.Consumer>
//             {user => (
//                 <ProfilePage user={user} theme={theme} />
//             )}
//             </UserContext.Consumer>
//         )}
//         </ThemeContext.Consumer>
//         })

export default ThemeTogglerButton;