//external imports
import React from 'react';
import $ from 'jquery';
import Remarkable from 'remarkable';
//local imports
import Person from './person';

module.exports = React.createClass({
  render: function() {
    var people = this.props.data.map(function(person) {
      return (
        <Person id={person.id} first_name={person.first_name} last_name={person.last_name}>
	     start_date={person.start_date}      
	</Person>
      );
    });
    return (
      <div className="personList">
        {personNodes}
      </div>
    );
  }
});