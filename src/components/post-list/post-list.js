import React from 'react';
import PostListItem from '../post-list-item/'

import './post-list.css'

const PostList = ({posts, onDelete}) => {

  posts = posts.map(post => {

    return (
      <PostListItem {...post} onDelete={() => onDelete(post.id)}/>
    )
  })

  return (
    <ul className="app-list list-group">
      {posts}
    </ul>
  )
}

export default PostList;