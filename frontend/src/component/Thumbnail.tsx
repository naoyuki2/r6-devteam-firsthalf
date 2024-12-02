type ThumbnailProps = {
  backgroundColor: string
  title: string
}

export const Thumbnail = ({ backgroundColor, title }: ThumbnailProps) => {
  return (
    <div
      className="p-3 rounded shadow-sm d-flex flex-column"
      style={{
        backgroundColor,
        height: '170px',
      }}
    >
      <div className="fw-bold">Hakobun</div>
      <div
        className="d-flex align-items-center justify-content-center fw-bold"
        style={{ flex: 1, fontSize: '1.2rem' }}
      >
        {title}
      </div>
    </div>
  )
}
