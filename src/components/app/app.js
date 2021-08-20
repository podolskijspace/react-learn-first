import React, { Component } from 'react'
import AppHeader from '../app-header/'
import SearchPanel from '../search-panel/'
import PostStatusFilter from '../post-status-filter/'
import PostList from '../post-list/'
import PostAddForm from '../post-add-form/'

import './app.css'


export default class App extends Component {

  constructor (props) {
    super(props);

    this.state = {
      data: [
        {label: 'Going to learn React', important: true, like: false, id: '0'},
        {label: 'Play', like: true, important: false, like: false, id: '1'},
        {label: 'Work', like: false, important: true, like: false, id: '2'},
      ]
    };

    this.deleteItem = (id) => {
      this.setState(({data}) => {
        const i = data.findIndex(item => item.id === id),
              newArr = [...data.splice(0, i), ...data.slice(i + 1)];

        return {
          data: newArr,
        }
      });
    }

    this.onToggleImportant = (id) => {
      this.setState(({data}) => {
        const i = data.findIndex(elem => elem.id === id),
              oldItem = data[i],
              newItem = {...oldItem, important: !oldItem.important},
              newArr = [...data.slice(0, i), newItem, ...data.slice(i + 1)];

        return {
          data: newArr
        }
      })
    }

    this.onToggleLiked = (id) => {
      this.setState(({data}) => {
        const i = data.findIndex(elem => elem.id === id),
              oldItem = data[i],
              newItem = {...oldItem, like: !oldItem.like},
              newArr = [...data.slice(0, i), newItem, ...data.slice(i + 1)];

        return {
          data: newArr
        }
      })
    }

    this.maxId = 2;

    this.addItem = (body) => {
      const newItem = {
        label: body,
        id: this.maxId++,
      }

      this.setState(({data}) => {
        const newArr = [...data, newItem];

        return {
          data: newArr,
        }
      })
    }

  }

  render() {
    const {data} = this.state,
          liked       = data.filter(item => item.like).length,
          allPosts    = data.length; 


    return (
      <div className="app">
        <AppHeader
          liked = {liked}
          allPosts = {allPosts}
        />
        <div className="search-panel d-flex">
          <SearchPanel/>  
          <PostStatusFilter/>
        </div>
        <PostList 
          posts={data} 
          onDelete={this.deleteItem}
          onToggleImportant={this.onToggleImportant}
          onToggleLiked={this.onToggleLiked}
        />
        <PostAddForm onAdd={this.addItem} />
      </div>
    )

  }
}