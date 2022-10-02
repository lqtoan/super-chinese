export interface Dictionary {
  _id: string; // Auto gen by MongoDB
  display: string;
  pinyin: string;
  define: string;
  createdDate: Date;
  updatedDate?: Date;
  createdBy: string;
}
