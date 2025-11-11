import { getLatestOffers } from "../../services/api/latest-offers";
import { LatestOffersRepository } from "../latest-offers";
import { LatestOffer } from "@/core/domain/latest-offers";

export const latestOffersImpl: LatestOffersRepository = {
  async getLatestOffers(query): Promise<LatestOffer[]> {
    return await getLatestOffers(query);
  },
};
