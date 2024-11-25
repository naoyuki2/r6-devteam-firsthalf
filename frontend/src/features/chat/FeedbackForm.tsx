import { AppButton } from '@/component/AppButton'
import { AppTextArea } from '@/component/AppTextArea'
import { useState } from 'react'
import { HandThumbsDown, HandThumbsUp } from 'react-bootstrap-icons'

export const FeedbackForm = () => {
  const [inputMessage, setInputMessage] = useState<string>('')

  return (
    <div
      style={{
        width: '100%',
        backgroundColor: 'white',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <p className="border-start border-info border-5 ps-2 fw-bold mt-4">
        取引相手の評価
      </p>
      <div className="d-flex justify-content-start mb-3">
        <label htmlFor="success" className="btn btn-outline-success">
          <HandThumbsUp className="me-2" />
          良かった
        </label>
        <input
          type="radio"
          name="evaluation"
          id="success"
          className="invisible"
        />
        <label htmlFor="danger" className="btn btn-outline-danger">
          <HandThumbsDown className="me-2" />
          悪かった
        </label>
        <input
          type="radio"
          name="evaluation"
          id="danger"
          className="invisible"
        />
      </div>
      <AppTextArea
        name="chatMessage"
        value={inputMessage}
        autoComplete="off"
        onChange={(e) => setInputMessage(e.target.value)}
        placeholder="メッセージを入力"
        rows={4}
      />
      <AppButton
        text="評価を送信する"
        onClick={() => setInputMessage('')}
        className="text-info bg-light border border-info mt-3"
        style={{ padding: '10px', width: '100%' }}
      />
    </div>
  )
}
