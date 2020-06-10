const arrayEqual = (arr1: Array<any>, arr2: Array<any>) => 
    arr1.length === arr2.length && 
    arr1.every((ignored, index) => arr1[index] === arr2[index])

const safeFetch = (func) => {
    let lastArgs;

    return function (...args) {

    }
}