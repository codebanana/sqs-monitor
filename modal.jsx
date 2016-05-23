var React = require('react');

var Modal = React.createClass({
  render() {
    return (
      <div className="modal fade" id="myModal" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">

            <div className="modal-header">
              <button type="button" className="close" data-dismiss="modal">
                <span aria-hidden="true">&times;</span>
                <span className="sr-only">Close</span>
              </button>
              <h4 className="modal-title" id="myModalLabel">Subscribe to an SQS Queue</h4>
            </div>

            <div className="modal-body">
              <form className="form-horizontal" role="form">
                <div className="form-group">
                  <label  className="col-sm-4 control-label" htmlFor="queueName">Queue Name</label>
                  <div className="col-sm-8">
                    <input type="text" className="form-control" id="queueName" placeholder="Queue Name"></input>
                  </div>
                </div>
                <div className="form-group">
                  <label className="col-sm-4 control-label" htmlFor="accessKeyId">Access Key ID</label>
                  <div className="col-sm-8">
                    <input type="text" className="form-control" id="accessKeyId" placeholder="Access Key ID"></input>
                  </div>
                </div>
                <div className="form-group">
                  <label className="col-sm-4 control-label" htmlFor="secretAccessKey">Secret Access Key</label>
                  <div className="col-sm-8">
                    <input type="password" className="form-control" id="secretAccessKey" placeholder="Secret Access Key"></input>
                  </div>
                </div>
              </form>
            </div>

            <div className="modal-footer">
              <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary">Subscribe</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = Modal;

