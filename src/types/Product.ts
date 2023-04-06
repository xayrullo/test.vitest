import type { IAvailability } from "./Availability"
import type { IBrand } from "./Brand"
import type { ILabel } from "./Label"
import type { IMainAttributes } from "./MainAttributes"
import type { IMainCategory } from "./MainCategory"
import type { IOfferAttributes } from "./OfferAttributes"
import type { IOfferProductColors } from "./OfferProductColors"
import type { ISaleMonths } from "./SaleMonths"
import type { IStik } from "./Stik"

export interface IProduct {
  availability: IAvailability,
  axiomMonthlyPrice: string,
  brand: IBrand,
  brand_image: string | null,
  f_loan_price: string | null,
  f_old_price: string | null,
  f_sale_price: string | null,
  id: number,
  image: string,
  images: Array<string>,
  kod_product: string,
  labels: Array<ILabel>,
  loan_price: number,
  mainAttributes: Array<IMainAttributes>,
  mainCategory: IMainCategory,
  name: string,
  offerAttributes: Array<IOfferAttributes>,
  offerProductColors: Array<IOfferProductColors>,
  old_price: any,
  overview: string,
  reviewsCount: number,
  reviewsMiddleRate: number,
  sale_months: Array<ISaleMonths>,
  stik: IStik,
  thumb_images: Array<string>,
  varranty: any
}