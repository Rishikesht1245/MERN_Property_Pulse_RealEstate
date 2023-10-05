import { ConfirmToast } from "react-confirm-toast";
const ShowConfirm = ({ message, handleFunction, children }) => {
  return (
    <ConfirmToast
      asModal={true}
      customCancel={"Cancel"}
      customConfirm={"Confirm"}
      customFunction={handleFunction}
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
