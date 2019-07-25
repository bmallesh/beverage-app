const BeverageQueueState = [];
const BeverageQueueReducer = (state = BeverageQueueState, action) => {
  switch (action.type) {
    case "ADD_BEVERAGE":
      return [...state, action.payload];
    case "BEINGMIXED":
      return state.map(beverage => {
        console.log(action.payload.OrderCreatedTimeStamp);
        if (
          beverage.OrderCreatedTimeStamp == action.payload.OrderCreatedTimeStamp
        ) {
          console.log("update", action.payload);
          return {
            ...beverage,
            ...action.payload
          };
        } else {
          return {
            ...beverage
          };
        }
      });
    default:
      return state;
  }
};
export default BeverageQueueReducer;
