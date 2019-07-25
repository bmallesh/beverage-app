import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Container, Row, Col, Input, Button, Form, Label } from "reactstrap";
import "./BeverageOrder.css";

class BeverageOrder extends Component {
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
      <Container className="text-center pt-5 text-white">
        <Row>
          <Col sm="12" md={{ size: 6, offset: 3 }}>
            <h4 className="h6 text-center ">ORDER YOUR BEVERAGE</h4>
            <div style={{ border: "1px solid #fff" }}>
              <div className="p-5">
                <Row>
                  <Col
                    md={{ size: 3, offset: 0 }}
                    sm="12"
                    className="text-left"
                  >
                    <Label for="name" className="">
                      Name:
                    </Label>
                  </Col>
                  <Col>
                    <Input
                      type="text"
                      name="name"
                      onChange={this.handleChange}
                      className="form-control form-input"
                      placeholder="Username"
                      autoComplete="off"
                    />
                  </Col>
                </Row>
                <Row className="pt-4">
                  <Col
                    md={{ size: 3, offset: 0 }}
                    sm="12"
                    className="text-left"
                  >
                    <Label for="beverage">BEVERAGE:</Label>
                  </Col>
                  <Col>
                    <Input
                      type="select"
                      className="form-control pl-2 form-input"
                      name="beverageName"
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
                    disabled={
                      this.state.name && this.state.beverageName ? false : true
                    }
                    onClick={() => {
                      this.submitOrder();
                    }}
                  >
                    SUBMIT
                  </Button>
                </div>
              </div>
            </div>
            <div className="float-right">
              <Link to="/BeverageQueue">Queue</Link>
            </div>
          </Col>
        </Row>
      </Container>
    );
  }
}
const mapStateToProps = state => {
  return {
    BeverageMenu: state.BeverageMenu
  };
};

export default connect(mapStateToProps)(BeverageOrder);
