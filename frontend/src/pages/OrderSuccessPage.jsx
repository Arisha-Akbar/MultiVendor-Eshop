import React from "react";
import Footer from "../components/Layout/Footer";
import Header from "../components/Layout/Header";

const OrderSuccessPage = () => {
  return (
    <div>
      <Header />
      <Success />
      <Footer />
    </div>
  );
};

const Success = () => {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <div className="success-checkmark">
        <svg width="120" height="120" viewBox="0 0 120 120">
          <circle
            className="checkmark-circle"
            cx="60"
            cy="60"
            r="54"
            fill="none"
            stroke="#4bb543"
            strokeWidth="6"
          />
          <path
            className="checkmark-check"
            fill="none"
            stroke="#4bb543"
            strokeWidth="6"
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M34 62 L52 78 L86 40"
          />
        </svg>
      </div>
      <h5 className="text-center mt-6 text-[25px] text-[#000000a1]">
        Your order is successful 😍
      </h5>
      <br />
      <br />
      <style>{`
        .checkmark-circle {
          stroke-dasharray: 340;
          stroke-dashoffset: 340;
          animation: circle-draw 0.6s ease-out forwards;
        }
        .checkmark-check {
          stroke-dasharray: 80;
          stroke-dashoffset: 80;
          animation: check-draw 0.4s ease-out 0.6s forwards;
        }
        @keyframes circle-draw {
          to { stroke-dashoffset: 0; }
        }
        @keyframes check-draw {
          to { stroke-dashoffset: 0; }
        }
      `}</style>
    </div>
  );
};

export default OrderSuccessPage;
