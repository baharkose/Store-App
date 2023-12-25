import React, { useEffect, useState } from "react";
import SearchInput from "../components/SearchInput";
import ProductCard from "../components/ProductCard";
import Loading from "../components/Loading";
import axios from "axios";
const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

  console.log(search);
  const getData = async () => {
    setLoading(true);
    try {
      const { data } = await axios(
        `https://dummyjson.com/products/search?q=${search}`
      );
      console.log(data);
      setProducts(data.products);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, [search]);

  return (
    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
      <SearchInput search={search} setSearch={setSearch} />
      <h2 className="text-2xl font-bold mt-8 tracking-tight text-gray-900">
        All Products
      </h2>
      {loading ? (
        <loading />
      ) : products.length ? (
        products.map((item) => <ProductCard />)
      ) : (
        <h2 className="text-2xl text-center font-bold mt-8 tracking-tight text-red-500-900">
          No product
        </h2>
      )}
    </div>
  );
};

export default Products;
