type StatusProps = {
  status: "loading" | "success" | "error";
};

const Status = (prop: StatusProps) => {
  let message;
  switch (prop.status) {
    case "loading":
      message = "Loading ...";
      break;
    case "success":
      message = "Successfully!!!!";
      break;
    case "error":
      message = "Failed!!!";
      break;
    default:
      break;
  }
  return <div>{message}</div>;
};

export default Status;
