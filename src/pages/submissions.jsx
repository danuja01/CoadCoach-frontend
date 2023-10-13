import { Header } from "@/components";
import { useGetSubmissionsQuery } from "@/store/api/submission";
import { Box, LinearProgress, Typography } from "@mui/material";

const LinearProgressWithLabel = (props) => {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Box className="mr-[1.85rem]">
        <Typography variant="body2" color="text.secondary">
          <span className="text-[16px] text-black font-semibold mr-[1.9rem] font-inter">Score: </span>
        </Typography>
      </Box>
      <Box sx={{ width: "100%", mr: 1 }}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" color="text.secondary">{`${Math.round(props.value)}%`}</Typography>
      </Box>
    </Box>
  );
};

const Submissions = () => {
  const { data, isLoading } = useGetSubmissionsQuery({
    filters: "",
    sorts: "",
    page: 1
  });

  return (
    <>
      <Header />
      <div className="mx-5 py-4 h-[calc(100vh-157px)] overflow-y-auto">
        <h1 className="mb-5">Submissions</h1>
        <div className="grid grid-cols-3 gap-5">
          {isLoading ? (
            <div className="col-span-3">
              <LinearProgress />
            </div>
          ) : (
            data &&
            data?.data?.docs?.map((submission) => (
              <Box
                key={submission._id}
                className="p-5 py-4 hover:opacity-75 cursor-pointer rounded-md hover:shadow-md"
                style={{ backgroundColor: "#efefef" }}
              >
                <Typography variant="h5" component="div">
                  <span className="text-[16px] font-semibold mr-4 font-inter">User email : </span>
                  <span className="text-[16px]  font-inter">{submission.userId.email}</span>
                </Typography>
                <Typography variant="h5" component="div">
                  <span className="text-[16px] font-semibold mr-[2rem] font-inter">Question: </span>
                  <span className="text-[16px] font-inter">
                    {(submission.questionId.description.slice(0, 38) + "...").replace(/<[^>]*>?/gm, "")}
                  </span>
                </Typography>
                <Typography variant="h5" component="div">
                  <span className="text-[16px] font-semibold mr-[1.6rem] font-inter">Language: </span>
                  <span className="text-[16px] font-inter">{submission.language}</span>
                </Typography>
                <Typography variant="h5" component="div">
                  <span className="text-[16px] font-semibold mr-[1.9rem] font-inter">Attempts: </span>
                  <span className="text-[16px] font-inter">{submission.attempts + 1}</span>
                </Typography>
                <LinearProgressWithLabel
                  value={submission.score}
                  color={submission.score > 40 ? (submission.score > 70 ? "success" : "info") : "error"}
                />
              </Box>
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default Submissions;
