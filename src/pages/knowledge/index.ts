export const CSS_WORD_RULES = `\`\`\` 
comment   \/\*[^*]*\*+([^/*][^*]*\*+)*\/
num       [0-9]+|[0-9]*"."[0-9]+
nonascii  [\\200-\\377]
nmstart   [_a-z]|{nonascii}|{escape}
nmchar    [_a-z0-9-]|{nonascii}|{escape}
name      {nmchar}+
ident     {nmstart}{nmchar}*
\`\`\``;

export const CSS_RULES = `\`\`\`
ruleset
  : selector [ ',' S* selector ]*
    '{' S* declaration [ ';' S* declaration ]* '}' S*
  ;
selector
  : simple_selector [ combinator selector | S+ [ combinator? selector ]? ]?
  ;
simple_selector
  : element_name [ HASH | class | attrib | pseudo ]*
  | [ HASH | class | attrib | pseudo ]+
  ;
class
  : '.' IDENT
  ;
element_name
  : IDENT | '*'
  ;
attrib
  : '[' S* IDENT S* [ [ '=' | INCLUDES | DASHMATCH ] S*
    [ IDENT | STRING ] S* ] ']'
  ;
pseudo
  : ':' [ IDENT | FUNCTION S* [IDENT S*] ')' ]
  ;
\`\`\``;

export const CSS_EXAMPLE = `\`\`\`css
div.error, a.error {
    color:red;
    font-weight:bold;
  }
\`\`\``;

export const RULE_SET = `\`\`\`
ruleset
  : selector [ ',' S* selector ]*
    '{' S* declaration [ ';' S* declaration ]* '}' S*
  ;
\`\`\``;

export const RENDER_OBJECT = `\`\`\`c++
class RenderObject{
  virtual void layout();
  virtual void paint(PaintInfo);
  virtual void rect repaintRect();
  Node* node;  //the DOM node
  RenderStyle* style;  // the computed style
  RenderLayer* containgLayer; //the containing z-index layer
}
\`\`\``;

export const DISPLAY = `\`\`\`c++
RenderObject* RenderObject::createObject(Node* node, RenderStyle* style)
{
    Document* doc = node->document();
    RenderArena* arena = doc->renderArena();
    ...
    RenderObject* o = 0;

    switch (style->display()) {
        case NONE:
            break;
        case INLINE:
            o = new (arena) RenderInline(node);
            break;
        case BLOCK:
            o = new (arena) RenderBlock(node);
            break;
        case INLINE_BLOCK:
            o = new (arena) RenderBlock(node);
            break;
        case LIST_ITEM:
            o = new (arena) RenderListItem(node);
            break;
       ...
    }

    return o;
}
\`\`\``;

export const COMPOUND = `\`\`\`css
div div div div{
  ...
  }
\`\`\``;

export const COMPUTED_HTML = `\`\`\`html
<html>
  <body>
    <div class="err" id="div1">
      <p>
        this is a <span class="big"> big error </span>
        this is also a
        <span class="big"> very  big  error</span> error
      </p>
    </div>
    <div class="err" id="div2">another error</div>
  </body>
</html>
\`\`\``;

export const COMPUTED_CSS = `\`\`\`css
div {margin: 5px; color:black}
.err {color:red}
.big {margin-top:3px}
div span {margin-bottom:4px}
#div1 {color:blue}
#div2 {color:green}
\`\`\``;

export const HASH_MAP_RULES = `\`\`\`css
p.error {color: red}
#messageDiv {height: 50px}
div {margin: 5px}
\`\`\``;

export const HTML_FOR_HASH = `\`\`\`html
<p class="error">an error occurred</p>
<div id="messageDiv">this is a message</div>
\`\`\``;

export const WIDTH_CAL_EXAMPLES = `\`\`\`html
<div style="width: 30%"/>
\`\`\``;

export const EVENT_LOOP = `\`\`\`C++
while (!mExiting)
    NS_ProcessNextEvent(thread);
\`\`\``;

export const FLOAT = `\`\`\`html
<p>
  <img style="float: right" src="images/image.gif" width="100" height="100">
  Lorem ipsum dolor sit amet, consectetuer...
</p>
 \`\`\``;
