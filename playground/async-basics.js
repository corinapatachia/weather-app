console.log('Starting app');

setTimeout(() => {
    console.log('inside of callback');
},2000);

setTimeout(() => {
    console.log('2nd timeout ')
},0);
console.log('Finishing app');
