import React from "react";
import { connect } from "react-redux";
import { Container, Row, Col } from "reactstrap";
import "./BeverageMenu.css";
import BeverageMenu from "../../ReusebleComponents/BeverageMenu/BeverageMenu";
import BeverageOrders from "../../ReusebleComponents/BeverageOrder/BeverageOrder";
const BeverageOrder = props => {
  const { Beverages } = props.BeverageMenu[0];
  console.log(props.BeverageQueue);
  return (
    <Container className="text-center pt-5 text-white">
      <Row>
        <Col sm="12" md={{ size: 3, offset: 0 }} className="sm-padding">
          <h4 className="h6 text-center text-bold">BEVERAGE MENU</h4>
          <div className="" style={{ border: "1px solid #fff" }}>
            <div className="m-3">
              {Beverages.map(beverage => (
                <BeverageMenu beverageName={beverage.Name} />
              ))}
            </div>
          </div>
        </Col>
        <Col sm="12" md={{ size: 9, offset: 0 }} className="sm-padding">
          <h4 className="h6 text-center text-bold">BEVERAGE QUEUE</h4>
          <div className="" style={{ border: "1px solid #fff" }}>
            <div className="m-2">
              <Row className="p-3">
                <Col sm="12" md={{ size: 4, offset: 0 }}>
                  <div className="text-center h7">IN THE QUEUE</div>
                  {props.BeverageQueue.map(beverage => {
                    if (
                      !beverage.IsBeingMixed &&
                      !beverage.IsReadyToCollect &&
                      !beverage.IsCollected
                    ) {
                      return (
                        <BeverageOrders
                          beverageName={beverage.OrderedBeverage.Name}
                          userName={beverage.BeverageBarUserFirstName}
                        />
                      );
                    }
                  })}
                </Col>
                <Col sm="12" md={{ size: 4, offset: 0 }} className="sm-padding">
                  <div className="text-center h7">BEING MIXED</div>
                  {props.BeverageQueue.map(beverage => {
                    if (
                      beverage.IsBeingMixed &&
                      !beverage.IsReadyToCollect &&
                      !beverage.IsCollected
                    ) {
                      return (
                        <BeverageOrders
                          beverageName={beverage.OrderedBeverage.Name}
                          userName={beverage.BeverageBarUserFirstName}
                        />
                      );
                    }
                  })}
                </Col>
                <Col sm="12" md={{ size: 4, offset: 0 }} className="sm-padding">
                  <div className="text-center h7">READY TO COLLECT</div>
                  {props.BeverageQueue.map(beverage => {
                    if (
                      beverage.IsBeingMixed &&
                      beverage.IsReadyToCollect &&
                      !beverage.IsCollected
                    ) {
                      return (
                        <BeverageOrders
                          beverageName={beverage.OrderedBeverage.Name}
                          userName={beverage.BeverageBarUserFirstName}
                        />
                      );
                    }
                  })}
                </Col>
              </Row>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};
const mapStateToProps = state => {
  return {
    BeverageMenu: state.BeverageMenu,
    BeverageQueue: state.BeverageQueue
  };
};
export default connect(mapStateToProps)(BeverageOrder);
