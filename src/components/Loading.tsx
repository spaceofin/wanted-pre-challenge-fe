import { PER_PAGE } from "../data/mockData";

export function Loading() {
  return (
    <>
      {Array.from({ length: PER_PAGE }, (_, index) => (
        <div
          key={index}
          className="flex flex-col justify-center items-start border-2 border-purple-800 w-3/5 text-xl px-8 py-4 rounded-md bg-purple-200 min-h-36 animate-pulse"
        />
      ))}
    </>
  );
}
