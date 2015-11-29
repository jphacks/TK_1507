var React = require('react')

var Footer = React.createClass({
  render: function() {
    return (
      <footer className='container'>
        <hr />
        <p className='text-xs-center'>
          <span>&copy; TK_07-client All Rights Reserved.</span>
        </p>
      </footer>
    )
  }
})

module.exports = Footer
