//external imports
import React from 'react';
import $ from 'jquery';
import Remarkable from 'remarkable';
//local imports
import Comment from './comment';

module.exports = React.createClass({
  render: function() {
    var commentNodes = this.props.data.map(function(comment) {
      return (
        <Comment author={comment.author} key={comment.id}>
          {comment.text}
        </Comment>
	<Comment id={comment.id} author={comment.author} key={comment.id}>
      );
    });
    return (
      <div className="commentList">
        {commentNodes}
      </div>
    );
  }
});