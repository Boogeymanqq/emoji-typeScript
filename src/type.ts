export interface Propsinator {
  page: number;
  totalPage: number;
  onPageChange: (num: number) => void;
}

export interface PropsEmoji {
  symbol: string;
  title: string;
  keywords: string;
}
