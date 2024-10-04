import { MockData } from "../types/mockTypes";

export function Product({ data }: { data: MockData }) {
  const boughtDate = new Date(data.boughtDate);
  return (
    <div className="flex flex-col justify-center items-start border-2 border-purple-800 w-3/5 text-xl px-8 py-4 rounded-md bg-purple-200 min-h-36">
      <div>PRODUCT NAME: {data.productName}</div>
      <div>PRICE: {data.price}</div>
      <div>
        BOUGHT DATE: {boughtDate.toLocaleDateString()}
        {boughtDate.toLocaleTimeString()}
      </div>
    </div>
  );
}
