import type { IData } from "./Data"
export interface IGetResponse {
  data: IData,
  error_code: number,
  message: string,
  success: boolean
}