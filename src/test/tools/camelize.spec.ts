import { camelize } from "@/utils/tools";

describe('Testing Camelize function', () => {
  it ('First Testing', () => {
    expect(camelize('LoremIpsum')).toBe('loremIpsum')
    expect(camelize('loremIpsum')).toBe('loremIpsum')
    expect(camelize('lorem')).toBe('lorem')
  })
})