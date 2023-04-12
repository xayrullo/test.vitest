import type { IAttributeTemplate } from "./AttributeTemplate";
import type { IReviewSummary } from "./ReviewSummary";
import type { IReview } from "./Review";

export interface IDetailDescription {
  attributes: Array<IAttributeTemplate>,
  availableStores: Array<any>,
  description: string,
  files: Array<any>,
  labels: Array<any>,
  overview: string,
  reviewSummary: IReviewSummary,
  reviews: Array<IReview>,
  storeCoordinates: Array<Array<string>>
}