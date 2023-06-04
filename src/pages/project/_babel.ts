export const TRANSFORM_SOURCE = `\`\`\`js
// Babel Input: ES2015 arrow function
[1, 2, 3].map(n => n + 1);

// Babel Output: ES5 equivalent
[1, 2, 3].map(function(n) {
  return n + 1;
});
\`\`\``;

export const COMPILER = `\`\`\`js
/**
 * ============================================================================
 *                                  (۶* ‘ヮ’)۶”
 *                         !!!!!!!!THE COMPILER!!!!!!!!
 * ============================================================================
 */

/**
 * FINALLY! We'll create our \`compiler\` function. Here we will link together
 * every part of the pipeline.
 *
 *   1. input  => tokenizer   => tokens
 *   2. tokens => parser      => ast
 *   3. ast    => transformer => newAst
 *   4. newAst => generator   => output
 */

function compiler(input) {
  let tokens = tokenizer(input); // 词法分析，将输入的代码转换为tokens
  let ast    = parser(tokens); // 语法分析，将tokens数组转换为ast
  let newAst = transformer(ast); // 语法转换，将ast转换为新的ast
  let output = codeGenerator(newAst); // 代码生成，返回结果

  // and simply return the output!
  return output;
}

/**
 * ============================================================================
 *                                   (๑˃̵ᴗ˂̵)و
 * !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!YOU MADE IT!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 * ============================================================================
 */

// Now I'm just exporting everything...
module.exports = {
  tokenizer,
  parser,
  traverser,
  transformer,
  codeGenerator,
  compiler,
};
\`\`\``;

export const TOKENIZER = `\`\`\`js
// tokenizer  2 + 2

[
    { type:"number", value:'2' },
    { type:"add", value:"+" },
    { type:"number", value:'2' },
]


export function tokenizer(input: string) {
  let current = 0,
    tokens = [];

  while (current < input.length) {
    let char = input[current];

    //处理括号
    if (char === '(') {
      tokens.push({ tpye: 'paren', value: '(' });
      current++;
      continue;
    }
    //处理括号
    if (char === ')') {
      tokens.push({ name: 'paren', value: ')' });
      current++;
      continue;
    }
    //处理空格
    const WHITESPACE = /\s/;
    if (WHITESPACE.test(char)) {
      current++;
      continue;
    }

    //处理数字
    const NUMBERS = /\d/;
    if (NUMBERS.test(char)) {
      let value = '';
      while (NUMBERS.test(char)) {
        value += char;
        char = input[++current];
      }
      tokens.push({ type: 'number', value });
      continue;
    }

    //处理字符
    const LETTERS = /[a-z]/;
    if (LETTERS.test(char)) {
      let value = '';
      while (LETTERS.test(char)) {
        value += char;
        char = input[++current];
      }
      tokens.push({ type: 'name', value });
      continue;
    }

    throw new Error('未知字符：' + char);
  }

  return tokens;
}

\`\`\``;
