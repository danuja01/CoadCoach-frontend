import { isEmpty } from "lodash";
import { Skeleton } from "@mui/material";

const QuestionPane = ({ question }) => {
  return (
    <div id="question-pane" className="px-6 py-5 w-full">
      {!isEmpty(question) ? (
        <div dangerouslySetInnerHTML={{ __html: question.description }} />
      ) : (
        <div className="flex flex-col gap-2">
          <Skeleton variant="rectangular" height={90} />
          <Skeleton variant="rectangular" height={70} />
          <Skeleton variant="rectangular" width={200} height={30} />
          <Skeleton variant="rectangular" height={30} />
          <Skeleton variant="rectangular" height={50} />
          <Skeleton variant="rectangular" height={200} />
          <Skeleton variant="rectangular" width={300} height={30} />
          <Skeleton variant="rectangular" height={40} />
          <Skeleton variant="rectangular" height={3} />
        </div>
      )}
    </div>
  );
};

export default QuestionPane;
