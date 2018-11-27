import React from 'react';
import ReactDOM from 'react-dom';

import peopleBox from './peopleBox';

import '../css/base.css';
// JavaScript code

ReactDOM.render(
  <PersonBox url="/" pollInterval={2000} />,
  document.getElementById('content')
);

