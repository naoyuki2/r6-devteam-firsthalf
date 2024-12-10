import React from 'react'
import { Container, Row, Col, Button } from 'react-bootstrap'
import Link from 'next/link'
import { ProfileClient } from '@/features/profile'

export default async function ProfilePage() {
  return (
    <>
      <Container className="mt-4">
        <ProfileClient />
      </Container>
    </>
  )
}
