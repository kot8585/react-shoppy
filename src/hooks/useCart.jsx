import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  addOrUpdateCart,
  getCart as fetchCart,
  removeFromCart,
} from '../api/database';
import { useUserContext } from '../context/UserContext';

export default function useCart() {
  const queryClient = useQueryClient();
  const { uid } = useUserContext();

  const getCart = useQuery(['carts', uid || ''], () => fetchCart(uid), {
    enabled: !!uid,
  });

  const addOrUpdateItem = useMutation({
    mutationFn: (product) => {
      return addOrUpdateCart(product, uid);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['carts', uid] });
    },
  });

  const removeItem = useMutation((id) => removeFromCart(uid, id), {
    onSuccess: () => {
      queryClient.invalidateQueries(['carts', uid]);
    },
  });

  return { getCart, addOrUpdateItem, removeItem };
}
