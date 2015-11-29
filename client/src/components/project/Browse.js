var React = require('react')
var whatwgFetch = require('whatwg-fetch')
var reactRouter = require('react-router')
var Link = reactRouter.Link

// Ui
var FavoriteButton = require('../ui/FavoriteButton.js')

var Browse = React.createClass({
  getInitialState: function() {
    return {
      result: []
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
          {
            this.state.result.map(function(item, index) {
              return (
                <div className="col-sm-4" key={index} >
                  <div className="card">
                    <div className="card-block">
                      <p>{item.id}</p>
                      <p>{item.created_at}</p>
                      <div className="clearfix">
                        <Link className="btn btn-primary-outline btn-sm pull-left" to={"/result/" + item.id}>Detail</Link>
                        <FavoriteButton classn="pull-right" id={item.id} />
                      </div>
                    </div>
                  </div>
                </div>
              )
            })
          }
        </div>
      </div>
    )
  }
})

module.exports = Browse
