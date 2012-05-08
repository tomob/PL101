start =
    space* e:expression
    	{ return e; }

validchar
    = [0-9a-zA-Z_?!+\-=@#$%^&*/.]

atom =
    chars:validchar+ space*
        { return chars.join(""); }

expression = 
	atom / list / quote

list =
	"(" space* forms:expression* ")" space*
    	{ return forms; }

space =
	" " / "\t" / "\n" / comment

quote = 
	"'" e:expression
		{ return ["quote", e]; }

comment =
	";;" (!eol .)* eol

eol =
	"\n"