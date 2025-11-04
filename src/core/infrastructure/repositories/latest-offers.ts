import { LatestOffer, ReqLatestOffers } from "@/core/domain/latest-offers";

export interface LatestOffersRepository {
  getLatestOffers(query: ReqLatestOffers): Promise<LatestOffer[]>;
}
