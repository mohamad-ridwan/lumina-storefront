import { ShoeQuery, ShoesResponse } from "@/core/domain/product";

export interface ProductRepository {
  getShoe(query: ShoeQuery): Promise<ShoesResponse>;
}
