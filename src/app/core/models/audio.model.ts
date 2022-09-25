export interface Audio {
  title: string;
  url: string;
  text: string[] | string;
}

export interface AudioConfiguration {
  list: Audio[];
  height: string;
  isLoading: boolean;
}
