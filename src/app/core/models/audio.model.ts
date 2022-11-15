export interface Audio {
  title: string;
  url: string;
  texts?: {
    text: string;
    character?: string;
  }[];
}

export interface AudioConfiguration {
  list: Audio[];
  height: string;
  isLoading: boolean;
}
