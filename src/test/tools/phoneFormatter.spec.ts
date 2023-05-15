import { phoneFormatter } from "@/utils/tools";

describe('Check phone formatter', () => {
    it('Test with valid value', () => {
        expect(phoneFormatter('+998939499896')).toBe('+(998)93 949-9896')
        expect(phoneFormatter('998939499896')).toBe('+(998)93 949-9896')
    })
})