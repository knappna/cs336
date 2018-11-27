//external imports
import React from 'react';
import $ from 'jquery';
//local imports

module.exports = React.createClass({
  getInitialState: function() {
    return {id: '', first_name: '', last_name: '', start_date: ''};
  },
  handleIdChange: function(e) {
    this.setState({id: e.target.value});
  },
  handleFirstNameChange: function(e) {
    this.setState({first_name: e.target.value});
  },
  handleLastNameChange: function(e) {
    this.setState({last_name: e.target.value});
  },
  handleStartDateChange: function(e) {
    this.setState({start_date: e.target.value});
  },
  handleSubmit: function(e) {
    e.preventDefault();
    var id = this.state.id.trim();
    var first_name = this.state.first_name.trim();
    var last_name = this.state.last_name.trim();
    var start_date = this.state.start_date.trim();
    if (!id || !first_name || !last_name || !start_date) {
      return;
    }
    this.props.onPersonSubmit({id: id, first_name: first_name, last_name: last_name, start_date: start_date});
    this.setState({id: '', fist_name: '', last_name: '', start_date: ''});
  },
  render: function() {
    return (
      <form className="personForm" onSubmit={this.handleSubmit}>
        <input
          type="text"
          placeholder="id number"
          value={this.state.id}
          onChange={this.handleTextChange}
        />
        <input
          type="text"
          placeholder="First name"
          value={this.state.first_name}
          onChange={this.handleAuthorChange}
        />
        <input
          type="text"
          placeholder="Last name"
          value={this.state.last_name}
          onChange={this.handleTextChange}
        />
        <input
          type="text"
          placeholder="Start date"
          value={this.state.start_date}
          onChange={this.handleTextChange}
        />
        <input type="submit" value="Post" />
      </form>
    );
  }
});
