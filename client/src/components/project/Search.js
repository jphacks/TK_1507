var React = require('react')

// Component
var SearchForm = require('../ui/SearchForm.js')

var Search = React.createClass({
  render() {
    return (
      <div className='container'>
        <h1>Search</h1>

        <div className='row'>
          <div className='container'>
            <SearchForm />
          </div>
        </div>
      </div>
    )
  }
})

module.exports = Search
