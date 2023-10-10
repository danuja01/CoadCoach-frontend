import { useState } from "react";
import EditIcon from "@mui/icons-material/BorderColorOutlined";
import DeleteIcon from "@mui/icons-material/Delete";
import CloseIcon from "@mui/icons-material/close";
import { Backdrop, Box, Button, Fade, IconButton, Modal, Stack } from "@mui/material";

const truncateText = (text, maxLength) => {
  if (text.length <= maxLength) {
    return text;
  } else {
    return text.slice(0, maxLength) + "...";
  }
};

const QuestionCard = ({ id, name, description }) => {
  const maxLength = 100;

  const truncatedDescription = truncateText(description, maxLength);

  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const openDeleteDialog = () => {
    setDeleteDialogOpen(true);
  };

  const closeDeleteDialog = () => {
    setDeleteDialogOpen(false);
  };

  return (
    <Box className="relative p-5 py-16 cursor-pointer rounded-lg" style={{ backgroundColor: "#EFEFEF" }}>
      <div className=" pb-4">
        <p className="hidden">{id}</p>
        <h3 className="text-[28px] font-semibold">Name : {name}</h3>
        <p className="text-primary">Description : {truncatedDescription}</p>
      </div>
      <Stack direction="row" spacing={1} className="absolute mb-2 mr-1 bottom-0 right-0">
        <IconButton>
          <EditIcon />
        </IconButton>
        <IconButton onClick={openDeleteDialog}>
          <DeleteIcon />
        </IconButton>
      </Stack>
      <Modal
        open={isDeleteDialogOpen}
        onClose={closeDeleteDialog}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500
        }}
      >
        <Fade in={isDeleteDialogOpen}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              bgcolor: "white",
              boxShadow: 24,
              p: 4
            }}
            className="rounded-lg"
          >
            <IconButton className="absolute top-0 right-0 mt-1" aria-label="remove" onClick={closeDeleteDialog}>
              <CloseIcon fontSize="small" />
            </IconButton>
            <h3 className="text-[20px] mb-3 font-semibold">Are you sure you want to delete this question?</h3>
            <Stack direction="row" spacing={2} className=" mt-3">
              <Button onClick={closeDeleteDialog}>Cancel</Button>
              <Button
                variant="contained"
                color="error"
                startIcon={<DeleteIcon />}
                onClick={() => {
                  // Add your delete logic here
                  // Then close the dialog
                  closeDeleteDialog();
                }}
              >
                Delete
              </Button>
            </Stack>
          </Box>
        </Fade>
      </Modal>
    </Box>
  );
};

export default QuestionCard;
