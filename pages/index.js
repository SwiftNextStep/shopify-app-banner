import { ResourcePicker } from "@shopify/app-bridge-react";
import { EmptyState, Page } from "@shopify/polaris";
import React, { useEffect, useState } from "react";
import ProductEmptyState from "../components/ProductEmptyState";
import ProductList from "../components/ProductList";
import ProductPage from "../components/ProductPage";

function index() {
  const [isOpen, setIsOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [productsId, setProductsId] = useState([]);
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
