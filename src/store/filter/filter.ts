import { createReducer } from '@reduxjs/toolkit';
import { FilterState } from '../../types/state';
import { changeGuitarType, changeNumberOfString, changePrice, changeSortOrder, changeSortType, setFilter } from '../action';

const initialState: FilterState = {
  sortType : null,
  sortOrder: null,
  minPrice: null,
  maxPrice: null,
  guitarType: [],
  numberOfString: [],
};

const filter = createReducer(initialState, (builder) => {
  builder
    .addCase(setFilter, (state, action) => {
      const {actualFilter} = action.payload;
      return {
        ...state,
        ...actualFilter,
      };
    })
    .addCase(changeSortType, (state, action) => {
      const {sortType} = action.payload;
      state.sortType = sortType;
    })
    .addCase(changeSortOrder, (state, action) => {
      const {sortOrder} = action.payload;
      state.sortOrder = sortOrder;
    })
    .addCase(changePrice, (state, action) => {
      const {key, price} = action.payload;
      return {
        ...state,
        [key]: price,
      };
    })
    .addCase(changeGuitarType, (state, action) => {
      const {guitarType} = action.payload;
      state.guitarType = guitarType;
    })
    .addCase(changeNumberOfString, (state, action) => {
      const {numberOfString} = action.payload;
      state.numberOfString = numberOfString;
    });
});

export {filter};
