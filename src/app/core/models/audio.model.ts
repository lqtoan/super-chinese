import { AudioType } from '@enums/audio-type.enum';
import { Grade } from '@enums/grade.enum';
export interface Audio {
  title: string;
  url: string;
  type: AudioType;
  grade: Grade | string;
  size: number;
}
