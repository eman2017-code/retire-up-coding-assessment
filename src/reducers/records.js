//ACTION TYPES
import {
  LIST_ADDED_CUMULATIVE_KEY_RECORDS,
  FILTER_RECORDS,
} from "../constants/ActionTypes";

//DATA IMPORT
import returns from "../api/sp500.json";

const initialState = {
  records: returns.reverse(),
  years: { min: 0, max: 100 },
  filteredRecords: [],
  isFiltering: false,
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

      //HOW TO CALCULATE THE CUMULATIVE RETURN
      // cumulativeVal = ( currentPrice / initialPrice ) - 1

      // create a cumulative list based off totalReturns
      totalReturnArr.reduce(function (a, b, i) {
        return (cumaltiveValues[i] = Math.round((b + a) * 100) / 100);
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

    case FILTER_RECORDS:
      // selections from the user from the slider
      const fromYear = action.years[0];
      const toYear = action.years[1];

      // filters out the appropriate records
      const selectedYears = state.records.filter(function (selection) {
        return selection.year >= fromYear && selection.year <= toYear;
      });

      return {
        ...state,
        filteredRecords: selectedYears,
        years: { min: fromYear, max: toYear },
        isFiltering: true,
      };

    default:
      return state;
  }
};

export default recordsReducer;
