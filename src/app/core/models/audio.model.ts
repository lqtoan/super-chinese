export interface Audio {
  title: string;
  url: string;
  description: string[] | string;
}

export interface AudioConfiguration {
  list: Audio[];
  height: string;
  isLoading: boolean;
}
