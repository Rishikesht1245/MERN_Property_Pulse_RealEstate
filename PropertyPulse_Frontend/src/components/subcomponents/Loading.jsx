import ReactLoading from "react-loading";

const Loading = () => {
  return (
    <div className="flex items-center justify-center mt-10 min-h-[50vh]">
      <ReactLoading type="spin" color="#0000FF" />
    </div>
  );
};
export default Loading;
