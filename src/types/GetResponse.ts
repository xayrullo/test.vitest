import type { IData } from "./Data"
export interface IGetResponse {
  data: any,
  error_code: number,
  message: string,
  success: boolean
}