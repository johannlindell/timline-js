function bootstrapCanvas(canvas, timelines) {
    resizeCanvas(canvas, timelines);
    setBackgroundColor(canvas);
    setFont(canvas);
    getFontHeight(canvas);
}

function resizeCanvas(canvas, timelines) {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight * timelines.length;
}

function setBackgroundColor(canvas) {
    const ctx = canvas.getContext('2d');

    ctx.fillStyle = "#0b3d66";
    ctx.strokeStyle = "#e5e6cc";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#e5e6cc";
}

function setFont(canvas, font) {
    const ctx = canvas.getContext('2d');
    ctx.font = font ? font : '16px sans-serif';
    ctx.closePath();
}

function getFontHeight(canvas, withMargin) {
    const ctx = canvas.getContext('2d');
    var t = ctx.measureText("fooj");

    return t.fontBoundingBoxAscent + t.fontBoundingBoxDescent + (withMargin ? 7 : 0);
}