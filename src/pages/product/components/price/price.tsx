import { getFormatPrice } from '../../utils';

type PriceProps = {
  price: number,
}

function Price({price}: PriceProps): JSX.Element | null {
  const formattedPrice = getFormatPrice(price.toString());

  return (
    <div className="product-container__price-wrapper">
      <p className="product-container__price-info product-container__price-info--title">Цена:</p>
      <p className="product-container__price-info product-container__price-info--value">{`${formattedPrice} ₽`}</p>
      <a className="button button--red button--big product-container__button" href="/">Добавить в корзину</a>
    </div>
  );
}

export default Price;
