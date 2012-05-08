start =
    space* e:expression_or_quote space* 
    	{ return e; }

validchar
    = [0-9a-zA-Z_?!+\-=@#$%^&*/.]

atom =
    chars:validchar+
        { return chars.join(""); }

expression_or_quote =
	expression / quote

expression = 
	atom / list 

list =
	"(" space* first:expression? rest:(space+ expression)* space* ")"
    	{ 
    		if (first === "") return [];
    		return [first].concat(rest.map(function(elem){return elem[1];})); 
    	}

space =
	" " / "\t" / "\n" / comment

quote = 
	"'" e:expression
		{ return ["quote"].concat(e); }

comment =
	";;" (!eol .)* eol

eol =
	"\n"