// console.log(global)
setTimeout(() => {
    console.log('TimeOut.');
    clearInterval(int);
}, 3000);

const int = setInterval(() => {
    console.log('In the Interval');
}, 1000);

console.log(__dirname);
console.log(__filename); 