export interface IPerson {
  name: string;
  location: string;
  category: string; // Which social category this person is a part of
  bio: string;
  dateLastTalk: number;
  dateLastHang: number;
  dateLastActivity: number;
  dateMet?: number;
}