export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white">
      <div className="w-14 h-14 border-4 border-gray-200 border-t-black rounded-full animate-spin"></div>
      
      <p className="mt-4 text-gray-600 text-sm animate-pulse">
        Loading, please wait...
      </p>
    </div>
  );
}