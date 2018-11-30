import React from 'react';
import ReactDOM from 'react-dom';

import { Router, Route, browserHistory } from 'react-router';


import CommentBox from './commentBox';
import CommentEdit from './commentEdit';

import '../css/base.css';
// JavaScript code

ReactDOM.render((
  <Router history={browserHistory}>
    <Route path="/api/comments" component={Comment}/>
    <Route path="/:id" component={CommentEdit} />
  </Router>
), document.getElementById('content'))

