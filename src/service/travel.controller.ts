export class TravelService {
    private travel = [
        {
            "id": 101,
            "title": "~にいきます",
            "fast": "福岡",
            "second": "東京",
            "third": "福岡",
            "purpose": "東京のライブを見に行きます！",
            "start_day": 2024/10/3,
            "end_day": 2024/10/6,
            "user_id": 100
        },
        {
            "id": 102,
            "title": "~にいきます",
            "fast": "福岡",
            "second": "東京",
            "third": "福岡",
            "purpose": "東京のライブを見に行きます！",
            "start_day": 2024/10/3,
            "end_day": 2024/10/6,
            "user_id": 100
        }
    ];
  
    async getAllOrders() {
      return this.travel;
    }

    async getOrderById(id: number) {
      const traveler = this.travel.find(travel => travel.id === id);
      if (!traveler) {
        throw new Error(`Order with id ${id} not found`);
      }
      return traveler;
    }
  }
  