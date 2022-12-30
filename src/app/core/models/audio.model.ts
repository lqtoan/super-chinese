import { Grade } from '@enums/grade.enum';
export interface Audio {
  title: string;
  url: string;
  type: string;
  grade: Grade;
}

export interface AudioConfiguration {
  list: Audio[];
  height: string;
  isLoading: boolean;
}
