import { AppButton } from '@/component/AppButton'
import { AppLabel } from '@/component/AppLabel'
import { RoomUser } from '@/types'
import { PersonCircle } from 'react-bootstrap-icons'

type UserStatusProps = {
  currentUser: RoomUser
  otherUser: RoomUser
  status: string
  action: boolean
  onAgree: () => void
  onReceive: () => void
  onSendMessage: (message: string) => void
  onOpenModal: () => void
}

export const UserStatus = ({
  currentUser,
  otherUser,
  action,
  status,
  onAgree,
  onReceive,
  onSendMessage,
  onOpenModal,
}: UserStatusProps) => {
  return (
    <>
      <AppLabel text="ユーザーのステータス" />
      <div className="d-flex flex-column">
        <CurrentUserStatus
          user={currentUser}
          status={status}
          action={action}
          onAgree={onAgree}
          onReceive={onReceive}
          onSendMessage={onSendMessage}
          onOpenModal={onOpenModal}
        />
        <OtherUserStatus user={otherUser} status={status} action={action} />
      </div>
    </>
  )
}

const CurrentUserStatus = ({
  user,
  status,
  action,
  onAgree,
  onReceive,
  onOpenModal,
}: {
  user: RoomUser
  action: boolean
  status: string
  onAgree: () => void
  onReceive: () => void
  onSendMessage: (message: string) => void
  onOpenModal: () => void
}) => {
  const role = user.role === 'requester' ? '依頼者' : '運び手'
  const approval =
    role === '運び手' ? '依頼を確認してください' : '依頼を更新しました'
  const agree = user.isAgreed ? '合意しました' : '合意していません'
  const receive = user.isReceived ? '受け取りました' : '受け取っていません'
  const feedback = user.isFeedback ? '評価しました' : '評価していません'
  const completed = '工程が完了しました'

  const displayText =
    role === '依頼者'
      ? action === false
        ? approval
        : status === 'pending'
        ? agree
        : status === 'agreed'
        ? receive
        : status === 'received'
        ? feedback
        : status === 'completed'
        ? completed
        : ''
      : action === false
      ? approval
      : status === 'pending'
      ? agree
      : status === 'agreed'
      ? receive
      : status === 'received'
      ? feedback
      : status === 'completed'
      ? completed
      : ''

  const getButtonConfig = () => {
    if (action === false && role === '運び手') {
      return {
        text: '開く',
        onClick: onOpenModal,
        disabled: false,
      }
    } else if (action === false && role === '依頼者') {
      return {}
    }

    if (status === 'pending' && !user.isAgreed) {
      return {
        text: '合意',
        onClick: () => {
          onAgree()
        },
        disabled: false,
      }
    } else if (status === 'agreed' && !user.isReceived) {
      return {
        text: '完了',
        onClick: () => {
          onReceive()
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
          <span className="fw-bold" style={{ fontSize: '12px' }}>
            {user.user.name}
          </span>
          <span className="text-muted" style={{ fontSize: '12px' }}>
            {role}
          </span>
        </div>
      </div>
      <div>
        <span style={{ fontSize: '12px' }}>{displayText}</span>
      </div>
      {buttonConfig.text ? (
        <AppButton
          variant="outline-success"
          text={buttonConfig.text}
          onClick={buttonConfig.onClick}
          disabled={buttonConfig.disabled}
          style={{ fontSize: '14px' }}
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
  action,
}: {
  user: RoomUser
  status: string
  action: boolean
}) => {
  const role = user.role === 'requester' ? '依頼者' : '運び手'
  const approval =
    role === '運び手' ? '依頼を確認してください' : '依頼を更新しました'
  const agree = user.isAgreed ? '合意しました' : '合意していません'
  const receive = user.isReceived ? '受け取りました' : '受け取っていません'
  const feedback = user.isFeedback ? '評価しました' : '評価していません'
  const completed = '工程が完了しました'

  const displayText =
    role === '依頼者'
      ? action === false
        ? approval
        : status === 'pending'
        ? agree
        : status === 'agreed'
        ? receive
        : status === 'received'
        ? feedback
        : status === 'completed'
        ? completed
        : ''
      : action === false
      ? approval
      : status === 'pending'
      ? agree
      : status === 'agreed'
      ? receive
      : status === 'received'
      ? feedback
      : status === 'completed'
      ? completed
      : ''

  return (
    <div className="border border-secondary rounded p-2 d-flex align-items-center justify-content-between">
      <div className="d-flex align-items-center">
        <PersonCircle size={36} className="me-2" />
        <div className="d-flex flex-column">
          <span className="fw-bold" style={{ fontSize: '12px' }}>
            {user.user.name}
          </span>
          <span className="text-muted" style={{ fontSize: '12px' }}>
            {role}
          </span>
        </div>
      </div>
      <span style={{ fontSize: '12px' }}>{displayText}</span>
      {/* 隙間うめようのボタン、画面に表示はされません */}
      <AppButton
        className="invisible"
        variant="outline-success"
        text="合意"
        onClick={() => {}}
      />
    </div>
  )
}
