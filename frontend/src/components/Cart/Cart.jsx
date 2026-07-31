import React from "react";
import { RxCross1 } from "react-icons/rx";
import { HiOutlineMinus, HiPlus } from "react-icons/hi";
import styles from "../../styles/style.js";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { IoBagHandleOutline } from "react-icons/io5";
import { removeFromCart } from "../../redux/actions/cart.js";

const Cart = ({ setOpenCart }) => {
  const { cart } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  // Calculate total price
  const totalPrice = cart && cart.reduce((acc, item) => acc + item.discountPrice * (item.qty || 1), 0);

  return (
    <div className="fixed top-0 left-0 w-full bg-[#0000004b] h-screen z-10 ">
      <div className="fixed top-0 right-0 min-h-full w-[25%] bg-white flex flex-col justify-between shadow-sm">
        <div>
          <div className="flex w-full justify-end pt-5 pr-5">
            <RxCross1
              size={25}
              className="cursor-pointer"
              onClick={() => setOpenCart(false)}
            />
          </div>
          {/* items length */}
          <div className={`${styles.normalFlex} p-4`}>
            <IoBagHandleOutline size={25} />
            <h5 className="pl-2 text-[20px] font-medium">{cart?.length || 0} items</h5>
          </div>

          {/* cart single items */}
          <br />
          <div className="w-full border-t">
            {cart && cart.length > 0 ? (
              cart.map((i, index) => (
                <CartSingle 
                  key={index} 
                  data={i} 
                  removeFromCartHandler={removeFromCartHandler}
                />
              ))
            ) : (
              <div className="p-4 text-center text-gray-500">Your cart is empty</div>
            )}
          </div>
        </div>
        <div className="px-5 mb-3">
          <Link to="/checkout">
            <div className={`h-11.25 flex items-center justify-center w-full bg-[#e44343] rounded-[5px]`}>
              <h1 className="text-white text-[18px] font-semibold">
                Checkout Now (USD${totalPrice})
              </h1>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

const CartSingle = ({ data, removeFromCartHandler }) => {
  const [value, setValue] = useState(data.qty || 1);
  const dispatch = useDispatch();
  
  const updateQuantity = (newQty) => {
    if (newQty < 1) return;
    const updatedData = { ...data, qty: newQty };
    dispatch({ type: "addToCart", payload: updatedData });
    localStorage.setItem("cartItems", JSON.stringify(updatedData));
    setValue(newQty);
  };

  const totalPrice = data.discountPrice * value;

  return (
    <div className="border-b p-4">
      <div className="w-full flex items-center">
        <div>
          <div
            className="bg-[#e44343] border border-[#e4434373] rounded-full w-6.25 h-6.25 flex items-center justify-center cursor-pointer"
            onClick={() => updateQuantity(value + 1)}
          >
            <HiPlus size={18} color="#fff" />
          </div>
          <span className="pl-2.5">{value}</span>
          <div
            className="bg-[#a7abb14f] rounded-full w-6.25 h-6.25 flex items-center justify-center cursor-pointer"
            onClick={() => updateQuantity(value === 1 ? 1 : value - 1)}
          >
            <HiOutlineMinus size={16} color="#7d879c" />
          </div>
        </div>
        <img
          src={data.images?.[0]?.url || ''}
          alt={data.name}
          className="w-20 h-20 ml-2 object-cover"
          onError={(e) => { e.target.style.display = 'none'; }}
        />
        <div className="pl-1.25">
          <h1>{data.name}</h1>
          <h4 className="font-normal text-[15px] text-[#00000082]">
            {data.discountPrice} * {value}
          </h4>
          <h4 className="font-semibold text-[17px] text-[#d02222] font-roboto">
            US${totalPrice}
          </h4>
        </div>
        <RxCross1 
          className="cursor-pointer ml-auto" 
          onClick={() => removeFromCartHandler(data._id)}
        />
      </div>
    </div>
  );
};

export default Cart;
