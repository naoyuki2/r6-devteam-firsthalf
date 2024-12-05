import { AppArrowRight } from '@/component/AppArrowRight'
import { AppCheck } from '@/component/AppCheck'
import { AppLabel } from '@/component/AppLabel'

type TodoListProps = {
  status: string
  role: 'requester' | 'carrier'
}

type TaskStatus = 'pending' | 'agreed' | 'received' | 'completed'
type Role = 'requester' | 'carrier'

export const TodoList = ({ status, role }: TodoListProps) => {
  const taskOrder = ['agreed', 'received', 'completed']

  const isTaskCompleted = (taskStatus: string) => {
    return taskOrder.indexOf(status) >= taskOrder.indexOf(taskStatus)
  }

  const getTaskStyle = (currentStatus: string) => {
    if (status === currentStatus) {
      return {
        backgroundColor: 'rgba(0, 255, 0, 0.1)',
        borderRadius: '4px',
        textDecoration: 'line-through',
        color: 'green',
      }
    }
    return {}
  }

  const isAllTasksCompleted = status === 'completed'

  const getMessage = (taskStatus: TaskStatus, role: Role) => {
    const messages = {
      pending: {
        requester:
          '右上のアイコンから依頼を確認し、不都合があれば修正を依頼しましょう。',
        carrier:
          '運び手からの修正依頼に応じて、右上のアイコンから依頼を修正しましょう。',
      },
      agreed: {
        requester: '依頼内容に問題がなければ合意しましょう。',
        carrier: '依頼内容に問題がなければ合意しましょう。',
      },
      received: {
        requester: '商品を購入し、依頼者に受け渡しましょう。',
        carrier: '運び手から商品を受け取りましょう。',
      },
      completed: {
        requester: '画面下から取引相手の評価を行いましょう。',
        carrier: '画面下から取引相手の評価を行いましょう。',
      },
    }

    return messages[taskStatus][role]
  }

  return (
    <>
      <AppLabel text="やること" />
      <div
        className="d-flex flex-column gap-2 position-relative"
        style={
          isAllTasksCompleted
            ? {
                backgroundColor: 'rgba(0, 255, 0, 0.1)',
                borderRadius: '8px',
                padding: '16px',
                textDecoration: 'line-through',
                color: 'green',
              }
            : {}
        }
      >
        {isAllTasksCompleted && (
          <div
            className="position-absolute top-50 start-50 translate-middle"
            style={{ fontSize: '48px', color: 'green' }}
          >
            <AppCheck color="success" size={75} bg="white" />
          </div>
        )}
        <div
          className="d-flex align-items-center"
          style={getTaskStyle('agreed')}
        >
          {isTaskCompleted('agreed') ? (
            <AppCheck color="success" size={24} />
          ) : (
            <AppArrowRight color="gray" size={24} />
          )}
          <span className="ms-2" style={{ fontSize: '0.75rem' }}>
            {getMessage('pending', role)}
          </span>
        </div>

        <div
          className="d-flex align-items-center"
          style={getTaskStyle('agreed')}
        >
          {isTaskCompleted('agreed') ? (
            <AppCheck color="success" size={24} />
          ) : (
            <AppArrowRight color="gray" size={24} />
          )}
          <span className="ms-2" style={{ fontSize: '0.75rem' }}>
            {getMessage('agreed', role)}
          </span>
        </div>

        <div
          className="d-flex align-items-center"
          style={getTaskStyle('received')}
        >
          {isTaskCompleted('received') ? (
            <AppCheck color="success" size={24} />
          ) : (
            <AppArrowRight color="gray" size={24} />
          )}
          <span className="ms-2" style={{ fontSize: '0.75rem' }}>
            {getMessage('received', role)}
          </span>
        </div>

        <div className="d-flex align-items-center">
          {isTaskCompleted('completed') ? (
            <AppCheck color="success" size={24} />
          ) : (
            <AppArrowRight color="gray" size={24} />
          )}
          <span className="ms-2" style={{ fontSize: '0.75rem' }}>
            {getMessage('completed', role)}
          </span>
        </div>
      </div>
    </>
  )
}
