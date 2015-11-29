var React = require('react')

// Ui
var FavoriteButton = require('../ui/FavoriteButton.js')

var Result = React.createClass({
  getInitialState: function() {
    return {
      result: []
    };
  },
  componentWillMount: function() {
    var self = this;
    fetch('http://jphacks.進捗.jp/api/v1/results/' + this.props.params.resultId, {
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
        <h1>Result#{this.props.params.resultId}</h1>
        <hr />
        <div className='col-xs-12 clearfix'>
          <div className="row">
            <div className="pull-left">length: {this.state.result.length}</div>
            <FavoriteButton classn="pull-right" id={this.props.params.resultId} />
          </div>
        </div>

        <div className="row">
          <div className='col-xs-12'>
            {
              this.state.result.map(function(item, index) {
                return (

                  <div className='card' key={index+111}>
                    <div className='card-block clearfix' key={index}>
                      <div className='pull-left' key={index}>{item.node_id}</div>
                      <div className='pull-right' key={index+999}>{item.created_at}</div>
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

module.exports = Result
