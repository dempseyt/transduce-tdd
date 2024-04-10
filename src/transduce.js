const reduce = (reducer, initialValue, collection) => collection.reduce(reducer, initialValue);

const transduce = (transformer, reducer, initialValue, collection) => {
    
    return reduce(transformer(reducer), initialValue, collection);
}

export default transduce;