import { Link } from "react-router-dom";

const SidePanel = () => {
  return (
    <div className="border-r w-12 mt-5 relative text-xl side-panel">
      <Link
        to="#"
        className="w-full h-[170px] border-b left-0 top-100 transform flex relative flex-col items-center justify-center bg-gray-300 hover:bg-gray-200"
      >
        <p className="text-center transform h-[50px] absolute  -left-2 -rotate-90">Question</p>
      </Link>
      <Link
        to="#"
        className="w-full h-[170px] border-b left-0 top-100 transform flex relative flex-col items-center justify-center hover:bg-gray-200"
      >
        <p className="text-center transform h-[50px] absolute  -left-0 -rotate-90">AI&nbsp;Chat</p>
      </Link>
      <Link
        to="#"
        className="w-full h-[170px] border-b left-0 top-100 transform flex relative flex-col items-center justify-center hover:bg-gray-200"
      >
        <p className="text-center transform h-[50px] absolute  -left-4 -rotate-90">Discussion</p>
      </Link>
    </div>
  );
};

export default SidePanel;
