import { AppButton } from '@/component/AppButton'
import { AppLabel } from '@/component/AppLabel'
import { RoomUser } from '@/types'
import { PersonCircle } from 'react-bootstrap-icons'

type UserStatusProps = {
  currentUser: RoomUser
  otherUser: RoomUser
  status: string
  onAgree: () => void
  onReceive: () => void
  onSendMessage: (message: string) => void
}

export const UserStatus = ({
  currentUser,
  otherUser,
  status,
  onAgree,
  onReceive,
  onSendMessage,
}: UserStatusProps) => {
  return (
    <>
      <AppLabel text="ユーザーのステータス" />
      <div className="d-flex flex-column">
        <CurrentUserStatus
          user={currentUser}
          status={status}
          onAgree={onAgree}
          onReceive={onReceive}
          onSendMessage={onSendMessage}
        />
        <OtherUserStatus user={otherUser} status={status} />
      </div>
    </>
  )
}

const CurrentUserStatus = ({
  user,
  status,
  onAgree,
  onReceive,
  onSendMessage,
}: {
  user: RoomUser
  status: string
  onAgree: () => void
  onReceive: () => void
  onSendMessage: (message: string) => void
}) => {
  const role = user.role === 'requester' ? '依頼者' : '運び手'
  const agree = user.isAgreed ? '合意しました' : '合意していません'
  const receive = user.isReceived ? '受け取りました' : '受け取っていません'
  const feedback = user.isFeedback ? '評価しました' : '評価していません'
  const completed = '工程が完了しました'

  const getButtonConfig = () => {
    if (status === 'pending' && !user.isAgreed) {
      return {
        text: '合意',
        onClick: () => {
          onAgree()
          onSendMessage(
            `依頼の内容に同意しました。
          ※このメッセージは自動で送信されています`
          )
        },
        disabled: false,
      }
    } else if (status === 'agreed' && !user.isReceived) {
      return {
        text: '完了',
        onClick: () => {
          onReceive()
          onSendMessage(
            `依頼の品を受け取りました。
          ※このメッセージは自動で送信されています`
          )
        },
        disabled: false,
      }
    }
    return { text: '', onClick: () => {}, disabled: true }
  }

  const buttonConfig = getButtonConfig()

  return (
    <div className="mb-1 border border-secondary rounded p-2 d-flex align-items-center justify-content-between">
      <div className="d-flex align-items-center">
        <PersonCircle size={36} className="me-2" />
        <div className="d-flex flex-column">
          <span className="fw-bold">{user.user.name}</span>
          <span className="text-muted">{role}</span>
        </div>
      </div>
      <div>
        <span>
          {status === 'pending' && agree}
          {status === 'agreed' && receive}
          {status === 'received' && feedback}
          {status === 'completed' && completed}
        </span>
      </div>
      {buttonConfig.text ? (
        <AppButton
          variant="outline-success"
          text={buttonConfig.text}
          onClick={buttonConfig.onClick}
          disabled={buttonConfig.disabled}
        />
      ) : (
        <AppButton
          className="invisible"
          variant="outline-success"
          text="合意"
          onClick={() => {}}
        />
      )}
    </div>
  )
}

const OtherUserStatus = ({
  user,
  status,
}: {
  user: RoomUser
  status: string
}) => {
  const role = user.role === 'requester' ? '依頼者' : '運び手'
  const agree = user.isAgreed ? '合意しました' : '合意していません'
  const receive = user.isReceived ? '受け取りました' : '受け取っていません'
  const feedback = user.isFeedback ? '評価しました' : '評価していません'
  const completed = '工程が完了しました'

  return (
    <div className="border border-secondary rounded p-2 d-flex align-items-center justify-content-between">
      <div className="d-flex align-items-center">
        <PersonCircle size={36} className="me-2" />
        <div className="d-flex flex-column">
          <span className="fw-bold">{user.user.name}</span>
          <span className="text-muted">{role}</span>
        </div>
      </div>
      <div>
        <span>
          {status === 'pending' && agree}
          {status === 'agreed' && receive}
          {status === 'received' && feedback}
          {status === 'completed' && completed}
        </span>
      </div>
      <AppButton
        className="invisible"
        variant="outline-success"
        text="合意"
        onClick={() => {}}
      />
    </div>
  )
}
