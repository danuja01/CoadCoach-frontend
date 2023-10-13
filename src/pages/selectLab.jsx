import { Header } from "@/components";
import { LabCard } from "@/components";

const labs = [
  {
    _id: "1",
    name: "OOP",
    batchGroup: "Lorem ipsum dolor sit amet"
  },
  {
    _id: "2",
    name: "ISDM",
    batchGroup: "Lorem ipsum dolor sit amet"
  },
  {
    _id: "3",
    name: "SE",
    batchGroup: "Lorem ipsum dolor sit amet"
  },
  {
    _id: "4",
    name: "CN",
    batchGroup: "Lorem ipsum dolor sit amet"
  }
];

const SelectLab = () => {
  return (
    <>
      <Header />
      <div className="mx-5 mt-5">
        <h2 className="font-inter text-[28px] mb-5 font-bold">Select Lab</h2>
        <div className="grid grid-cols-3 gap-5">
          {labs.map((lab) => (
            <LabCard key={lab._id} {...lab} />
          ))}
        </div>
      </div>
    </>
  );
};

export default SelectLab;
