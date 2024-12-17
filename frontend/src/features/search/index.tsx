'use client'

import { AppTextInput } from '@/component/AppTextInput'
import { useState } from 'react'
import { SearchAccordion } from '@/component/SearchAccordion'
import { Search as SearchIcon } from 'react-bootstrap-icons'
import { useRouter } from 'next/navigation'

export type Area = {
  area: string
  prefectures: string[]
  style: unknown
}

export function SearchClient() {
  const [inputKeyword, setInputKeyword] = useState('')
  const [selectedLocation, setSelectedLocation] = useState<string>('')
  const [selectedDelivery, setSelectedDelivery] = useState<string>('')
  const router = useRouter()

  const handleSearch = () => {
    let url = '/home?filter[status]=pending'
    if (inputKeyword != '') url += `&filter[keyword]=${inputKeyword}`
    if (selectedLocation != '')
      url += `&filter[location_prefecture]=${selectedLocation}`
    if (selectedDelivery != '')
      url += `&filter[delivery_prefecture]=${selectedDelivery}`
    router.push(url)
  }

  return (
    <>
      <AppTextInput
        label="キーワードで絞り込み"
        type="text"
        name="searchKeyword"
        placeholder="例）＊＊＊フェス"
        autoComplete="off"
        onChange={(e) => setInputKeyword(e.target.value)}
        labelClassName="my-2"
      />
      <p className="border-start border-info border-5 ps-2 fw-bold my-2">
        商品の入手場所（都道府県）
      </p>
      <SearchAccordion
        selectedPrefecture={selectedLocation}
        setSelectedPrefecture={setSelectedLocation}
      />
      <p className="border-start border-info border-5 ps-2 fw-bold my-2">
        商品の受け渡し場所（都道府県）
      </p>
      <SearchAccordion
        selectedPrefecture={selectedDelivery}
        setSelectedPrefecture={setSelectedDelivery}
      />
      <button
        className="btn btn-info text-light position-fixed"
        style={{ bottom: 68, right: 16, zIndex: 2 }}
        onClick={handleSearch}
      >
        検索する
        <SearchIcon className="ms-2" />
      </button>
    </>
  )
}
