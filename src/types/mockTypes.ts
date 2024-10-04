export interface MockData {
  productId: string;
  productName: string;
  price: number;
  boughtDate: string;
}

export interface GetMockDataResult {
  datas: MockData[];
  isEnd: boolean;
}
