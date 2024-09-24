export class OrderService {
  private orders = [
    {
      id: 101,
      title: '～に行ってきて',
      place: '東京',
      item: '～のライブの限定品',
      limit: '2024/10/10',
      description:
        '東京の10月5日に開かれるライブで販売される限定品を買ってきてください',
      createdAt: '2024/09/17',
      user_id: 0,
    },
    {
      id: 102,
      title: '～に行ってきて',
      place: '東京',
      item: '～のライブの限定品',
      limit: '2024/10/10',
      description:
        '東京の10月5日に開かれるライブで販売される限定品を買ってきてください',
      createdAt: '2024/09/17',
      user_id: 0,
    },
  ]

  async getAll() {
    return this.orders
  }

  async getOneById(id: number) {
    const order = this.orders.find((order) => order.id === id)
    if (!order) {
      throw new Error(`Order with id ${id} not found`)
    }
    return order
  }
}
