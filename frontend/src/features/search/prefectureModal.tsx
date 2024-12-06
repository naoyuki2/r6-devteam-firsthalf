import { AppButton } from '@/component/AppButton'
import { Col, Container, Modal, Row } from 'react-bootstrap'
import { Area } from '.'

export const PrefectureModal = ({
  setSelectedPrefecture,
  selectedArea,
  handleClose,
}: {
  setSelectedPrefecture: React.Dispatch<React.SetStateAction<string>>
  selectedArea?: Area
  handleClose: () => void
}) => {
  const handleSelectPrefecture = (prefecture: string) => {
    setSelectedPrefecture(prefecture)
    handleClose()
  }

  return (
    <Modal show={!!selectedArea} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{selectedArea?.area}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container>
          <Row>
            {selectedArea?.prefectures.map((prefecture, index) => (
              <Col
                key={index}
                xs={6}
                className="d-flex justify-content-center align-items-center my-2"
              >
                <AppButton
                  text={prefecture}
                  variant="outline-secondary"
                  onClick={() => handleSelectPrefecture(prefecture)}
                  className="w-100"
                />
              </Col>
            ))}
          </Row>
        </Container>
      </Modal.Body>
      <Modal.Footer>
        <AppButton text="閉じる" variant="secondary" onClick={handleClose} />
      </Modal.Footer>
    </Modal>
  )
}
