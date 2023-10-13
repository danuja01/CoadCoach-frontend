import { useState } from "react";
import axios from "axios";
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

const QuestionCard = (question) => {
  const maxLength = 50;

  const questionId = question._id;

  const truncatedDescription = `Description : ${truncateText(question.description, maxLength)}`;

  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const openDeleteDialog = () => {
    setDeleteDialogOpen(true);
  };

  const closeDeleteDialog = () => {
    setDeleteDialogOpen(false);
  };

  const deleteQuestion = () => {
    try {
      axios.delete(`http://localhost:3000/api/challenges/${questionId}`).then(window.location.reload());
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box className="relative p-5 py-16 cursor-pointer rounded-lg" style={{ backgroundColor: "#EFEFEF" }}>
      <div className=" pb-4">
        <p className="hidden">{questionId}</p>
        <h3 className="text-[28px] font-semibold">Name : {question.name}</h3>
        <p
          className="text-primary"
          dangerouslySetInnerHTML={{
            __html: truncatedDescription
          }}
        />
      </div>
      <Stack direction="row" spacing={1} className="absolute mb-2 mr-1 bottom-0 right-0">
        <IconButton>
          <a href={"./updateQuestion/" + questionId}>
            <EditIcon />
          </a>
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
                  deleteQuestion();
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
