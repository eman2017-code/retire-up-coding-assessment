//ACTION TYPE IMPORTS
import * as types from "../constants/ActionTypes";

// lists records
export const listAllRecords = (records) => ({
  type: types.LIST_ADDED_CUMULATIVE_KEY_RECORDS,
  records,
});

// filters records
export const filterRecords = (records, years) => ({
  type: types.FILTER_RECORDS,
  records,
  years,
});
