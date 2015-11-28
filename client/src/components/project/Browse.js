var React = require('react')
var whatwgFetch = require('whatwg-fetch')
var reactRouter = require('react-router')
var Link = reactRouter.Link

// Component

var Browse = React.createClass({
  getInitialState: function() {
    return {
      result: [1,2,3]
    };
  },
  componentWillMount: function() {
    var self = this;
    fetch('http://www.makky.io', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(function(response) {
      // return response.json();
    }).then(function(response) {
      // if (response !== null) {
      // }
    })
  },
  render() {
    return (
      <div className='container'>
        <h1>Browse</h1>
        <hr />
        <div className='row'>
          <div className='container'>
            {
              this.state.result.map(function(item, index) {
                return (
                  <div className="col-sm-12 card" key={index} >
                    <p className="card-block">hoge</p>
                  </div>
                )
              })
            }
          </div>
        </div>
      </div>
    )
  }
})

module.exports = Browse
