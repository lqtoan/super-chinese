export interface Dictionary {
  _id: string; // Auto gen by MongoDB
  display: string;
  pinyin: string;
  define: string;
  hsk: string;
  createdDate: string | null;
  updatedDate: string | null;
  createdBy: string;
}
