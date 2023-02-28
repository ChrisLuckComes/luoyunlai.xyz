export const SQL_1 = `\`\`\`js
let query = "SELECT * FROM accounts WHERE custID='" + ctx.request.id + "'";
\`\`\``;

export const MATCH_LIST = `\`\`\`js
const matchList  = {
    '&lt;': '<',
    '&gt;': '>',
    '&amp;': '&',
    '&#34;': '"',
    '&quot;': '"',
    '&#39;': "'",
  }
\`\`\``;

export const CODE_1 = `\`\`\`js
let data = "SELECT * FROM accounts WHERE custID='" + ctx.request.acct;
\`\`\``;

export const XSS_HTML = `\`\`\`js
let url = new URL(localtion);
document.write("<input name='creditcard' type='TEXT' value='"+ url.searchParams.get('cc') + "'");
\`\`\``;
