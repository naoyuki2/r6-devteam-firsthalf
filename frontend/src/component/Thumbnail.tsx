type ThumbnailProps = {
  className?: string
  bg: string
  text?: string
  body: string
}

export const Thumbnail = ({ className, bg, text, body }: ThumbnailProps) => {
  return (
    <div
      className={`p-3 rounded ${className || ''}`}
      style={{
        backgroundColor: bg,
        borderRadius: '10px',
        display: 'flex',
        flexDirection: 'column',
        height: '170px',
        width: '100%',
      }}
    >
      {text && <div className="fw-bold">{text}</div>}

      <div
        className="d-flex align-items-center justify-content-center"
        style={{ flex: 1, fontWeight: 'bold', fontSize: '1.2rem' }}
      >
        {body}
      </div>
    </div>
  )
}
