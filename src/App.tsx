import { getMockData } from "./data/mockData";
import { MockData } from "./types/mockTypes";
import { useState, useEffect, useRef } from "react";
import { Product } from "./components/Product";

function App() {
  const [mockData, setMockData] = useState<MockData[]>([]);
  const [pageNum, setPageNum] = useState<number>(0);
  const [isEnd, setIsEnd] = useState<boolean>(false);
  const observer = useRef<IntersectionObserver | null>(null);
  const targetRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const fetchNextPage = async () => {
      try {
        const response = await getMockData(pageNum);
        const { datas, isEnd } = response;
        setMockData((prev) => [...prev, ...datas]);
        if (isEnd) setIsEnd(isEnd);
      } catch (err) {
        console.error("Error occurred while fetching data:", err);
      } finally {
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
    <div className="flex flex-col gap-3 m-10 items-center">
      {mockData?.map((data: MockData) => (
        <Product key={data.productId} data={data} />
      ))}
      <div ref={targetRef}></div>
    </div>
  );
}

export default App;
