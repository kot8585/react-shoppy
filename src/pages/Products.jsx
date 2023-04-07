import React, { useEffect, useRef } from "react";
import ProductCard from "../components/ProductCard";
import useProducts from "../hooks/useProducts";
import Spinner from "../components/Spinner";


export default function Products() {
  const target = useRef();

  const {
    productsQuery: { data, error, isFetching, fetchNextPage, hasNextPage },
  } = useProducts();

  useEffect(() => {
    let callback = (entries) => {
      if (entries[0].isIntersecting) {
        fetchNextPage();
      }
    };

    let observer = new IntersectionObserver(callback, {
      root: null,
      rootMargin: "0px",
      threshold: 1.0,
    });

    if (target.current) {
      observer.observe(target.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [fetchNextPage, hasNextPage, data]);

  return (
    <>
      {!!data || isFetching || <>등록된 상품이 없습니다.</>}

      <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5 p-5">
        {data &&
          data.pages.map((page) => {
            return page.data.map((product) => (
                <ProductCard product={product} key={product.id} />
                ));
              })}
      </ul>

      {(isFetching || hasNextPage) && (
        <div ref={target} >
          <Spinner/>
        </div>
      )}

      {error && <>{error}</>}
    </>
  );
}
