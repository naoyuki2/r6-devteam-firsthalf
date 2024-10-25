import { PersonCircle } from 'react-bootstrap-icons'

export default function Room() {
  return (
    <>
      <div className="d-flex justify-content-between align-items-center">
        <div className="d-flex">
          <PersonCircle size={48} className="mb-4" />
          <div>
            <p className="mb-0">AAA</p>
            <p className="mb-2 text-truncate">
              ありがとうございます。ありがとうございます
            </p>
          </div>
        </div>
        <div>
          <p>14:25</p>
        </div>
      </div>
      <div className="d-flex justify-content-between align-items-center">
        <div className="d-flex">
          <PersonCircle size={48} className="mb-4" />
          <div>
            <p className="mb-0">BBB</p>
            <p className="mb-2">ありがとうございます。</p>
          </div>
        </div>
        <div>
          <p>14:25</p>
        </div>
      </div>
      <div className="d-flex justify-content-between align-items-center">
        <div className="d-flex">
          <PersonCircle size={48} className="mb-4" />
          <div>
            <p className="mb-0">CCC</p>
            <p className="mb-2">ありがとうございます。</p>
          </div>
        </div>
        <div>
          <p>14:25</p>
        </div>
      </div>
    </>
  )
}
