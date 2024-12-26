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
  color: string
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
  color: string
}

export type CreateRequestForm = {
  title: string
  location_prefecture: string
  location_details: string
  delivery_prefecture: string
  delivery_details: string
  description: string
  status: string
  items: { id: number; name: string; quantity: number; price: number }[]
  color: string
}

export type Item = {
  name: string
  quantity: number
  price: number
}

export type CreateRoomArgs = {
  requestId: number
}

export type Room = {
  id: string
  created_at: Date
  isClosed: boolean
  otherUser: RoomUser
  currentUser: RoomUser
  message: string | null
  request: Request
}

export type GetByRoomIdRes = {
  id: string
  request: Request
  draftRequest: DraftRequest
  otherUser: RoomUser
  currentUser: RoomUser
  messages: Message[]
}

export type RoomUser = {
  user: User
  role: 'requester' | 'carrier'
  isAgreed: boolean
  isReceived: boolean
  isFeedback: boolean
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
  draft_items: {
    id: number
    name: string
    quantity: number
    price: number
  }[]
  room: {
    id: string
    created_at: Date
    isClosed: boolean
  }
  action: boolean
}

export type ProposeDraftRequestArgs = {
  title: string
  location_prefecture: string
  location_details: string
  delivery_prefecture: string
  delivery_details: string
  description: string
  draft_items: Item[]
}

export type Notification = {
  id: number
  body: string
  type: 'room' | 'message'
  created_at: Date
  roomId: string
  isRead: boolean
  user: User
}

export type Reviews = {
  id: number
  sendUserRole: string
  body: string
  isGood: boolean
  created_at: Date
  sendUser: User
}
