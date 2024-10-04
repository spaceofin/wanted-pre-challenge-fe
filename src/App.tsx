import { getMockData, PER_PAGE } from "./data/mockData";
import { MockData, GetMockDataResult } from "./types/mockTypes";
import { useState, useEffect, useRef } from "react";
import { Product } from "./components/Product";
import { Loading } from "./components/Loading";

function App() {
  const [mockData, setMockData] = useState<MockData[]>([]);
  const [pageNum, setPageNum] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isEnd, setIsEnd] = useState<boolean>(false);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const observer = useRef<IntersectionObserver | null>(null);
  const targetRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setIsLoading(true);
    const fetchNextPage = async () => {
      try {
        const response = await getMockData(pageNum);
        const { datas, isEnd } = response;
        setMockData((prev) => [...prev, ...datas]);
        setTotalPrice(
          (prev) => prev + datas.reduce((acc, item) => acc + item.price, 0)
        );
        if (isEnd) setIsEnd(isEnd);
      } catch (err) {
        console.error("Error occurred while fetching data:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchNextPage();
  }, [pageNum]);

  useEffect(() => {
    observer.current = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !isEnd) {
        setPageNum((prev) => prev + 1);
      }
    });

    if (targetRef.current) {
      observer.current.observe(targetRef.current);
    }

    return () => {
      if (observer.current && targetRef.current) {
        observer.current.unobserve(targetRef.current);
      }
    };
  }, [isEnd]);

  return (
    <div className="flex flex-col gap-3 m-10 items-center mb-48">
      {mockData?.map((data: MockData) => (
        <Product key={data.productId} data={data} />
      ))}
      {isLoading && <Loading />}
      <div className="fixed bottom-0 w-full flex justify-center items-center bg-purple-700 text-white h-48 text-5xl font-mono">
        TOTAL PRICE: {totalPrice}
      </div>
      <div ref={targetRef}></div>
    </div>
  );
}

export default App;
