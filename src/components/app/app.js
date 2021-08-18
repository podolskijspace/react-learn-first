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
        {label: 'Going to learn React', important: true, id: '0'},
        {label: 'Play', like: true, important: false, id: '1'},
        {label: 'Work', like: false, id: '2'},
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
    return (
      <div className="app">
        <AppHeader/>
        <div className="search-panel d-flex">
          <SearchPanel/>  
          <PostStatusFilter/>
        </div>
        <PostList posts={this.state.data} onDelete={this.deleteItem}/>
        <PostAddForm onAdd={this.addItem} />
      </div>
    )

  }
}