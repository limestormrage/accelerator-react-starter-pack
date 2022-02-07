import { toast } from 'react-toastify';
import { APIRoute, FailMessage } from '../const';
import { ThunkActionResult } from '../types/action';
import { Comment, CommentPost, Guitar, Guitars } from '../types/guitar';
import {
  loadGuitarError,
  loadGuitarRequest,
  loadGuitarsError, loadGuitarsRequest, loadGuitarsSuccess, loadGuitarSuccess, loadPlaceholdersPriceError,
  loadPlaceholdersPriceRequest, loadPlaceholdersPriceSuccess, loadSearchGuitarsError, loadSearchGuitarsRequest,
  loadSearchGuitarsSuccess, sendCommentError, sendCommentRequest, sendCommentSuccess
} from './action';

export const fetchGuitarsAction = (query = {}): ThunkActionResult => (
  async (dispatch, _getState, api) => {
    const baseUrl = `${APIRoute.Guitars}?_embed=comments`;
    dispatch(loadGuitarsRequest());
    try {
      const {data, headers} = await api.get<Guitars>(`${baseUrl}&${query}`);
      const count = headers['x-total-count'];
      dispatch(loadGuitarsSuccess(data, count));
    } catch {
      dispatch(loadGuitarsError());
    }
  }
);

export const fetchPlaceholdersPriceAction = (query = {}): ThunkActionResult => (
  async (dispatch, _getState, api) => {
    dispatch(loadPlaceholdersPriceRequest());
    try {
      const {data} = await api.get<Guitars>(APIRoute.Guitars, {params: query});
      dispatch(loadPlaceholdersPriceSuccess(data));
    } catch {
      dispatch(loadPlaceholdersPriceError());
    }
  }
);

export const fetchSearchGuitarsAction = (query = {}): ThunkActionResult => (
  async (dispatch, _getState, api) => {
    dispatch(loadSearchGuitarsRequest());
    try {
      const {data} = await api.get<Guitars>(APIRoute.Guitars, {params: query});
      dispatch(loadSearchGuitarsSuccess(data));
    } catch {
      dispatch(loadSearchGuitarsError());
    }
  }
);

export const fetchGuitarAction = (id: string): ThunkActionResult => (
  async (dispatch, _getState, api ) => {
    const baseUrl = `${APIRoute.Guitars}/${id}?_embed=comments`;
    dispatch(loadGuitarRequest());
    try {
      const {data} = await api.get<Guitar>(baseUrl);
      dispatch(loadGuitarSuccess(data));
    } catch {
      dispatch(loadGuitarError());
    }
  }
);

export const sendCommentsAction = (userComment: CommentPost): ThunkActionResult => (
  async (dispatch, _getState, api) => {
    dispatch(sendCommentRequest());
    try {
      const {data} = await api.post<Comment>(APIRoute.Comment, userComment);
      dispatch(sendCommentSuccess(data));
    } catch {
      dispatch(sendCommentError());
      toast.error(FailMessage.PostComment);
    }
  }
);
