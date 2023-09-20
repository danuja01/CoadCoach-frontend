import { useDispatch, useSelector } from "react-redux";
import { setOption } from "@/store/sidePanel";

const SidePanel = () => {
  const dispatch = useDispatch();
  const { option } = useSelector((state) => state.sidePanel);

  return (
    <div className="border-r w-12 mt-5 relative text-xl side-panel">
      <button
        className={`w-full h-[170px] border-b left-0 top-100 transform flex relative flex-col items-center justify-center  hover:bg-gray-200 ${
          option === "question" && "bg-gray-200"
        }`}
        onClick={() => dispatch(setOption("question"))}
      >
        <p className="text-center transform h-[50px] absolute  -left-2 -rotate-90">Question</p>
      </button>
      <button
        className={`w-full h-[170px] border-b left-0 top-100 transform flex relative flex-col items-center justify-center hover:bg-gray-200 ${
          option === "ai-chat" && "bg-gray-200"
        }`}
        onClick={() => dispatch(setOption("ai-chat"))}
      >
        <p className="text-center transform h-[50px] absolute  -left-0 -rotate-90">AI&nbsp;Chat</p>
      </button>
      <button
        className={`w-full h-[170px] border-b left-0 top-100 transform flex relative flex-col items-center justify-center hover:bg-gray-200 ${
          option === "discussion" && "bg-gray-200"
        }`}
        onClick={() => dispatch(setOption("discussion"))}
      >
        <p className={`text-center transform h-[50px] absolute  -left-4 -rotate-90`}>Discussion</p>
      </button>
    </div>
  );
};

export default SidePanel;
