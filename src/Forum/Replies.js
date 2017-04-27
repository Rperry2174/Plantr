import React, { Component }from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import ReplyPost from './ReplyPost';

class Replies extends Component{

  render() {
    let profilePic = {
      height: '30px',
      width: '30px',
      backgroundImage: 'url(' + this.props.reply.replyUser.picture + ')',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      backgroundPosition: 'center'
    }
    return(
      <div className="reply">
        <div className="row">
          <div className="col-md-1 offset-md-1 postPicture" style={profilePic}>
          </div>
          <div className="postUsername">
            { this.props.reply.replyUser.nickname }
          </div>
          <div className="col-md-10 offset-md-1">
            <div className="row">
              { this.props.reply.message + ' - ' + this.props.reply.time }
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Replies