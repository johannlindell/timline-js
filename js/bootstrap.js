function bootstrap() {
    const path = getPath();
    if (!path) {return;}
    
    const timelines = getTimeLine(path);
    expandDate();
    var canvas = document.getElementById("canvas");
    bootstrapCanvas(canvas, timelines);
    drawTimelineInformation(canvas, timelines);
}

function getPath() {
    return window.location.pathname.slice(1);
}

function drawTimelineInformation(canvas, timelines) {
    drawTimelines(canvas, timelines);
    drawEvents(canvas, timelines);
    drawPeriods(canvas, timelines);
}