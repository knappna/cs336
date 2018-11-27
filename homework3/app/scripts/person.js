//external imports
import React from 'react';
import Remarkable from 'remarkable';
//local imports

module.exports = React.createClass({
  rawMarkup: function() {
    var md = new Remarkable();
    var rawMarkup = md.render(this.props.children.toString());
    return { __html: rawMarkup };
  },

  render: function() {
    var md = new Remarkable();
    return (
      <div className="person">
	<h2 className="id">
	  {this.props.id}
	</h2>        
	<h2 className="first_name">
          {this.props.first_name}
        </h2>
	<h2 className="last_name">
	  {this.props.last_name}
	</h2>
	<h2 className="start_date">
	  {this.props.start_date}
	</h2>
        <span dangerouslySetInnerHTML={this.rawMarkup()} />
      </div>
    );
  }
});