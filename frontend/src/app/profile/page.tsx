import React from 'react'
import { Container } from 'react-bootstrap'
import { ProfileClient } from '@/features/profile'
import TopNav from '@/component/TopNav'

export default async function ProfilePage() {
  return (
    <>
      <TopNav isArrowShow={true} text="プロフィール" />
      <Container className="mt-4">
        <ProfileClient />
      </Container>
    </>
  )
}
