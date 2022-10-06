function bootstrap() {
    const path = getPath();
    if (!path) {return;}
    
    const timelines = getTimeLine(path);
    expandDate();
    var canvas = document.getElementById("canvas");
    bootstrapCanvas(canvas, timelines);
    drawTimeLine(canvas, timelines);
    drawEvents(canvas, timelines);
    drawPeriods(canvas, timelines);
}

function getPath() {
    return window.location.pathname.slice(1);
}