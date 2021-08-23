import React, { Component } from 'react';

import './post-status-filter.css'

export default class PostStatusFilter extends Component {
  constructor(props) {
    super(props);

    this.buttons = [
      {name: 'all', label: 'Все'},
      {name: 'like', label: 'Понравились'}
    ]
  }

  render () {
    const {filter, onFilterSelect} = this.props;

    const buttons   = this.buttons.map(({name, label}) => {
      const active      = filter === name,
            newClass    = active ? 'btn-info' : 'btn-outline-secondary';

      return (
        <button 
          type="button" 
          className={`btn ${newClass}`} 
          key={name} 
          onClick={() => onFilterSelect(name)}
        >
          {label}
        </button>
      )
    })

    return (
      <div className="brn-group d-flex">
        {buttons}
      </div>
    )
  }
}