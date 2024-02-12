// interface User {
//   name: string;
//   age: number;
// }
type NumberArr = number[];
function getFirstElememt<T>(arr: T[]) {
  return arr[0];
}

let ans = getFirstElememt([1, 2, 3]);
let ans2 = getFirstElememt(["one", "two", "three"]);
console.log(ans);
ans2.toLowerCase();
// we using genric here
