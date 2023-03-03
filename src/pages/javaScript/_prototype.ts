export const EXAMPLE = `\`\`\`js
function Person(name) {
    this.name = name;
    this.age = null;
  }
  
  Person.prototype.setAge = function (age) {
    this.age = age;
  };
  
  let a = new Person("lyl");
  
  console.log(a.name);
  
  a.setAge(18);
  
  console.log(a.age);
  
\`\`\``;
