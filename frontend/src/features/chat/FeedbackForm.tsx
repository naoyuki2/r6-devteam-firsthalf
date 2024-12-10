import { AppButton } from '@/component/AppButton'
import { AppTextArea } from '@/component/AppTextArea'
import { fetchWithToken } from '@/lib/axios'
import { useState, useEffect } from 'react'
import { HandThumbsDown, HandThumbsUp } from 'react-bootstrap-icons'

type FeedbackProps = {
  onFeedback: () => void
  status: string
  receiveUserId: number
  sendUserRole: 'requester' | 'carrier'
  isFeedback: boolean
}

export const FeedbackForm = ({
  onFeedback,
  receiveUserId,
  sendUserRole,
  isFeedback,
  status,
}: FeedbackProps) => {
  const [inputMessage, setInputMessage] = useState<string>('')
  const [isGood, setIsGood] = useState<boolean | null>(null)
  const [errorMessage, setErrorMessage] = useState<{
    type: string
    message: string
  } | null>(null)
  const [isDisabled, setIsDisabled] = useState<boolean>(true)

  useEffect(() => {
    if (!isFeedback && status === 'received') {
      setIsDisabled(false)
    } else {
      setIsDisabled(true)
    }
  }, [status, isFeedback])

  const handleSubmit = async () => {
    if (isGood === null) {
      setErrorMessage({ type: 'evaluation', message: '評価を選択してください' })
      return
    }
    if (!inputMessage.trim()) {
      setErrorMessage({
        type: 'message',
        message: 'メッセージを入力してください',
      })
      return
    }

    try {
      await fetchWithToken({
        method: 'POST',
        url: `review/${receiveUserId}`,
        args: JSON.stringify({
          body: inputMessage,
          sendUserRole,
          isGood,
        }),
      })

      setErrorMessage(null)
      alert('レビューが送信されました')
      onFeedback()
      setInputMessage('')
      setIsGood(null)
      setIsDisabled(true)
    } catch (error) {
      console.error('レビューの送信に失敗しました', error)
      setErrorMessage({
        type: 'submit',
        message: 'レビューの送信中にエラーが発生しました',
      })
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
      <div className="d-flex flex-column mb-3">
        <div className="d-flex justify-content-start">
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
        {errorMessage?.type === 'evaluation' && (
          <small style={{ color: 'red', marginTop: '5px' }}>
            {errorMessage.message}
          </small>
        )}
      </div>
      <div className="d-flex flex-column">
        <AppTextArea
          name="chatMessage"
          value={inputMessage}
          autoComplete="off"
          onChange={(e) => setInputMessage(e.target.value)}
          placeholder="メッセージを入力"
          rows={4}
          disabled={isDisabled}
        />
        {errorMessage?.type === 'message' && (
          <small style={{ color: 'red', marginTop: '5px' }}>
            {errorMessage.message}
          </small>
        )}
      </div>
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
