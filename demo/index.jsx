import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';

/*
 * Mocking. This is not production code.
 * Suppose your app has been deployed to www.domain.com/cinima
 * And the entry html file is my-index.html
 */
history.pushState({}, null, '/cinima/my-index.html');
/** 
 * Mocking.
*/

const root = document.createElement('div');
root.id = 'root';
document.body.appendChild(root);

ReactDOM.render(
  <App
    basename="/cinima"
    htmlFile="my-index.html"
  />,
  root
);

const style = document.createElement('style');
style.innerHTML = `

#app {
  display: flex;
}

#sidebar {
  flex: 0 0 20%;
}

#main {
  flex 1 1 100%;
}

.hidden-log {
  display: none;
}

`;
document.head.appendChild(style);