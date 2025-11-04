import { getShoe } from "../../services/api/product";
import { ShoeQuery, ShoesResponse } from "@/core/domain/product";
import { ProductRepository } from "../product";

export const productRepositoryImpl: ProductRepository = {
  async getShoe(query: ShoeQuery): Promise<ShoesResponse> {
    return await getShoe(query);
  },
};
