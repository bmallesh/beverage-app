import React, { Component } from "react";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import "./BeverageMenu.css";
import OrderBeverage from "../orderBeverage/OrderBeverage";
class BeverageMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      selectValue: ""
    };

    this.toggle = this.toggle.bind(this);
    this.updatestate = this.updatestate.bind(this);
  }
  toggle(selectValue = "") {
    this.setState(prevState => ({
      modal: !prevState.modal,
      selectValue
    }));
  }
  updatestate(stateObject) {
    this.setState(stateObject);
  }
  render() {
    return (
      <div className="bg-bvr-menu my-2">
        <div
          className="py-2 text-center text-body pointer"
          onClick={this.toggle.bind(this, this.props.beverageName)}
        >
          <strong>{this.props.beverageName}</strong>
        </div>
        <Modal
          isOpen={this.state.modal}
          toggle={this.toggle}
          className={this.props.className}
        >
          <ModalHeader toggle={this.toggle} className="text-color">
            ORDER YOUR BEVERAGE
          </ModalHeader>
          <ModalBody>
            <OrderBeverage
              updatestate={this.updatestate}
              selectValue={this.state.selectValue}
            />
          </ModalBody>
        </Modal>
      </div>
    );
  }
}
// const BeverageMenu = ({ beverageName }) => (
//   <div className="bg-bvr-menu my-2">
//     <div className="py-2 text-center text-body" onClick={() => <ModalPopUp />}>
//       <strong>{beverageName}</strong>
//     </div>
//   </div>
// );

export default BeverageMenu;
