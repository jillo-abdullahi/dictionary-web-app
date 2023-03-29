import Image from "next/image";

export const EmptyState: React.FC<{ theme: string }> = ({ theme }) => {
  return (
    <div className="flex flex-col items-center justify-center w-full">
      <Image
        src="/assets/images/icon-empty.svg"
        alt="empty state"
        width={64}
        height={64}
      />
      <p
        className={` text-xl font-bold mt-11 ${
          theme === "light" ? "text-gray-500" : "text-white"
        }`}
      >
        No Definitions Found
      </p>
      <p className="mt-6 text-center text-gray-300">
        {
          "Sorry pal, we couldn't find definitions for the word you were looking for. You can try the search again at later time or head to the web instead."
        }
      </p>
    </div>
  );
};
