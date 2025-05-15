export interface RoomInterface {
  room_number: number;
  room_type: string;
  description: string;
  photos: string | null;
  offer: boolean;
  price: number;
  discount: number;
  cancellation_policy: string;
  amenities: string;
}
