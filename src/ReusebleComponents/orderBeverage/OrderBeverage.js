import React, { Component } from "react";
import { connect } from "react-redux";
import { Container, Row, Col, Input, Button, Label } from "reactstrap";
import "./OrderBeverage.css";

class OrderBeverage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      beverageName: ""
    };
    console.log(this.props.BeverageMenu);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }
  submitOrder() {
    console.log(this.state);
    let updateBeverage = {
      OrderCreatedTimeStamp: new Date(),
      BeverageBarOrderId: "",
      OrderedBeverage: {
        BeverageId: "",
        Name: this.state.beverageName
      },
      OrderQuantity: 0,
      IsBeingMixed: false,
      IsReadyToCollect: false,
      IsCollected: false,
      BeverageBarUserId: "",
      BeverageBarUserFirstName: this.state.name,
      OrderDeliveredTimeStamp: ""
    };
    this.props.dispatch({ type: "ADD_BEVERAGE", payload: updateBeverage });
    this.MoveToBeverage(updateBeverage);
    this.props.history.push("/BeverageQueue");
  }
  MoveToBeverage(updateBeverage) {
    this.props.updatestate({
      modal: false
    });
    setTimeout(() => {
      let payload = {
        OrderCreatedTimeStamp: updateBeverage.OrderCreatedTimeStamp,
        IsBeingMixed: true
      };
      this.props.dispatch({ type: "BEINGMIXED", payload });
    }, 10000);
    setTimeout(() => {
      let payload = {
        OrderCreatedTimeStamp: updateBeverage.OrderCreatedTimeStamp,
        IsReadyToCollect: true
      };
      this.props.dispatch({ type: "BEINGMIXED", payload });
    }, 15000);
    setTimeout(() => {
      let payload = {
        OrderCreatedTimeStamp: updateBeverage.OrderCreatedTimeStamp,
        IsCollected: true
      };
      this.props.dispatch({ type: "BEINGMIXED", payload });
    }, 20000);
  }
  render() {
    const { Beverages } = this.props.BeverageMenu[0];
    return (
      <div className="p-1">
        <Row>
          <Col xs="12">
            <Label for="name" className="">
              Name:
            </Label>
          </Col>
          <Col>
            <Input
              type="text"
              name="name"
              onChange={this.handleChange}
              className="form-control"
              placeholder="Username"
              autoComplete="off"
            />
          </Col>
        </Row>
        <Row className="pt-4">
          <Col xs="12">
            <Label for="beverage">BEVERAGE:</Label>
          </Col>
          <Col>
            <Input
              type="select"
              className="form-control pl-2 "
              name="beverageName"
              value={this.props.selectValue}
              onChange={this.handleChange}
            >
              <option> -- Please Select --</option>
              {Beverages.map(beverage => (
                <option value={beverage.Name}>{beverage.Name}</option>
              ))}
            </Input>
          </Col>
        </Row>
        <div className="pt-3 text-right">
          <Button
            type="submit"
            className="btn btn-success"
            disabled={this.state.name && this.state.beverageName ? false : true}
            onClick={() => {
              this.submitOrder();
            }}
          >
            SUBMIT
          </Button>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    BeverageMenu: state.BeverageMenu
  };
};

export default connect(mapStateToProps)(OrderBeverage);
