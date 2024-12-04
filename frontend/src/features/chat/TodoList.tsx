import { AppArrowRight } from '@/component/AppArrowRight'
import { AppCheck } from '@/component/AppCheck'
import { AppLabel } from '@/component/AppLabel'

type TodoListProps = {
  status: string
}

export const TodoList = ({ status }: TodoListProps) => {
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
          <span className="ms-2" style={{ fontSize: '12px' }}>
            右上のアイコンから依頼を確認して、不都合な点がないかチャットでやり取りしましょう。
            <br />
            （＊依頼者と運び手がともに合意ボタンを押すと依頼が締結されます）
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
          <span className="ms-2" style={{ fontSize: '12px' }}>
            依頼が締結されたら、受け渡し日時・場所などをチャットでやりとりしましょう。
          </span>
        </div>

        <div className="d-flex align-items-center">
          {isTaskCompleted('completed') ? (
            <AppCheck color="success" size={24} />
          ) : (
            <AppArrowRight color="gray" size={24} />
          )}
          <span className="ms-2" style={{ fontSize: '12px' }}>
            商品の受け渡しが完了したら、画面下から取引相手の評価をしましょう。
          </span>
        </div>
      </div>
    </>
  )
}
