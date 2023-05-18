import type { IMonth } from './Month'

export interface IPartner {
  description: string
  logo: string
  months: Array<IMonth>
  name: string
  type: number
}
