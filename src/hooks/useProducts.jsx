import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import {
  getProducts as fetchProducts,
  writeProductData,
} from "../api/database";

export default function useProducts() {
  const queryClient = useQueryClient();

  const productsQuery = useInfiniteQuery({
    queryKey: ["products"],
    queryFn: ({ pageParam = null }) => fetchProducts(pageParam),
    getNextPageParam: (lastPage) => {
      return lastPage.nextCursor ?? undefined;
    },
    staleTime: 60 * 1000,
  });

  const addProduct = useMutation({
    mutationFn: ({ product, url }) => {
      return writeProductData(product, url);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });

  return { addProduct, productsQuery };
}
