import { User } from '@/lib/jotai/userState'

export type Request = {
  id: number
  title: string
  location_prefecture: string
  location_details: string
  delivery_prefecture: string
  delivery_details: string
  description: string
  status: string
  completed_at: Date
  created_at: Date
  updated_at: Date
  user: {
    id: number
    name: string
    email: string
    icon_image_url: string
  }
  items: {
    id: number
    name: string
    quantity: number
    price: number
  }[]
}

export type LoginArgs = {
  email: string
  password: string
}

export type SignUpArgs = {
  name: string
  email: string
  password: string
}

export type CreateRequestArgs = {
  title: string
  location_prefecture: string
  location_details: string
  delivery_prefecture: string
  delivery_details: string
  description: string
  status: 'pending'
  items: Item[]
}

export type CreateRequestForm = {
  title: string
  location_prefecture: string
  location_details: string
  delivery_prefecture: string
  delivery_details: string
  description: string
  status: 'pending'
  items: { id: number; name: string; quantity: number; price: string }[]
}

export type Item = {
  name: string
  quantity: number
  price: string
}

export type CreateRoomArgs = {
  requestId: number
}

export type Room = {
  id: string
  created_at: string
  isClosed: boolean
  otherUser: roomUser
  currentUser: roomUser
}

export type roomUser = {
  user: User
  role: string
  isAgreed: boolean
}

export type MessageList = {
  id: number
  body: string
  isMine: boolean
  created_at: Date
}

export type Message = {
  id: number
  body: string
  created_at: Date
  userId: number
}

export type DraftRequest = {
  id: number
  title: string
  location_prefecture: string
  location_details: string
  delivery_prefecture: string
  delivery_details: string
  description: string
  status: string
  completed_at: Date
  created_at: Date
  updated_at: Date
  draft_item: {
    id: number
    name: string
    quantity: number
    price: number
  }[]
  action: boolean
  roomId: string
}
