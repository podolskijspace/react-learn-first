import React from 'react';
import PostListItem from '../post-list-item/'

import './post-list.css'

const PostList = ({posts, onDelete, onToggleImportant, onToggleLiked}) => {

  posts = posts.map(post => {

    return (
      <PostListItem 
      {...post} 
      onDelete={() => onDelete(post.id)}
      onToggleImportant={() => onToggleImportant(post.id)}
      onToggleLiked={() => onToggleLiked(post.id)}
      />
    )
  })

  return (
    <ul className="app-list list-group">
      {posts}
    </ul>
  )
}

export default PostList;