import React from 'react'
import ListItem from './ListItem'
import { List } from 'antd'

function TodoList({ todoListItems, setTodoListItems, loading, setLoading }) {
  return (
    <List
      size="large"
      loading={loading}
      bordered
      dataSource={todoListItems}
      renderItem={item =>
          <ListItem
            setTodoListItems={setTodoListItems}
            setLoading={setLoading}
            item={item} />}
    />
  )
}

export default TodoList