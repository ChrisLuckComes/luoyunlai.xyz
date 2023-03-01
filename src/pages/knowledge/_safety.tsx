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

export const CSP_CONFIG = `\`\`\`http
// 所有内容均来自站点的同一个源
Content-Security-Policy: default-src 'self'
// 内容来自信任的域名和子域名
Content-Security-Policy: default-src 'self' *.trusted.com
// 允许用户包含来自任何源的图片，限制音频和视频，所有脚本必须从特定服务器获取代码
Content-Security-Policy: default-src 'self'; img-src *; media-src media1.com media2.com; script-src userscripts.expample.com
\`\`\``;

export const CSRF_IMG = `\`\`\`html
<img src="https://bank.example.com/withdraw?account=Alice&amount=1000&for=Badman" />
\`\`\``;
