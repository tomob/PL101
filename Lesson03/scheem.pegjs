start =
    space* e:expression space* 
    	{ return e; }

validchar
    = [0-9a-zA-Z_?!+\-=@#$%^&*/.]

atom =
    chars:validchar+
        { return chars.join(""); }

expression =
	atom / list

list =
	"(" space* first:expression? rest:(space+ expression)* space* ")"
    	{ 
    		//console.log("A" + first + "B" + rest + "C");
    		if (first === "") return [];
    		//console.log("lala");
    		return [first].concat(rest.map(function(elem){return elem[1];})); 
    	}

space =
	" " / "\t" / "\n"
