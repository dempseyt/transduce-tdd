import transduce from './transduce'
 
describe('transduce', () => {
    const double = (num) => num * 2;
    const isEven = (x) => x % 2 === 0;
    const isGreaterThan5 = (x) => x > 5;
    const map = (func) => (step) => (accumulator, currentValue) => step(accumulator, func(currentValue));
    const filter = (predicate) => (step) => (a, c) => (predicate(c) ? step(a,c) : a)
    const arrayReducer = (accumulator, currentValue) => accumulator.concat([currentValue]);
    const compose = (...transducers) => (step) =>
      transducers.reduce((composedFn, fn) => fn(composedFn), step);
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
    });
    it('applies composed map and filter transducers to each element in the array', () => {
        const collection = [1,2,3,4,5];
        const initialValue = [];
        const transducer = compose(filter(isGreaterThan5), map(double))

        expect(transduce(transducer, arrayReducer, initialValue, collection)).toEqual([6,8,10])
    })
});
 