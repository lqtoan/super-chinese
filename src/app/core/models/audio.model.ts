export interface Audio {
  title: string;
  url: string;
  description: string;
}

export interface AudioConfiguration {
  list: Audio[];
  height: string;
}