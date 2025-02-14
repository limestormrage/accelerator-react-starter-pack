import { makeFakeComment, makeFakeGuitar } from '../../utils/mock';
import {
  loadGuitarError, loadGuitarRequest, loadGuitarsError, loadGuitarsRequest, loadGuitarsSuccess,
  loadGuitarSuccess, loadSearchGuitarsError, loadSearchGuitarsRequest, loadSearchGuitarsSuccess,
  resetSearchGuitars, sendCommentError, sendCommentRequest, sendCommentSuccess, resetCommentPostStatus, resetProduct
} from '../action';
import { products } from './products';

const state = {
  guitarsLoading: false,
  guitarsError: false,
  guitars: [],
  totalGuitars: 0,
  searchGuitarsLoading: false,
  searchGuitarsError: false,
  searchGuitars: [],
  guitarLoading: false,
  guitar: null,
  guitarError: false,
  sendCommentLoading: false,
  commentPostStatus: false,
};

describe('Reducer: products', () => {
  it('without additional parameters should return initial state', () => {
    expect(products(void 0, {type: 'UNKNOWN_ACTION'}))
      .toEqual({...state});
  });

  it('should set the download status by uploading data', () => {
    expect(products(state, loadGuitarsRequest()))
      .toEqual({...state, guitarsLoading: true});
  });

  it('should update the download status and products by uploading the data', () => {
    const randomCount = Math.floor(Math.random() * 20);
    const guitars = new Array(5).fill(null).map(() => makeFakeGuitar());
    expect(products(state, loadGuitarsSuccess(guitars, randomCount)))
      .toEqual({
        ...state,
        guitarsLoading: false,
        guitars: guitars,
        totalGuitars: randomCount,
      });
  });

  it('should set the status of the data loading error, after a failed download', () => {
    expect(products(state, loadGuitarsError()))
      .toEqual({
        ...state,
        guitarsLoading: false,
        guitarsError: true,
      });
  });

  it('should set the download status when uploading data', () => {
    expect(products(state, loadSearchGuitarsRequest()))
      .toEqual({
        ...state,
        searchGuitarsLoading: true,
      });
  });

  it('should update the download status and add data, if the download is successful', () => {
    const guitars = new Array(5).fill(null).map(() => makeFakeGuitar());
    expect(products(state, loadSearchGuitarsSuccess(guitars)))
      .toEqual({
        ...state,
        searchGuitarsLoading: false,
        searchGuitars: guitars,
      });
  });

  it('error status should be updated if the download fails', () => {
    expect(products(state, loadSearchGuitarsError()))
      .toEqual({
        ...state,
        searchGuitarsLoading: false,
        searchGuitarsError: true,
      });
  });

  it('should be updated data', () => {
    expect(products(state, resetSearchGuitars()))
      .toEqual({
        ...state,
        searchGuitars: [],
      });
  });

  it('should set the download status by starting the guitar download', () => {
    expect(products(state, loadGuitarRequest()))
      .toEqual({
        ...state,
        guitarLoading: true,
      });
  });

  it('should update the download status by downloading the guitar', () => {
    const guitar = makeFakeGuitar();
    expect(products(state, loadGuitarSuccess(guitar)))
      .toEqual({
        ...state,
        guitarLoading: false,
        guitar: guitar,
      });
  });

  it('the error status is expected to be set, in case of failure', () => {
    expect(products(state, loadGuitarError()))
      .toEqual({
        ...state,
        guitarLoading: false,
        guitarError: true,
      });
  });

  it('should upload status is expected to change when a comment is sent', () => {
    expect(products(state, sendCommentRequest()))
      .toEqual({
        ...state,
        sendCommentLoading: true,
      });
  });

  it('should upload status is expected to change and comments will be updated when the comment is sent successfully', () => {
    const fakeComment = makeFakeComment();
    expect(products(state, sendCommentSuccess(fakeComment)))
      .toEqual({
        ...state,
        sendCommentLoading: false,
        commentPostStatus: true,
      });
  });

  it('should expected that the error status will change after the failure to send a comment', () => {
    expect(products(state, sendCommentError()))
      .toEqual({
        ...state,
        sendCommentLoading: false,
      });
  });
  it('should reset the status of the sent comment', () => {
    expect(products(state, resetCommentPostStatus()))
      .toEqual({
        ...state,
        commentPostStatus: false,
      });
  });
  it('should reset product data', () => {
    expect(products(state, resetProduct()))
      .toEqual({
        ...state,
        guitar: null,
        guitarError: false,
      });
  });
});
