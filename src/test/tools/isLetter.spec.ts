import { isLetter } from '@/utils/tools'

describe('Check characters to letter', () => {
  it('Check with valid value', () => {
    expect(isLetter('a')).toBe(true)
    expect(isLetter('b')).toBe(true)
  })
  it('Check with invalid value', () => {
    expect(isLetter('adfas')).toBe(false)
    expect(isLetter(2)).toBe(false)
    expect(isLetter('3')).toBe(false)
    expect(isLetter('#')).toBe(false)
  })
})
