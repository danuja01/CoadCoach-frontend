import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { CompilerAndChat, Header, SidePanel } from "@/components";
import { selectQuestionById, useGetQuestionByIdQuery } from "@/store/api/question";

const Question = () => {
  const { option } = useSelector((state) => state.sidePanel);

  const { id } = useParams();
  const questionFromStore = useSelector(selectQuestionById(id));

  const { data: { data: question = questionFromStore } = {} } = useGetQuestionByIdQuery(id);

  const showComponent = () => {
    switch (option) {
      case "question":
      case "ai-chat":
        return <CompilerAndChat question={question} id={id} />;
      case "discussion":
        return <div className="px-6 py-5">discussion</div>;
      default:
        return (
          <div className="flex flex-col w-full justify-center items-center">
            <p className="font-codeSans text-[150px]">404</p>
            <p className="font-codeSans text-[40px]">Page Not Found</p>
          </div>
        );
    }
  };

  return (
    <div className="w-full">
      <Header />
      <div className="flex  h-[calc(100vh-117px)]">
        <SidePanel />
        {showComponent()}
      </div>
    </div>
  );
};

export default Question;
