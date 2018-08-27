import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';
import Routing from '../src';
import One from './one';
import Two from './two';
import Three from './three';

const root = document.createElement('div');
root.id = 'root';
document.body.appendChild(root);

ReactDOM.render(
  // <App basename="" />,
  <Routing>
    <One path="/exclusive/one" title="Exclusive Route 1" />
    <Two path="/exclusive/two" title="Exclusive Route 2" autoCache />
    <Three path="/exclusive/:any" title="Exclusive Route 3" />
  </Routing>,
  root,
);
