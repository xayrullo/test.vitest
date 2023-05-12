import { isValidDate } from '@/utils/tools'

describe('Check isValidDate function', () => {
  it('Send valid date values', () => {
    const isValid: Boolean = isValidDate(23, 11, 1999)
    expect(isValid).toBe(true)
  })
  it('Send invalid date values', () => {
    const isValid: Boolean = isValidDate(29, 2, 2021)
    expect(isValid).toBe(false)
  })
})
