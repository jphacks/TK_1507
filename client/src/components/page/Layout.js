var React = require('react')

// Component
var Navbar = require('../ui/Navbar.js')
var Footer = require('../ui/Footer.js')

var Layout = React.createClass({
  render() {
    return (
      <div>
        <Navbar />
        <div>
          { this.props.children }
        </div>
        <Footer />
      </div>
    )
  }
})

module.exports = Layout
