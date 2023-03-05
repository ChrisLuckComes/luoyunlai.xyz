export const LOOP = `\`\`\`js 
function problem() {
  let a = {},
    b = {};

  a.a = b;
  b.b = a;
};
\`\`\``;

export const DOM_LOOP = `\`\`\`js
let element = document.getElementById('element'),
    object = {};

object.element = element;
element.xxx = object;
\`\`\``;

export const HIDDEN_CLASS = `\`\`\`js
function Article(){
  this.title = 'Article';
}

let a1 = new Article();
let a2 = new Article();
\`\`\``;

export const NO_DEF = `\`\`\`js
function setName(){
  name = 'lyl';
}
\`\`\``;

export const CLOSURE_TIMER = `\`\`\`js
let name = 'lyl';
setInterval(() =>{
  console.log(name);
}, 100)
\`\`\``;

export const CLOSURE = `\`\`\`js
let outer = function(){
  let name = 'lyl';
  return function(){
    return name;
  }
}
\`\`\``;
