var React = require('react');
var Navbar = require('./navbar.jsx');
var Modal = require('./modal.jsx');

var Notification = React.createClass({
  getInitialState: function() {
    return {
      visibility: ''
    };
  },

  fadeIn: function(){
    this.setState({
      visibility: 'show'
    })
  },

  componentDidMount: function(){
    setTimeout(this.fadeIn, 10); 
  },

  render: function(){ 
    return (
      <li className={this.state.visibility}>{this.props.content}</li>
    );
  }
})

var NotificationList = React.createClass({
  getInitialState: function() {
    return {
      notifications: [],
      sqsSession: undefined,
    };
  },

  getMessageFromSQS: function(){
    var params = {
      QueueUrl: 'https://sqs.us-east-1.amazonaws.com/766021230235/test-queue'
    }

    this.state.sqsSession.receiveMessage(params, function(err, data){
      if (err) console.log(err, err.stack);
      else if(data.Messages.length > 0){
        var message = data.Messages.pop();
        var date = new Date();
        var notifications = this.state.notifications;
        notifications.push({
          queueName: 'test-queue',
          timeStamp: date.toLocaleString(),
          message: message.Body,
        })

        this.setState({
          notifications: notifications
        })

        this.state.sqsSession.deleteMessage({
          QueueUrl: 'https://sqs.us-east-1.amazonaws.com/766021230235/test-queue',
          ReceiptHandle: message.ReceiptHandle,
        },function(err, data){
          if (err) console.log(err, err.stack);
          else console.log('Successfully Dequeued');
        })
      }
    }.bind(this))
  },

  componentDidMount: function() {
    this.setState({
      notifications: [],
      sqsSession: new AWS.SQS({
        region: 'us-east-1',
        accessKeyId: '-',
        secretAccessKey: '-',
      })
    })

    // setInterval(this.getMessageFromSQS, 3000);
  },

  handleClick: function() {
    var notifications = this.state.notifications;
    var date = new Date();

    notifications.push({
      queueName: 'button',
      timeStamp: date.toLocaleString(),
      message: 'lol',
    });

    this.setState({
      notifications: notifications
    })
  },

  render: function() {
    var filterText = this.props.filterText;
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-4 slide-fade">
            <button onClick={this.handleClick}>button!</button>
            <ul className="notification-list">
              {
                this.state.notifications.filter(function(listValue){
                  console.log(filterText+':'+listValue.queueName)
                  return listValue.queueName.indexOf(filterText)>-1;
                }).map(function(listValue){
                  return <Notification content={listValue.message} />;
                })
              }
            </ul>
          </div>
          <div className="col-md-8 slide-fade">
          </div>
        </div>
      </div>
    );
  }
})

var App = React.createClass({
  getInitialState: function(){
    return {
      filterText: '',
    };
  },

  handleUserInput: function(filterText){
    this.setState({
      filterText: filterText
    });
  },

  render: function(){
    return (
      <div className="app">
        <Navbar 
          filterText={this.state.filterText}
          onUserInput={this.handleUserInput}
        />
        <NotificationList 
          filterText={this.state.filterText}
        />
        <Modal />
      </div>
    );
  }
})

module.exports = App;
