import React from 'react'
import { Container, Row, Col, Button } from 'react-bootstrap'
import Link from 'next/link'
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
