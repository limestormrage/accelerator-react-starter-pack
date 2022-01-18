import {render, screen} from '@testing-library/react';
import {Router} from 'react-router-dom';
import thunk from 'redux-thunk';
import {createMemoryHistory} from 'history';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {Provider} from 'react-redux';
import { makeFakeStore } from '../../utils/mock';
import PriceFilter from './price-filter';

const mockStore = configureMockStore([thunk]);
const history = createMemoryHistory();
const store = mockStore(makeFakeStore());

describe('Component: PriceFilter', () => {
  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <Router history={history}>
          <PriceFilter/>
        </Router>
      </Provider>,
    );

    expect(screen.getByTestId('minPrice')).toBeInTheDocument();
    expect(screen.getByTestId('maxPrice')).toBeInTheDocument();
  });
});
