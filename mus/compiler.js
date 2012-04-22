
var endTime = function (time, expr) {
    if (expr.tag === 'note' || expr.tag === 'rest')
        return time + expr.dur;
    if (expr.tag === 'repeat') {
        var t = endTime(time, expr.section);
        return t * expr.count;
    }
    var leftTime = endTime(time, expr.left);
    return endTime(leftTime, expr.right);
};

var compile_expr = function(time, expr) {
    if (expr.tag === 'note')
        return [{tag: expr.tag,
                 pitch: expr.pitch,
                 start: time,
                 dur: expr.dur}];
    if (expr.tag === 'rest')
        return [{tag: expr.tag,
                 start: time,
                 dur: expr.dur}];
    if (expr.tag === 'repeat') {
        var retval = [];
        var t = time;
        for (i = 0; i < expr.count; i++) {
            retval = retval.concat(compile_expr(t, expr.section));
            t = endTime(t, expr.section);
        }
        return retval;
    }
    if (expr.tag === 'seq') {
        var leftTime = endTime(time, expr.left);
        var leftCompiled = compile_expr(time, expr.left);
        var rightCompiled = compile_expr(leftTime, expr.right);
        return leftCompiled.concat(rightCompiled);
    }
};

var compile = function (musexpr) {
    return compile_expr(0, musexpr);
};

var playMUS = function(musExpr) {
    var compiled = compile(musExpr);
    playNOTE(compiled);
};

//////

var melody_mus =
    { tag: 'seq',
      left:
       { tag: 'seq',
         left: { tag: 'note', pitch: 'a4', dur: 250 },
         right: { tag: 'note', pitch: 'b4', dur: 250 } },
      right:
       { tag: 'seq',
         left: { tag: 'rest', dur: 500 },
         right: {
            tag: 'repeat',
            section: {tag: 'note', pitch: 'd4', dur: 500 },
            count: 3} } };

console.log(melody_mus);
console.log(compile(melody_mus));


