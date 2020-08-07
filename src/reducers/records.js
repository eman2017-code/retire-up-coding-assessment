//ACTION TYPES
import {
  LIST_ADDED_CUMULATIVE_KEY_RECORDS,
  FILTER_RECORDS,
} from "../constants/ActionTypes";

//DATA IMPORT
import returns from "../api/sp500.json";

const initialState = {
  records: returns.reverse(),
  year: { min: 0, max: 100 },
};

const recordsReducer = (state = initialState, action) => {
  switch (action.type) {
    case LIST_ADDED_CUMULATIVE_KEY_RECORDS:
      // list for totalReturns
      const totalReturnArr = [];

      // list for cumulative values
      const cumaltiveValues = [];

      // convert each totalReturn into a number
      state.records.forEach((el) =>
        totalReturnArr.push(Number(el.totalReturn))
      );

      // create a cumulative list based off totalReturns
      totalReturnArr.reduce(function (a, b, i) {
        return (cumaltiveValues[i] = Math.round(a + b * 100) / 100);
      }, 0); // import to set initial sum to 0 to account for the first number

      // iterate through newly created cumulativeValues[] & add appropriate values
      const addedKeys = cumaltiveValues.map((el, i) => {
        const newList = { ...state.records[i] };
        newList.cumulativeKey = el;
        return newList;
      });

      return {
        ...state,
        records: addedKeys,
      };

    // case FILTER_RECORDS:
    //   const min = state.year.min
    //   const max = state.year.min
    //   const years = {}
    //   return [
    //     ...state,
    //     // year: { min: action.year, max: action.year },
    //   ];

    default:
      return state;
  }
};

export default recordsReducer;
