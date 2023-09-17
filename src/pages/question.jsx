import { Header, QuestionPane, SidePanel } from "@/components";
import Splitter from "@devbookhq/splitter";

const Question = () => {
  return (
    <div className="w-full">
      <Header />
      <div className="flex  h-[calc(100vh-117px)]">
        <SidePanel />

        <Splitter>
          <div className=" w-full h-full overflow-y-scroll">
            <QuestionPane />
          </div>
          <div className="mt-5 mx-2 h-screen">Tile 2</div>
        </Splitter>
      </div>
    </div>
  );
};

export default Question;
