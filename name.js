let number = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
let newSet = [];

const doubleNumber = () => {
    number.map((item) => {
        let newNumber = item + `${item}`;
        let newSetOne = newSet.push(newNumber);
        console.log(newSetOne)
    })
}