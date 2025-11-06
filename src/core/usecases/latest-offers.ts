import { LatestOffer, ReqLatestOffers } from "../domain/latest-offers";
import { latestOffersImpl } from "../infrastructure/repositories/impl/latest-offers";

const { getLatestOffers: getLatestOffersRepo } = latestOffersImpl;

export const getLatestOffers = async (
  query: ReqLatestOffers
): Promise<LatestOffer[]> => {
  return await getLatestOffersRepo(query);
};
