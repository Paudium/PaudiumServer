var randoms = [...Array(4)].map(() => Math.floor(Math.random() * 9));

console.log(randoms);

var Mystring='123,234,345';
var output = Mystring.split(',');
console.log(output)

var output_with_qoutes = "'" + output.join("','") + "'";
console.log(output_with_qoutes);