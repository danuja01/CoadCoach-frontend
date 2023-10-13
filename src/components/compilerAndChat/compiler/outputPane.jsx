import { useEffect, useState } from "react";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import { Skeleton } from "@mui/material";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";

const Accordion = styled((props) => <MuiAccordion disableGutters elevation={0} square {...props} />)(({ theme }) => ({
  "border": `1px solid ${theme.palette.divider}`,
  "&:not(:last-child)": {
    borderBottom: 0
  },
  "&:before": {
    display: "none"
  }
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />} {...props} />
))(({ theme }) => ({
  "backgroundColor": "rgba(0, 0, 0, .03)",
  "flexDirection": "row-reverse",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)"
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1)
  }
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: "1px solid rgba(0, 0, 0, .125)"
}));

const CustomTypography = styled(Typography)(() => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  width: "100%"
}));

const OutputPane = ({ testResults, testCasesLength }) => {
  const [isPassed, setIsPassed] = useState([]);
  const [expanded, setExpanded] = useState([]);
  const [loading, setLoading] = useState(Array(testCasesLength).fill(true));
  const [skeletonCount, setSkeletonCount] = useState(testCasesLength);

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  useEffect(() => {
    if (testResults) {
      const passedArr = testResults.map((result) => {
        console.log("asa>>>", result);
        if (result?.output.status?.id === 3) {
          return atob(result.output.stdout).trim() == result.expected_output;
        }
        return false;
      });

      setIsPassed(passedArr);
      setLoading(Array(testCasesLength).fill(false));
    }
  }, [testResults, testCasesLength]);

  useEffect(() => {
    if (skeletonCount > 0) {
      setSkeletonCount(testCasesLength - testResults.length);
    }
  }, [testResults, testCasesLength]);

  const getOutput = (outputResult) => {
    let statusId = outputResult?.status?.id;

    if (statusId === 6) {
      return (
        <>
          <p className="text-sm mb-2 font-semibold pt-2 pb-2 text-white">Output(compile_output)</p>
          <pre className="px-2 py-1 font-normal text-xs text-red-500">
            {outputResult?.compile_output !== null ? atob(outputResult?.compile_output) : "No compile output"}
          </pre>
        </>
      );
    } else if (statusId === 3) {
      return (
        <pre className="px-2 py-1 font-normal text-xs text-green-500">
          <p className="text-sm mb-2 font-semibold pt-2 pb-2 text-white">Output(stdout)</p>
          {atob(outputResult.stdout) !== null ? `${atob(outputResult?.stdout)}` : "No stdout"}
        </pre>
      );
    } else if (statusId === 5) {
      return <pre className="px-2 py-1 font-normal text-xs text-red-500">Time Limit Exceeded</pre>;
    } else {
      return (
        <>
          <p className="text-sm mb-2 font-semibold pt-2 pb-2 text-white">Output(stderr)</p>
          <pre className="px-2 py-1 font-normal text-xs text-red-500">
            {console.log("out>>", outputResult)}
            {/* {outputResult?.stderr !== null ? atob(outputResult?.stderr) : "No stderr"} */}
          </pre>
        </>
      );
    }
  };

  return (
    <div className="mb-10">
      {testResults.map((outputResult, index) => (
        <Accordion expanded={expanded === `panel${index + 1}`} onChange={handleChange(`panel${index + 1}`)} key={index}>
          <AccordionSummary aria-controls={`panel${index + 1}-content`} id={`panel${index + 1}-header`}>
            <CustomTypography className="flex">
              <p>Test Case {index + 1}</p>
              <div className="flex items-center gap-2">
                <p className="text-sm font-semibold">{isPassed[index] ? "Test Passed" : "Test Failed"}</p>
                <div className={`w-4 h-4 rounded-full ${isPassed[index] ? "bg-green-500" : "bg-red-500"}`}></div>
              </div>
            </CustomTypography>
          </AccordionSummary>
          <AccordionDetails>
            <p className="text-sm mb-2 font-semibold">Compiler Message</p>
            <pre className="bg-slate-100 flex justify-between border rounded-sm my-2 p-3">
              {outputResult?.message != null ? atob(outputResult?.message) : "code successfully compiled"}
            </pre>
            <div className="bg-secondary rounded-sm px-6 py-3 mb-2 text-white w-full">
              <p className="text-sm mb-2 font-semibold text-white">Input(stdin)</p>
              <p className="text-green-500">
                {testResults[index].input != null ? testResults[index].input : "No input provided"}
              </p>
            </div>
            <div className="bg-secondary rounded-sm px-3 pb-3 mb-2 text-white w-full">
              {outputResult ? getOutput(outputResult.output, testResults[index]) : null}
            </div>

            <div className="mt-4 ">
              <p className="text-sm mb-2 font-semibold">Expected Output</p>
              <pre className="bg-slate-100 border rounded-sm my-2 p-3">
                {testResults[index].expected_output != null ? testResults[index].expected_output : "No expected output"}
              </pre>
            </div>
          </AccordionDetails>
        </Accordion>
      ))}
      {console.log("skeletonCount", skeletonCount)}
      {Array(skeletonCount)
        .fill(true)
        .map((_, i) => (
          <Skeleton
            variant="rectangular"
            width="100%"
            height={50}
            key={i}
            className="border border-gray-300 border-opacity-30 flex items-center pl-6 text-gray-400"
            style={{ display: loading.some((item) => item === true) ? "block" : "none" }}
          >
            Loading...
          </Skeleton>
        ))}
    </div>
  );
};

export default OutputPane;
