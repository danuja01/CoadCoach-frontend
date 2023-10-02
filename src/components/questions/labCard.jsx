import { Box } from "@mui/material";

const LabCard = ({ id, name, batch }) => {
  return (
    <>
      <Box className="relative p-5 py-16 cursor-pointer" style={{ backgroundColor: "#EFEFEF" }}>
        <div className=" pb-4">
          <p className="hidden">{id}</p>
          <h3 className="text-[28px] font-semibold">Name : {name}</h3>
          <p className="text-primary">Batch Group : {batch}</p>
        </div>
      </Box>
    </>
  );
};

export default LabCard;
