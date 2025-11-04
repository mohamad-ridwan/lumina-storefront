import { ShoeQuery, ShoesResponse } from "@/core/domain/product";
import { productRepositoryImpl } from "@/core/infrastructure/repositories/impl/product";

const { getShoe: getShoeRepo } = productRepositoryImpl;

export const getShoe = async (query: ShoeQuery): Promise<ShoesResponse> => {
  const response = await getShoeRepo(query);
  return response;
};
