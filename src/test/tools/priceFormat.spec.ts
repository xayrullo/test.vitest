import { priceFormat } from '@/utils/tools'

describe('Check price format', () => {
  it('with numbers', () => {
    expect(priceFormat(4123413241234123)).toBe('4 123 413 241 234 123')
    expect(priceFormat(123)).toBe('123')
  })
})
