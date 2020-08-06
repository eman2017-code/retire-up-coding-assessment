//ACTION TYPES
import { LIST_ADDED_CUMULATIVE_KEY_RECORDS } from "../constants/ActionTypes";

//DATA IMPORT
import returns from "../api/sp500.json";

const initialState = {
  records: returns.reverse(),
};

const recordsReducer = (state = initialState.records, action) => {
  switch (action.type) {
    case LIST_ADDED_CUMULATIVE_KEY_RECORDS:
      // list for totalReturns
      const totalReturnArr = [];

      // list for cumulative values
      const cumaltiveValues = [];

      // convert each totalReturn into a number
      state.forEach((el) => totalReturnArr.push(Number(el.totalReturn)));

      // create a cumulative list based off totalReturns
      totalReturnArr.reduce(function (a, b, i) {
        return (cumaltiveValues[i] = Math.round(a + b * 100) / 100);
      }, 0); // import to set initial sum to 0 to account for the first number

      // iterate through newly created cumulativeValues[] & add appropriate values
      const addedKeys = cumaltiveValues.map((el, i) => {
        const newList = { ...state[i] };
        newList.cumulativeKey = el;
        return newList;
      });

      // console.log("state", state, "addedKeys", addedKeys);

      // state = addedKeys;
      // console.log(state);

      return {
        ...state,
        records: action.payload,
      };
    default:
      return state;
  }
};

export default recordsReducer;
