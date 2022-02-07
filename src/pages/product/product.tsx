import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';
import Modal from '../../components/modal/modal';
import Title from '../../components/title/title';
import { resetCommentPostStatus, setModalStatus } from '../../store/action';
import { fetchGuitarAction } from '../../store/api-action';
import { getModalStatus } from '../../store/modal/selectors';
import { getCommentPostStatus, getGuitar, getGuitarError, getGuitarLoading } from '../../store/products/selectors';
import Loading from '../loading/loading';
import NotFound from '../not-found/not-found';
import Breadcrumbs from './components/breadcrumbs/breadcrumbs';
import Comments from './components/comments/comments';
import NewComment from './components/new-comment/new-comment';
import ProductInfo from './components/product-info/product-info';
import SuccessReview from './components/success-review/success-review';

function Product(): JSX.Element {
  const dispatch = useDispatch();
  const {id} = useParams<{id: string}>();
  const guitar = useSelector(getGuitar);
  const guitarError = useSelector(getGuitarError);
  const guitarLoading = useSelector(getGuitarLoading);
  const openModal = useSelector(getModalStatus);
  const commentPostStatus = useSelector(getCommentPostStatus);

  //Получения товара
  useEffect(() => {
    dispatch(fetchGuitarAction(id));
  }, [dispatch, id]);

  if (guitarLoading) {
    return <Loading/>;
  }

  if (guitarError || !guitar) {
    return <NotFound/>;
  }

  return (
    <div className="wrapper">
      <Header/>
      <main className="page-content">
        <div className="container">
          <Title title={guitar.name}/>
          <Breadcrumbs/>
          <ProductInfo/>
          <Comments comments={guitar.comments}/>
        </div>
      </main>
      <Footer/>
      {openModal && (
        <Modal onClose={() => {
          dispatch(setModalStatus(false));
          dispatch(resetCommentPostStatus());
        }}
        >
          {!commentPostStatus ? <NewComment/> : <SuccessReview/>}
        </Modal>
      )}
    </div>
  );
}

export default Product;
