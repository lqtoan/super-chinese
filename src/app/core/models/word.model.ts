export interface Word {
  _id: string; // Auto gen by MongoDB
  display: string;
  pinyin: string;
  chinaVietnamWord: string;
  define: string;
  hsk: string;
  createdDate: Date;
  updatedDate: Date;
  createdBy: string;
}
