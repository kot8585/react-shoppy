import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getProducts as fetchProducts, writeProductData } from '../api/database';

export default function useProducts() {
  const queryClient = useQueryClient();
  
  const productsQuery =  useQuery(
    ['products'], 
    fetchProducts,
    {staleTime: 1000 * 60}  
  );

  const addProduct = useMutation({
    mutationFn: ({product, url}) => {
      return writeProductData(product, url);
    }, 
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] })
    },
  });

  return {addProduct, productsQuery};
}

