import { stringToDate } from '@/utils/tools'
import type { IDateResponse } from "@/types/DateResponse"

interface IDateWithFormat {
  date: string
  format: string
}
describe('Check parse string date to Date format', () => {
  it('Send valid string date', () => {
    const parsedDate: IDateResponse = stringToDate('23.11.1999')
    expect(parsedDate.data?.getTime()).toBe(new Date('11.23.1999').getTime())
    const stringDates: string[] = ['23.11.1999', '23-11-1999', '23/11/1999']
    for (let index = 0; index < stringDates.length; index++) {
      expect(stringToDate(stringDates[index]).data?.getTime()).toBe(new Date('11/23/1999').getTime())
    }
  })
  it('Send valid string with changing date format', () => {
    const parsedDate: IDateResponse = stringToDate('11.23.1999', 'mm.dd.yyyy')
    expect(parsedDate.data?.getTime()).toBe(new Date('11.23.1999').getTime())
    const stringDates: IDateWithFormat[] = [
      { date: '11.23.1999', format: 'mm.dd.yyyy' },
      { date: '1999-23-11', format: 'yyyy.dd.mm' },
      { date: '1999/11/23', format: 'yyyy.mm.dd' }
    ]
    for (let index = 0; index < stringDates.length; index++) {
      expect(stringToDate(stringDates[index].date, stringDates[index].format).data?.getTime()).toBe(new Date('11/23/1999').getTime())
    }
  })
  it('Error cases', () => {
    expect(stringToDate('324.32423l432l432.34l23').success).toBe(false)
    expect(stringToDate('31.02.1999').success).toBe(false)
    expect(stringToDate('23.12.1999', 'mm.dd.yyyy').success).toBe(false)
  })
})
