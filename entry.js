var ReactDOM = require('react-dom');
var React = require('react');

var App = require('./app.jsx');

ReactDOM.render(
  <App />,
  document.getElementById('app')
);

module.exports = App;