import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { orderPayment } from "../../redux/ApiRedux/apiRequest";
import { useSelector } from "react-redux";
const DebitButton = ({ orderId, dispatch, OrderDetail }) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const { companyInfo } = useSelector((state) => state.Company);
  const successDosmesticHandler = () => {
    var now = new Date();
    var isoDate = new Date(
      now.getTime() - now.getTimezoneOffset() * 60000
    ).toISOString();
    const paymentInfo = {
      id: "_" + Math.random().toString(36).substring(2, 9),
      status: "Pending",
      update_time: isoDate,
    };
    orderPayment(orderId, paymentInfo, dispatch, OrderDetail?.paymentMethod);
  };
  return (
    <>
      <button
        type="button"
        className="d-block btn w-100 bg-info text-white fw-bolder"
        onClick={handleShow}
      >
        DebitCart Payment
      </button>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        centered={true}
        size={"lg"}
      >
        <Modal.Header className="justify-content-center">
          <Modal.Title>Cổng thanh toán trực tiếp bằng thẻ nội địa</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center bg-light">
          <h6>* Ngân hàng : {companyInfo && companyInfo[0]?.Bank}</h6>
          <h6>* Tên Chủ TK: {companyInfo && companyInfo[0]?.bankOwner}</h6>
          <h6>* Số tài khoản: {companyInfo && companyInfo[0]?.bankAccount}</h6>
          <h6>* Số Điện Thoại: {companyInfo && companyInfo[0]?.phoneNumber}</h6>
          <h6>
            -------------------------------------------------------------------------
          </h6>
          <h6>Nội dung chuyển khoản vui lòng ghi rõ:</h6>
          <h6>Họ Tên người chuyển - Sản phẩm đã mua - Số Điện Thoại</h6>
          <h6>Sau khi chuyển khoản xong bạn vui lòng đợi Admin xác nhận!!!</h6>
        </Modal.Body>
        <Modal.Footer className="d-flex justify-content-between">
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={successDosmesticHandler}>
            Thanh toán
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default DebitButton;
