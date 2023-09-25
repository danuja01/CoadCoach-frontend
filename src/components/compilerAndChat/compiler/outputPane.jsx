const OutputPane = ({ outputResult }) => {
  const getOutput = () => {
    let statusId = outputResult?.status?.id;

    if (statusId === 6) {
      return (
        <>
          <p className="text-sm mb-2 font-semibold pt-2 pb-2 text-white">Output(compile_output)</p>
          <pre className="px-2 py-1 font-normal text-xs text-red-500">{atob(outputResult?.compile_output)}</pre>);
        </>
      );
    } else if (statusId === 3) {
      return (
        <pre className="px-2 py-1 font-normal text-xs text-green-500">
          <p className="text-sm mb-2 font-semibold pt-2 pb-2 text-white">Output(stdout)</p>
          {atob(outputResult.stdout) !== null ? `${atob(outputResult.stdout)}` : null}
        </pre>
      );
    } else if (statusId === 5) {
      return <pre className="px-2 py-1 font-normal text-xs text-red-500">{`Time Limit Exceeded`}</pre>;
    } else {
      return (
        <>
          <p className="text-sm mb-2 font-semibold pt-2 pb-2 text-white">Output(stderr)</p>
          <pre className="px-2 py-1 font-normal text-xs text-red-500">{atob(outputResult?.stderr)}</pre>
        </>
      );
    }
  };

  return (
    <>
      <p className="text-sm mb-2 font-semibold">Compiler Message</p>
      <pre className="bg-[#f4f4f4] border rounded-sm my-2 p-3">
        {outputResult?.message != null ? atob(outputResult?.message) : "code successfully compiled"}
      </pre>
      <div className="bg-secondary rounded-sm px-6 py-3 mb-2 text-white w-full">
        <p className="text-sm mb-2 font-semibold  text-white">Input(stdin)</p>
        <p className="text-green-500">2, 4</p>
      </div>
      <div className="bg-secondary rounded-sm px-3 pb-3 mb-2 text-white w-full">
        {outputResult ? getOutput() : null}
      </div>
      <div className="mt-4 mb-20">
        <p className="text-sm mb-2 font-semibold">Expected Output</p>
        <pre className="bg-[#f4f4f4] border rounded-sm my-2 p-3">hello</pre>
      </div>
    </>
  );
};

export default OutputPane;
