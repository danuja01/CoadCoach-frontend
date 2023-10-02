import { Header } from "@/components";
import { QuestionCard } from "@/components";

const questions = [
  {
    _id: "1",
    name: "Question 1",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis finibus eget urna ac facilisis. Aenean sit amet tempus mauris. Phasellus vel augue facilisis, posuere lacus eget, placerat velit. Vestibulum sapien lectus, pellentesque a sapien sed, efficitur vestibulum ex. Aenean suscipit lacus quam, quis molestie sapien porttitor nec. In pharetra, urna id cursus egestas, lorem nulla bibendum nulla, ac porta arcu metus et tortor. Nam at metus eget ex imperdiet feugiat in eu lorem"
  },
  {
    _id: "2",
    name: "Question 2",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis finibus eget urna ac facilisis. Aenean sit amet tempus mauris. Phasellus vel augue facilisis, posuere lacus eget, placerat velit. Vestibulum sapien lectus, pellentesque a sapien sed, efficitur vestibulum ex. Aenean suscipit lacus quam, quis molestie sapien porttitor nec. In pharetra, urna id cursus egestas, lorem nulla bibendum nulla, ac porta arcu metus et tortor. Nam at metus eget ex imperdiet feugiat in eu lorem"
  },
  {
    _id: "3",
    name: "Question 3",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis finibus eget urna ac facilisis. Aenean sit amet tempus mauris. Phasellus vel augue facilisis, posuere lacus eget, placerat velit. Vestibulum sapien lectus, pellentesque a sapien sed, efficitur vestibulum ex. Aenean suscipit lacus quam, quis molestie sapien porttitor nec. In pharetra, urna id cursus egestas, lorem nulla bibendum nulla, ac porta arcu metus et tortor. Nam at metus eget ex imperdiet feugiat in eu lorem"
  },
  {
    _id: "4",
    name: "Question 4",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis finibus eget urna ac facilisis. Aenean sit amet tempus mauris. Phasellus vel augue facilisis, posuere lacus eget, placerat velit. Vestibulum sapien lectus, pellentesque a sapien sed, efficitur vestibulum ex. Aenean suscipit lacus quam, quis molestie sapien porttitor nec. In pharetra, urna id cursus egestas, lorem nulla bibendum nulla, ac porta arcu metus et tortor. Nam at metus eget ex imperdiet feugiat in eu lorem"
  }
];

const LabQuestions = () => {
  return (
    <>
      <Header />
      <div className="mx-5 mt-5">
        <h2 className="font-inter text-[28px] mb-5 font-bold">Questions</h2>
        <div className="grid grid-cols-3 gap-5">
          {questions.map((question) => (
            <QuestionCard key={question._id} {...question} />
          ))}
        </div>
      </div>
    </>
  );
};

export default LabQuestions;
