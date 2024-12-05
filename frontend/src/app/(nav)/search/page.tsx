import Image from 'next/image'
import japan_map_bg from '../../../../public/japan_map_bg.png'
import { SearchClient } from '@/features/search'
import TopNav from '@/component/TopNav'

export default function Search() {
  return (
    <>
      <TopNav text="検索" />
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <div
          style={{
            position: 'relative',
            maxWidth: '800px',
            width: '100%',
            overflow: 'hidden',
          }}
        >
          <Image
            src={japan_map_bg}
            alt="japan_map_bg"
            style={{
              width: '100%',
              height: 'auto',
            }}
            priority
          />
          <SearchClient />
        </div>
      </div>
    </>
  )
}
