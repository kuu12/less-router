import React from 'react';
import { render } from 'react-dom';
import App from './app';

history.pushState({}, null, '/cinima');

const root = document.createElement('div');
root.id = root;
document.body.appendChild(root);

render(
  <App basename="/cinima" />,
  root
);

const style = document.createElement('style');
style.innerHTML = `



`;
document.head.appendChild(style);