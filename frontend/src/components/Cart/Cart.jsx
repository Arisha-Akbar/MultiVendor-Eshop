import React from "react";
import { RxCross1 } from "react-icons/rx";
import { HiOutlineMinus, HiPlus } from "react-icons/hi";
import styles from "../../styles/style.js";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { IoBagHandleOutline } from "react-icons/io5";

const Cart = () => {
  const cartData = [
    {
      name: "Product 1",
      description: "This is product 1",
      price: 100,
    },
    {
      name: "Product 2",
      description: "This is product 2",
      price: 343,
    },
    {
      name: "Product 2",
      description: "This is product 3",
      price: 443,
    },
  ];
  return (
    <div className="fixed top-0 left-0 w-full bg-[#0000004b] h-screen z-10 ">
      <div className="fixed top-0 right-0 min-h-full w-[25%] bg-white flex flex-col justify-between shadow-sm">
        <div>
          <div className="flex w-full justify-end pt-5 pr-5">
            <RxCross1
              sisze={25}
              className="cursor-pointer"
              onClick={() => setOpenCart(false)}
            />
          </div>
          {/* items length */}
          <div className={`${styles.normalFlex} p-4`}>
            <IoBagHandleOutline size={25} />
            <h5 className="pl-2 text-[20px] font-medium">3 items</h5>
          </div>

          {/* cart single items */}
          <br />
          <div className="w-full border-t">
            {cartData &&
              cartData.map((i, index) => <CartSingle key={index} data={i} />)}
          </div>
        </div>
        <div className="px-5 mb-3">
          <Link to="/checkout" >
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

const CartSingle = ({ data }) => {
  const [value, setValue] = useState(1);
  const totalPrice = data.price * value;

  return (
    <div className="border-bottim p-4">
      <div className="w-full flex items-center">
        <div>
          <div
            className="bg-[#e44343] border border-[#e4434373] rounded-full w-6.25 h-6.25 ${styles.noramlFlex} justify-center cursor-pointer`"
            onClick={() => setValue(value + 1)}
          >
            <HiPlus size={18} color="#fff" />
          </div>
          <span className="pl-2.5">{value}</span>
          <div
            className="bg-[#a7abb14f] rounded-full w-6.25 h-6.25 flex items-center justify-center cursor-pointer 
          onclick{()=> setValue(value === 1 ? 1 : value - 1)
            } "
          >
            <HiOutlineMinus size={16} color="#7d879c" />
          </div>
        </div>
        <img
          src="https://images.unsplash.com/photo-1781429235828-55c8c31baf38?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          className="w-20 h-20 ml-2"
        />
        <div className="pl-1.25">
          <h1>{data.name}</h1>
          <h4 className="font-normal text-[15px] text-[#00000082]">
            {data.price} * {value}
          </h4>
          <h4 className="font-semibold text-[17px] text-[#d02222] font-roboto">
            US${totalPrice}
          </h4>
        </div>
        <RxCross1 className="cursor-pointer" />
      </div>
    </div>
  );
};

export default Cart;
