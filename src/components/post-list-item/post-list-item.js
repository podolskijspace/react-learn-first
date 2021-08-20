import React, {Component} from 'react';

import './post-list-item.css';

export default class PostListItem extends Component {
  constructor (props) {
    super(props);
    this.state = {
      important: props.important,
      like: props.like,
    };
    
    this.onImportant = () => {
      this.setState(({important}) => ({
        important: !important,
      }))
    }

    this.onLike = () => {
      this.setState(({like}) => ({
        like: !like,
      }))
    }
    
  }

  render () {
    const {label, id, onDelete} = this.props,
          {important, like} = this.state;


    let classNames = 'app-list-item d-flex justify-content-between';

    if (important) {
      classNames += ' important'
    }

    if (like) {
      classNames += ' like'
    }

    return (
      <li className={classNames} key={id}>
        <span className="app-list-item-label" onClick={this.onLike}>
          {label}
        </span>
        <div className="d-flex justify-content-center align-items-center">
          <button type="submit" className="btn-star btn-sm" onClick={this.onImportant}>
            <i className="fa fa-star"></i>
          </button>
          <button type="submit" className="btn-trash btn-sm" onClick={onDelete}>
            <i className="fa fa-trash-o"></i>
          </button>
          <i className="fa fa-heart"></i>
        </div>
      </li>
    )
  }
}