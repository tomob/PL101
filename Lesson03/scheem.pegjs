start =
    expression

validchar
    = [0-9a-zA-Z_?!+\-=@#$%^&*/.]

atom =
    chars:validchar+
        { return chars.join(""); }

expression =
	atom / list

list =
	"(" space* first:expression? rest:(space expression)* space* ")"
    	{ 
    		if (first === "") return [];
    		return [first].concat(rest.map(function(elem){return elem[1];})); 
    	}

space =
	" "
