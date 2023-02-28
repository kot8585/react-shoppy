import React from 'react';
import ProductCard from '../components/ProductCard';
import useProducts from '../hooks/useProducts';

export default function Products() {
  const {
    productsQuery: {isLoading, error, data: products}
  } = useProducts();

  return (
    <>
      {isLoading && <>Loading...</>}
      {error && <>{error}</>}
      <ul className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5 p-5'>
        {products && Object.values(products).map((product) => <ProductCard product={product} key={product.id}/>)}
      </ul>
    </>
  );
}

