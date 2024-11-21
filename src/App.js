import { useEffect } from "react";
import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import { useDispatch, useSelector } from "react-redux";
import { uiActions } from "./components/redux/uiSlice";
import Notification from "./components/UI/Notification";
import { cartActions } from "./components/redux/cartSlice";

let isInitial = true;

function App() {
  const dispatch = useDispatch();
  const cartIsShown = useSelector((state) => state.cart.cartIsVisible);
  const cart = useSelector((state) => state.cart.cart);
  const totalQuantity = useSelector((state) => state.cart.totalQuantity)
  const notification = useSelector((state) => state.ui.notification);
  useEffect(() => {
    const fetchCart = async () => {
      const response = await fetch(
        "https://react-http-2e5c1-default-rtdb.europe-west1.firebasedatabase.app/cart.json"
      );
      if (!response.ok) {
        throw new Error("Fetching cart data failed.");
      }
      const data = await response.json();
      console.log(data)
      dispatch(cartActions.setCart(data));
    };
    try {
      fetchCart();
      dispatch(
        uiActions.showNotification({
          status: "success",
          title: "Data acquired",
          message: "Cart data fetched successfully!",
        })
      );
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Error occured",
          message: "Fetching cart data failed.",
        })
      );
    }
  }, []);

  useEffect(() => {
    const sendCartData = async () => {
      dispatch(
        uiActions.showNotification({
          status: "pending",
          title: "Sending...",
          message: "Sending cart data!",
        })
      );
      const response = await fetch(
        "https://react-http-2e5c1-default-rtdb.europe-west1.firebasedatabase.app/cart.json",
        { method: "PUT", body: JSON.stringify({
          cart: cart,
          totalQuantity: totalQuantity,
        }) }
      );
      if (!response.ok) {
        throw new Error("Sending cart data failed.");
      }
      dispatch(
        uiActions.showNotification({
          status: "success",
          title: "Data sent",
          message: "Cart sucessfully updated!",
        })
      );
    };
    if (!isInitial) {
      sendCartData().catch((error) => {
        dispatch(
          uiActions.showNotification({
            status: "error",
            title: "Error occured",
            message: "Sending cart data failed.",
          })
        );
      });
    } else {
      isInitial = false;
    }
  }, [dispatch, cart]);

  return (
    <>
      {notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}
      <Layout>
        {cartIsShown && <Cart />}
        <Products />
      </Layout>
    </>
  );
}

export default App;