import DeleteIcon from "@mui/icons-material/Delete";
import UpdateIcon from "@mui/icons-material/Update";
import { Box } from "@mui/material";
import { Button, Stack } from "@mui/material";

const LabCard = ({ _id, moduleName, batchGroup, onDelete }) => {
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
            <a href={`/updateLab/${_id}`}>
              <Button variant="contained" className=" bg-[#4C5871] rounded-lg" startIcon={<UpdateIcon />}>
                Edit
              </Button>
            </a>
            <Button
              onClick={() => onDelete(_id)}
              variant="contained"
              className=" bg-[#4C5871] rounded-lg"
              startIcon={<DeleteIcon />}
            >
              Delete
            </Button>
          </Stack>
        </div>
      </Box>
    </>
  );
};

export default LabCard;
