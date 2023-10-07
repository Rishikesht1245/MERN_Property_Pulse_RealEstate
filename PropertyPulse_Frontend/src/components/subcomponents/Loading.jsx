import ReactLoading from "react-loading";

const Loading = () => {
  return (
    <div className="flex items-center justify-center">
      <ReactLoading type="spin" color="#0000FF" />
    </div>
  );
};
export default Loading;
