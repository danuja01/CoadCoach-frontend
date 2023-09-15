export const challengeColor = (question) => {
  if (question?.difficulty === "HARD") {
    return "card-red";
  } else if (question?.difficulty === "MEDIUM") {
    return "card-blue";
  } else {
    return "card-green";
  }
};
