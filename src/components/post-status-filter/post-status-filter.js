import React from 'react';

import './post-status-filter.css'

const PostStatusFilter = () => {
  return (
    <div className="brn-group d-flex">
      <button type="button" className="btn btn-info">
        Все
      </button>
      <button type="button" className="btn btn-outline-secondary">
        Понравились
      </button>
    </div>
  )
}

export default PostStatusFilter;