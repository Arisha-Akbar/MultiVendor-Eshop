import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Footer from "../components/Layout/Footer";
import Header from "../components/Layout/Header";
import Loader from "../components/Layout/Loader.jsx";
import ProductCard from "../components/Route/ProductCard/ProductCard";
import styles from "../styles/style";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../redux/actions/product";

function ProductPage() {
  const [searchParams] = useSearchParams();
  const categoryData = searchParams.get("category");
  const { allProducts, isLoading } = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const [data, setData] = useState([]);

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  useEffect(() => {
    if (allProducts && allProducts.length > 0) {
      if (categoryData === null) {
        setData(allProducts);
      } else {
        setData(allProducts.filter((i) => i.category === categoryData));
      }
    } else {
      setData([]);
    }
  }, [categoryData, allProducts]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <div>
        <Header activeHeading={3} />
        <br />
        <br />
        <div className={`${styles.section}`}>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6.25 lg:grid-cols-4 lg:gap-6.25 xl:grid-cols-5 xl:gap-7.5 mb-12">
            {data &&
              data.map((i, index) => <ProductCard data={i} key={index} />)}
          </div>
          {data && data.length === 0 ? (
            <h1 className="text-center w-full pb-25 text-[20px]">
              No products Found!
            </h1>
          ) : null}
        </div>
        <Footer />
      </div>
    </>
  );
}

export default ProductPage;
