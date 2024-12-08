import { AppButton } from '@/component/AppButton'
import { AppTextArea } from '@/component/AppTextArea'
import { fetchWithToken } from '@/lib/axios'
import { useState } from 'react'
import { HandThumbsDown, HandThumbsUp } from 'react-bootstrap-icons'

type FeedbackProps = {
  onFeedback: () => void
  status: string
  receiveUserId: number
  sendUserRole: 'requester' | 'carrier'
}

export const FeedbackForm = ({
  onFeedback,
  status,
  receiveUserId,
  sendUserRole,
}: FeedbackProps) => {
  const [inputMessage, setInputMessage] = useState<string>('')
  const [isGood, setIsGood] = useState<boolean | null>(null)

  const isDisabled = status !== 'received'

  const handleSubmit = async () => {
    if (isGood === null) {
      alert('評価（良い・悪い）を選択してください')
      return
    }
    if (!inputMessage.trim()) {
      alert('レビューのメッセージを入力してください')
      return
    }

    try {
      await fetchWithToken({
        method: 'POST',
        url: `http://localhost:3030/review/${receiveUserId}`,
        args: JSON.stringify({
          body: inputMessage,
          sendUserRole,
          isGood,
        }),
      })

      alert('レビューが送信されました')
      onFeedback()
      setInputMessage('')
      setIsGood(null)
    } catch (error) {
      console.error('レビューの送信に失敗しました', error)
      alert('レビューの送信中にエラーが発生しました')
    }
  }

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
            isDisabled
              ? 'btn-secondary'
              : isGood === true
              ? 'btn-success'
              : 'btn-outline-success'
          }`}
          onClick={() => setIsGood(true)}
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
            isDisabled
              ? 'btn-secondary'
              : isGood === false
              ? 'btn-danger'
              : 'btn-outline-danger'
          }`}
          onClick={() => setIsGood(false)}
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
        onClick={handleSubmit}
        className="text-info bg-light border border-info mt-3"
        style={{ padding: '10px', width: '100%' }}
        disabled={isDisabled}
      />
    </div>
  )
}
