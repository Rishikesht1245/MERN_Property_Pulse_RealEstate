import { ConfirmToast } from "react-confirm-toast";
const ShowConfirm = ({ message, handleFunction, children, params }) => {
  const confirmAction = () => {
    handleFunction(params);
  };
  return (
    <ConfirmToast
      asModal={true}
      customCancel={"Cancel"}
      customConfirm={"Confirm"}
      customFunction={params ? confirmAction : handleFunction}
      message={message}
      position={"top-left"}
      showCloseIcon={false}
      theme={"light"}
    >
      {children}
    </ConfirmToast>
  );
};
export default ShowConfirm;
