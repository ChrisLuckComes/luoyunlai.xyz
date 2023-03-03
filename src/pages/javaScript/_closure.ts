export const EXAMPLE = `\`\`\`js
function func(str) {
    return function () {
      return str;
    };
  }
  
  let nameFunc = func();
  
  console.log(nameFunc);
\`\`\``;

export const PRIVATE_ATTR = `\`\`\`js
function func() {
  let a = 1;

  function setA(val) {
    a = val;
  }

  function getA() {
    return a;
  }

  return { getA, setA };
}

let { getA, setA } = func();

console.log(getA()); //1
setA(2);
console.log(getA()); //2

\`\`\``;
