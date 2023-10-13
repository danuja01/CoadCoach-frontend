import { Box } from "@mui/material";
import { Button, Stack } from "@mui/material";

const StudentLabCard = ({ _id, moduleName, batchGroup }) => {
  return (
    <>
      <Box className="relative p-5 py-12 cursor-pointer" style={{ backgroundColor: "#EFEFEF" }}>
        <div className=" pb-4">
          <p className="hidden">{_id}</p>
          <h3 className="text-[28px] font-semibold">Module Name : {moduleName}</h3>
          <p className="text-primary">Batch Group : {batchGroup}</p>
          <br />
          <br />
          <Stack direction="row" spacing={5} className=" px-30">
            <a href={`/question/${_id}`}>
              <Button variant="contained" className=" bg-[#4C5871] rounded-lg">
                Select
              </Button>
            </a>
          </Stack>
        </div>
      </Box>
    </>
  );
};

export default StudentLabCard;
