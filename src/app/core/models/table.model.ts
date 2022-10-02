export interface Table {
  header?: TableHeader;
}

export interface TableHeader {
  labels: string[];
  fields: string[];
}
