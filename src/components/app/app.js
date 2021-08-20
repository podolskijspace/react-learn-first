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
        {label: 'Play', like: false, important: false, id: '1'},
        {label: 'Work', like: false, important: false, id: '2'},
      ],
      term: '',
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

    this.searchPost = (items, term) => {
      if (term.length === 0) {
        return items;
      }
      console.log('sss');
      return items.filter(item => item.label.indexOf(term) > -1)
    }

    this.onUpdateSearch = (term) => {
      this.setState({term})
    }

  }

  render() {
    const {data, term} = this.state,
          liked       = data.filter(item => item.like).length,
          allPosts    = data.length,
          visiblePosts = this.searchPost(data, term); 


    return (
      <div className="app">
        <AppHeader
          liked = {liked}
          allPosts = {allPosts}
        />
        <div className="search-panel d-flex">
          <SearchPanel
            onUpdateSearch={this.onUpdateSearch}
          />  
          <PostStatusFilter/>
        </div>
        <PostList 
          posts={visiblePosts} 
          onDelete={this.deleteItem}
          onToggleImportant={this.onToggleImportant}
          onToggleLiked={this.onToggleLiked}
        />
        <PostAddForm onAdd={this.addItem} />
      </div>
    )

  }
}