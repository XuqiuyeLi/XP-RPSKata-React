import {Kata} from './Kata'

describe('1st test suite', () => {
    test('rock vs scissors', () => {
        const result = new Kata().someMethod('rock', 'scissors')

        expect(result).toBe('Player 1 Wins!')
    })
})
