export interface Course {
  _id: string; // auto gen by MongoDb
  name: string;
  price: number;
  beginDate: Date;
  beginTime: Date;
  createdDate: Date;
  isComplete: boolean;
}
