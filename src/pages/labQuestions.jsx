import { useEffect, useState } from "react";
import axios from "axios";
import { Header } from "@/components";
import { QuestionCard } from "@/components";

const LabQuestions = () => {
  const [Questions, setQuestions] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/challenges/")
      .then((res) => {
        const questionArray = res.data.data.docs;
        setQuestions(questionArray);
      })
      .catch((err) => {
        alert(err.message);
      });
  }, []);

  return (
    <>
      <Header />
      <div className="mx-5 mt-5">
        <h2 className="font-inter text-[28px] mb-5 font-bold">Questions</h2>
        <div className="grid grid-cols-3 gap-5">
          {Questions?.map((question) => (
            <QuestionCard key={question._id} {...question} />
          ))}
        </div>
      </div>
    </>
  );
};

export default LabQuestions;
