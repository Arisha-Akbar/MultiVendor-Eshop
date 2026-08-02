import React, { useState, useEffect } from "react";
import styles from "../../../styles/style";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../../../redux/actions/product";
import ProductCard from "../ProductCard/ProductCard.jsx";

const BestDeals = () => {
  const { allProducts, isLoading } = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const [data, setData] = useState([]);

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  useEffect(() => {
    if (allProducts && allProducts.length > 0) {
      const d = [...allProducts]
        .sort((a, b) => (b.sold_out || 0) - (a.sold_out || 0))
        .slice(0, 5);

      setData(d);
    }
  }, [allProducts]);

  if (isLoading) {
    return null;
  }

  return (
    <div>
      <div className={`${styles.section}`}>
        <div className={`${styles.heading}`}>
          <h1>Best Deals</h1>
        </div>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6.25 lg:grid-cols-4 lg:gap-6.25 xl:grid-cols-5 xl:gap-7.5 mb-12 border-0">
          {data && data.map((i, index) => <ProductCard data={i} key={index} />)}
        </div>
      </div>
    </div>
  );
};

export default BestDeals;
