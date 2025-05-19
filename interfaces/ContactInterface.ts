export interface ContactInterface {
  id?: number;
  booking_id: number;
  Date: string;
  first_name: string;
  last_name: string;
  email: string;
  phone?: string;
  Subject: string;
  Comment: string;
  ARCHIVE?: string;
}
