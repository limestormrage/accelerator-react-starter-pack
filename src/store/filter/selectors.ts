import { FilterState, State } from '../../types/state';
import { NameSpace } from '../root-reducer';

export const getSortType = (state: State): null | string => state[NameSpace.Filter].sortType;
export const getSortOrder = (state: State): null | string => state[NameSpace.Filter].sortOrder;
export const getMinPrice = (state: State): null |string => state[NameSpace.Filter].minPrice;
export const getMaxPrice = (state: State): null | string => state[NameSpace.Filter].maxPrice;
export const getFilter = (state: State): FilterState => state[NameSpace.Filter];
