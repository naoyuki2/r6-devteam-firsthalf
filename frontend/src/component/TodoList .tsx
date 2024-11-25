// components/TodoList.tsx
import { Span } from 'next/dist/trace'
import { useState } from 'react'
import { ListGroup, Button } from 'react-bootstrap'

interface TodoItem {
  id: string
  text: string
}

const TodoList = () => {
  const [todos, setTodos] = useState<TodoItem[]>([])
  const [inputValue, setInputValue] = useState<string>('')

  const handleAddTodo = () => {
    if (inputValue.trim()) {
      setTodos((prev) => [
        ...prev,
        { id: `${Date.now()}`, text: inputValue.trim() },
      ])
      setInputValue('')
    }
  }

  const handleDeleteTodo = (id: string) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id))
  }

  return (
    <div style={{ marginBottom: '20px', flex: 1, overflowY: 'auto' }}>
      <h5>やることリスト</h5>
      <p className="mb-4">
        ①右上のアイコンから依頼を確認して、不都合な点がないかチャットで
        やり取りしましょう。(依頼者は必要に応じて依頼を更新しましょう。)
      </p>
      <p className="mb-4">
        ②不都合な点が解消されたら、合意ボタンを押しましょう。※依頼者と運び手がともに合意ボタンを押すと依頼が締結されます。）
      </p>
      <p className="mb-4">
        ③依頼が締結されたら、受け渡し日時・場所などをチャットでやり取り
        しましょう。
      </p>
      <p className="mb-4">
        ④商品の受け渡しが終了したら、下から取引相手の評価をしましょう。
      </p>
      <ListGroup>
        {todos.map((todo) => (
          <ListGroup.Item
            key={todo.id}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <span>{todo.text}</span>
          </ListGroup.Item>
        ))}
      </ListGroup>
      <div
        style={{ marginTop: '10px', display: 'flex', flexDirection: 'row' }}
      ></div>
    </div>
  )
}

export default TodoList
