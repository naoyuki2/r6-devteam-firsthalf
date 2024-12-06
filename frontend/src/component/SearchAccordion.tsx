'use client'

import { AppButton } from '@/component/AppButton'
import { useState } from 'react'
import { PrefectureModal } from '../features/search/prefectureModal'
import { AREA_BUTTONS } from '../features/search/constants'
import Accordion from 'react-bootstrap/esm/Accordion'
import japan_map_bg from '../../public/japan_map_bg.png'
import Image from 'next/image'

type SearchAccordionProps = {
  selectedPrefecture: string
  setSelectedPrefecture: React.Dispatch<React.SetStateAction<string>>
}

export type Area = {
  area: string
  prefectures: string[]
  style: unknown
}

export const SearchAccordion = ({
  selectedPrefecture,
  setSelectedPrefecture,
}: SearchAccordionProps) => {
  const [selectedArea, setSelectedArea] = useState<Area | undefined>(undefined)
  const handleClose = () => setSelectedArea(undefined)
  return (
    <Accordion defaultActiveKey="1">
      <Accordion.Item eventKey="0" style={{ position: 'relative' }}>
        <Accordion.Header>
          {selectedPrefecture != '' ? selectedPrefecture : '未選択'}
        </Accordion.Header>
        <Accordion.Body>
          <Image
            src={japan_map_bg}
            alt="japan_map_bg"
            style={{
              width: '100%',
              height: 'auto',
            }}
            priority
          />
          {AREA_BUTTONS.map((button, index) => (
            <AppButton
              key={index}
              text={button.area}
              variant="secondary"
              onClick={() => setSelectedArea(button)}
              style={{
                position: 'absolute',
                ...button.style,
              }}
            />
          ))}
          <PrefectureModal
            setSelectedPrefecture={setSelectedPrefecture}
            selectedArea={selectedArea}
            handleClose={handleClose}
          />
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  )
}
