import { ResourcePicker } from "@shopify/app-bridge-react";
import { EmptyState, Page } from "@shopify/polaris";
import React, { useEffect, useState } from "react";
import ProductEmptyState from "../components/ProductEmptyState";
import ProductList from "../components/ProductList";
import ProductPage from "../components/ProductPage";
import store from "store-js";

function index({ shopOrigin }) {
  const [isOpen, setIsOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [productsId, setProductsId] = useState([]);
  useEffect(() => {
    const productList = store.get(`${shopOrigin}-products`);
    if (productList) {
      setProducts(productList);
    }
  }, []);
  useEffect(() => {
    const ids = products.map((product) => {
      return {
        id: product.id,
      };
    });
    setProductsId(ids);
  }, [products]);
  function handleProductSelection(payload) {
    setIsOpen(false);
    setProducts(payload.selection);
    store.set(`${shopOrigin}-products`, payload.selection);
  }
  return (
    <>
      <ResourcePicker
        resourceType="Product"
        open={isOpen}
        onCancel={() => setIsOpen(false)}
        onSelection={handleProductSelection}
        initialSelectionIds={productsId}
      />
      {products.length > 0 ? (
        <ProductPage setIsOpen={setIsOpen} products={products} />
      ) : (
        <ProductEmptyState setIsOpen={setIsOpen} />
      )}
    </>
  );
}

export default index;
