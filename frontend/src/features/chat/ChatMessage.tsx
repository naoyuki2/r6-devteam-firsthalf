import { useState } from 'react'
import { Message } from '@/types'
import { AppTextArea } from '@/component/AppTextArea'
import { formatChatDate } from './utils'
import { AppButton } from '@/component/AppButton'
import { AppLabel } from '@/component/AppLabel'
import { PersonCircle } from 'react-bootstrap-icons'

type ChatMessageProps = {
  messages: Message[]
  currentUserId: number
  onSendMessage: (message: string) => void
}

export const ChatMessage = ({
  messages,
  currentUserId,
  onSendMessage,
}: ChatMessageProps) => {
  const [inputMessage, setInputMessage] = useState<string>('')

  return (
    <>
      <AppLabel text="チャット" />
      <div
        className="bg-light rounded d-flex flex-column"
        style={{ height: '300px' }}
      >
        <div className="p-2 overflow-scroll">
          {messages.map((msg) => {
            const isMine = msg.userId === currentUserId
            return (
              <div
                key={msg.id}
                className={`
                    d-flex flex-column mb-3
                    ${isMine ? 'justify-content-end' : 'justify-content-start'}
                  `}
              >
                <div
                  className={`d-flex ${
                    isMine ? 'flex-row-reverse' : 'flex-row'
                  }`}
                >
                  {!isMine && <PersonCircle size={40} className="me-2" />}
                  <div
                    className={`rounded px-2 py-2  ${
                      isMine ? 'bg-info text-white' : 'bg-white'
                    }`}
                    style={{
                      maxWidth: '100%',
                      display: 'inline-block',
                      whiteSpace: 'normal',
                      wordBreak: 'break-word',
                    }}
                  >
                    {msg.body}
                  </div>
                </div>
                <div
                  className={`mt-1 text-muted ${
                    isMine ? 'text-end' : 'text-start'
                  }`}
                  style={{
                    fontSize: '0.8em',
                  }}
                >
                  {formatChatDate(msg.created_at)}
                </div>
              </div>
            )
          })}
        </div>
      </div>
      <div className="d-flex flex-column mt-1">
        <AppTextArea
          value={inputMessage}
          name="chatMessage"
          autoComplete="off"
          onChange={(e) => setInputMessage(e.target.value)}
          placeholder="メッセージを入力"
          rows={4}
        />
        <AppButton
          text="メッセージを送信する"
          onClick={() => {
            onSendMessage(inputMessage)
            setInputMessage('')
          }}
          className="text-info bg-light border border-info mt-1"
        />
      </div>
    </>
  )
}
