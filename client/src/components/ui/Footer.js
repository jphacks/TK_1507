var React = require('react')

var Footer = React.createClass({
  render: function() {
    return (
      <footer className='container'>
        <hr />
        <p className='text-xs-center'>
          <span>&copy; Knowlect All Rights Reserved.</span>
        </p>
      </footer>
    )
  }
})

module.exports = Footer
