'use client'

import React, { useState } from 'react'
import { Container, Form, Button, Image, InputGroup } from 'react-bootstrap'

// メッセージの型定義
interface Message {
  type: 'self' | 'other'
  content: string
  time: string
}

const Chat: React.FC = () => {
  // チャットのメッセージを管理
  const [messages, setMessages] = useState<Message[]>([
    {
      type: 'other',
      content:
        'この度は依頼を受けていただきありがとうございます。○月○日の○時に○○駅で受け取りします。期間中はよろしくお願いいたします。何かあればご連絡ください。',
      time: '12:30 PM',
    },
    {
      type: 'self',
      content: 'よろしくお願いいたします。受け取り場所把握しました。',
      time: '12:32 PM',
    },
    {
      type: 'other',
      content: 'これからのスケジュールを教えていただけますか？',
      time: '12:35 PM',
    },
  ])
  const [inputValue, setInputValue] = useState<string>('')

  // メッセージ送信時の処理
  const handleSend = () => {
    if (inputValue.trim() !== '') {
      const newMessage: Message = {
        type: 'self',
        content: inputValue,
        time: new Date().toLocaleTimeString(),
      }
      setMessages([...messages, newMessage])
      setInputValue('')
    }
  }

  // エンターキーで送信する処理
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault() // フォームの送信を防ぐ
      handleSend()
    }
  }

  return (
    <Container
      style={{
        maxWidth: '600px',
        margin: 'auto', // 中央揃え
        marginTop: '20px',
        backgroundColor: '#fff',
        borderRadius: '5px',
        border: '1px solid #ccc',
        padding: '20px',
        height: '95vh', // 縦幅をさらに長くする
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div
        className="chat-messages"
        style={{
          flex: 1,
          overflowY: 'auto',
          padding: '10px',
          marginBottom: '10px',
        }}
      >
        {messages.map((message, index) => (
          <div
            key={index}
            className={`message ${message.type === 'self' ? 'self' : 'other'}`}
            style={{
              display: 'flex',
              justifyContent:
                message.type === 'self' ? 'flex-end' : 'flex-start',
              marginBottom: '30px',
            }}
          >
            {message.type === 'other' && (
              <Image
                src="/path/to/other-icon.png" // 相手のアイコンのパスを指定
                roundedCircle
                width={40} // アイコンのサイズ
                height={40} // アイコンのサイズ
                style={{ marginRight: '10px', alignSelf: 'center' }} // アイコンの位置調整
              />
            )}
            <div
              className="message-content"
              style={{
                backgroundColor: message.type === 'self' ? '#4CAF50' : '#ddd',
                color: message.type === 'self' ? 'white' : 'black',
                padding: '8px 12px',
                borderRadius: '8px',
                maxWidth: '70%',
                wordWrap: 'break-word',
                position: 'relative',
              }}
            >
              {message.content}
              <div
                style={{
                  fontSize: '0.8em',
                  color: '#777',
                  position: 'absolute',
                  right: '10px',
                  bottom: '-25px',
                }}
              >
                {message.time}
              </div>
            </div>
          </div>
        ))}
      </div>
      <InputGroup>
        <Form.Control
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress} // エンターキーで送信
          placeholder="メッセージを入力"
          className="message-input"
        />
        <Button
          onClick={handleSend}
          style={{ backgroundColor: '#4CAF50', borderColor: '#4CAF50' }}
        >
          送信
        </Button>
      </InputGroup>
    </Container>
  )
}

export default Chat
