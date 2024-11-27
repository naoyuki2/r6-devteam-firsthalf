'use client'

import { AppButton } from '@/component/AppButton'
import { useState } from 'react'
import { PrefectureModal } from './prefectureModal'
import { AREA_BUTTONS } from './constants'

export type Area = {
  area: string
  prefectures: string[]
  style: unknown
}

export function SearchClient() {
  const [selectedArea, setSelectedArea] = useState<Area | undefined>(undefined)

  const handleClose = () => setSelectedArea(undefined)
  return (
    <>
      <p>購入場所</p>
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
      <PrefectureModal selectedArea={selectedArea} handleClose={handleClose} />
    </>
  )
}
