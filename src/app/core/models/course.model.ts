export interface Course {
  _id: string; // auto gen by MongoDb
  name: string;
  price: number;
  begin: Date;
  createdDate: Date;
  isComplete: boolean;
}
