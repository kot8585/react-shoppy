import { useInfiniteQuery } from "@tanstack/react-query";
import React, { useEffect, useRef } from "react";
import { getProducts } from "../api/database";
import ProductCard from "../components/ProductCard";
import useProducts from "../hooks/useProducts";

export default function Products() {
  // const {
  //   productsQuery: { isLoading, error, data: products },
  // } = useProducts();

  //1. query를 사용해서 데이터 가져오기
  function fetchPage(pageParam) {
    return getProducts(pageParam);
  }

  const {
    status,
    data,
    // error,
    isFetching,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ["productScroll"],
    queryFn: async ({ pageParam = null }) => {
      const res = fetchPage(pageParam);
      // console.log("res : ", res);
      // console.log("res.data : ", res.data);
      return res;
    },
    //lastPage, allPage는 알아서 들어가는거야?
    getNextPageParam: (lastPage, allPages) => {
      // console.log("lastPage: ", lastPage);
      // console.log("allPages: ", allPages);
      return lastPage.nextCursor ?? undefined;
    },
    staleTime: 80 * 1000,
  });

  const target = useRef(null);
  useEffect(() => {
    let callback = (entries, observer) => {
      console.log("entries : ", entries);
      if (entries[0].isIntersecting) {
        fetchNextPage();
        console.log(
          `observer가 호출되었어요. entries : ${entries} , observer : ${observer}`
        );
        console.log("hasNextPage", hasNextPage);
        console.log("target", target);
        // observer.observe(target.current);
        if (!hasNextPage) observer.disconnect();
      }
    };

    let observer = new IntersectionObserver(callback, {
      root: null,
      rootMargin: "0px",
      threshold: 1.0,
    });

    if (target.current) {
      console.log("current", target.current);
      observer.observe(target.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [fetchNextPage, hasNextPage]);

  return (
    <>
      {/* {isLoading && <>Loading...</>} */}
      {/* {error && <>{error}</>} */}
      <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5 p-5">
        {data &&
          data.pages.map((page, pagesIndex, pagesArray) => {
            return page.data.map((product) => (
              <ProductCard product={product} key={product.id} />
            ));
          })}
        {/* {products &&
      Object.values(products).map((product) => (
      <ProductCard product={product} key={product.id} />
      ))} */}
      </ul>
      {hasNextPage && (
        <div ref={target} className="w-10 h-10 bg-slate-300">
          Intersection
        </div>
      )}
      {/* <button onClick={handleOnClick}>버튼</button> */}
    </>
  );
}
