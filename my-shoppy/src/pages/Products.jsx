import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { getProducts } from '../api/database';
import ProductCard from '../context/ProductCard';

export default function Products() {
  const {isLoading, error, data: products} = useQuery(['products'], getProducts);

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

