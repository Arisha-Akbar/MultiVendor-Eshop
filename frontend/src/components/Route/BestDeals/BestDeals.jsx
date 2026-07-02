import React, { useState, useEffect } from "react";
import styles from "../../../styles/style";
import { productData } from "../../../static/data";

import ProductCard from "../ProductCard/ProductCard.jsx";

const BestDeals = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const d = productData
      .sort((a, b) => b.total_sell - a.total_sell)
      .slice(0, 5)
      .map((item) => ({
        ...item,
        images: item.image_Url, // image_Url → images
        discountPrice: item.discount_price, // discount_price → discountPrice
        originalPrice: item.price, // price → originalPrice
        sold_out: item.total_sell, // total_sell → sold_out
      }));
    setData(d);
  }, []);

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
