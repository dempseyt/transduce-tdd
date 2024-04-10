import transduce from './transduce'
 
describe('transduce', () => {
    const double = (num) => num * 2;
    const map = (func) => (step) => (accumulator, currentValue) => step(accumulator, func(currentValue));
    const filter = (predicate) => (step) => (a, c) => (predicate(c) ? step(a,c) : a)
    const isEven = (x) => x % 2 === 0;
    const arrayReducer = (accumulator, currentValue) => accumulator.concat([currentValue]);
    
    it('applies a map transducer to double each element in the array', () => {
        const collection = [1,2,3];
        const initialValue = [];

        const transformer = step => map(double)(step);

        expect(transduce(transformer, arrayReducer, initialValue, collection)).toEqual([2,4,6])
    });
    it('applies a filter transducer to each element in the array', () => {
        const collection = [1,2,3,4,5];
        const initialValue = [];
        const transducer = (step) => filter(isEven)(step)


        expect(transduce(transducer, arrayReducer, initialValue, collection)).toEqual([2,4]);
    })
});
 