import { AppButton } from '@/component/AppButton'
import { AppTextArea } from '@/component/AppTextArea'
import { useState } from 'react'
import { HandThumbsDown, HandThumbsUp } from 'react-bootstrap-icons'

type FeedbackProps = {
  onFeedback: () => void
  status: string
}

export const FeedbackForm = ({ onFeedback, status }: FeedbackProps) => {
  const [inputMessage, setInputMessage] = useState<string>('')

  const isDisabled = status !== 'received'

  return (
    <div
      style={{
        width: '100%',
        backgroundColor: isDisabled ? '#e9ecef' : 'white',
        display: 'flex',
        flexDirection: 'column',
        pointerEvents: isDisabled ? 'none' : 'auto',
        opacity: isDisabled ? 0.6 : 1,
      }}
    >
      <p className="border-start border-info border-5 ps-2 fw-bold mt-4">
        取引相手の評価
      </p>
      <div className="d-flex justify-content-start mb-3">
        <label
          htmlFor="success"
          className={`btn ${
            isDisabled ? 'btn-secondary' : 'btn-outline-success'
          }`}
        >
          <HandThumbsUp className="me-2" />
          良かった
        </label>
        <input
          type="radio"
          name="evaluation"
          id="success"
          className="invisible"
          disabled={isDisabled}
        />
        <label
          htmlFor="danger"
          className={`btn ${
            isDisabled ? 'btn-secondary' : 'btn-outline-danger'
          }`}
        >
          <HandThumbsDown className="me-2" />
          悪かった
        </label>
        <input
          type="radio"
          name="evaluation"
          id="danger"
          className="invisible"
          disabled={isDisabled}
        />
      </div>
      <AppTextArea
        name="chatMessage"
        value={inputMessage}
        autoComplete="off"
        onChange={(e) => setInputMessage(e.target.value)}
        placeholder="メッセージを入力"
        rows={4}
        disabled={isDisabled}
      />
      <AppButton
        text="評価を送信する"
        onClick={() => {
          onFeedback()
          setInputMessage('')
        }}
        className="text-info bg-light border border-info mt-3"
        style={{ padding: '10px', width: '100%' }}
        disabled={isDisabled}
      />
    </div>
  )
}
