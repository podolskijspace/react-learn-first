import React, { Component } from 'react'
import AppHeader from '../app-header/'
import SearchPanel from '../search-panel/'
import PostStatusFilter from '../post-status-filter/'
import PostList from '../post-list/'
import PostAddForm from '../post-add-form/'

import './app.css' //Подключаем стили

//Самый основной компонент, он вставляется на страницу
export default class App extends Component {

  constructor (props) {
    //Вытаскиваем свойства
    super(props);

    //Задаем стандартные состояния
    this.state = {
      data: [
        {label: 'Going to learn React', important: true, like: false, id: '0'},
        {label: 'Play', like: false, important: false, id: '1'},
        {label: 'Work', like: false, important: false, id: '2'},
      ],
      term: '', //переменная для поиска записей
      filter: 'all', //Фильтр (понравившиеся или все)
    };

    //Функция для удаления элемента
    this.deleteItem = (id) => {
      this.setState(({data}) => { 
        const i = data.findIndex(item => item.id === id),
        //state нельзя напрямую менять, только через создание нового массива
              newArr = [...data.splice(0, i), ...data.slice(i + 1)];

        return {
          data: newArr,
        }
      });
    }

    //Переключение кнопки звездочка
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

    //Переключение лайка по клику на текст в элементе
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

    //Задаем уникальные ключи для списка элементов (правильно делать через сервер либо библиотеку)
    this.maxId = 2;

    //Добавить новый элемент
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

    //Функция для поиска поста
    this.searchPost = (items, term) => {
      if (term.length === 0) {
        return items;
      }
      return items.filter(item => item.label.indexOf(term) > -1)
    }

    //Функция для изменения значения инпута при поиске поста
    this.onUpdateSearch = (term) => {
      this.setState({term})
    }

    //Фильтр постов по понравившмся или всем
    this.filterPost = (items, filter) => {
      if (filter === 'like') {
        return items.filter(item => item.like);
      } else {
        return items;
      }
    }

    //Функция для переключения фильтров
    this.onFilterSelect = (filter) => {
      this.setState({filter})
    }
  }

  //Главная функция, которая следит за изменением состояний и заново отрисовыывает элементы
  render() {
    const {data, term, filter} = this.state,
          liked       = data.filter(item => item.like).length,
          allPosts    = data.length,
          visiblePosts = this.filterPost(this.searchPost(data, term), filter); 


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
          <PostStatusFilter
            filter={filter}
            onFilterSelect={this.onFilterSelect}
          />
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