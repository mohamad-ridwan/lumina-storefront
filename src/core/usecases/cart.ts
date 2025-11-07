import { GetCartResponse } from "../domain/cart";
import { cartRepositoryImpl } from "../infrastructure/repositories/impl/cart";
import {
  AddCartRequest,
  UpdateCartQuantityRequest,
  RemoveFromCartRequest,
} from "../infrastructure/repositories/cart";

const {
  getCart: getCartRepo,
  addCart: addCartRepo,
  updateCartQuantity: updateCartQuantityRepo,
  removeFromCart: removeFromCartRepo,
} = cartRepositoryImpl;

export const getCart = async (userId: string): Promise<GetCartResponse> => {
  return await getCartRepo(userId);
};

export const addCart = async (
  params: AddCartRequest
): Promise<GetCartResponse> => {
  return await addCartRepo(params);
};

export const updateCartQuantity = async (
  params: UpdateCartQuantityRequest
): Promise<GetCartResponse> => {
  return await updateCartQuantityRepo(params);
};

export const removeFromCart = async (
  params: RemoveFromCartRequest
): Promise<GetCartResponse> => {
  return await removeFromCartRepo(params);
};






