import classes from './CartButton.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { cartActions } from '../redux/cartSlice';

const CartButton = (props) => {
  const dispatch = useDispatch()
  const cartQuantity = useSelector(state => state.cart.totalQuantity)
  const cartHandler = () => {
    dispatch(cartActions.showCart())
  }
  return (
    <button className={classes.button} onClick={cartHandler}>
      <span>My Cart</span>
      <span className={classes.badge}>{cartQuantity}</span>
    </button>
  );
};

export default CartButton;
