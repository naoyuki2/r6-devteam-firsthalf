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

export type Item = {
  name: string
  quantity: number
  price: string
}

export type CreateRoomArgs = {
  requestId: number
  requestUserId: number
}
