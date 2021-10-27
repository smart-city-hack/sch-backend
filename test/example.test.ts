import { expect } from 'chai'

describe('example', () => {
    it('should work at all', () => {
        const x: number = 1 + 2
        expect(x).to.not.be.null
        expect(x).to.equal(3)
        expect(x).to.be.lessThan(4)
    })
})