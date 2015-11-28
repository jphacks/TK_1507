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
    fetch('http://jphacks.進捗.jp/api/v1/results/', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(function(response) {
      return response.json();
    }).then(function(response) {
      if (response !== null) {
        console.log(response)
        self.setState({result: response})
      }
    })
  },
  render: function() {
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
                    <div className="card-block">
                      <p>{item.id}</p>
                      <p>{item.created_at}</p>
                      <Link className="btn btn-primary-outline btn-sm" to={"/result/" + item.id}>Detail</Link>
                    </div>
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
