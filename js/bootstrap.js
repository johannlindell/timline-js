function bootstrap() {
    listTimelines();
    expandDate();
    const path = getPath();

    if (!path) {
        return;
    }
    
    getTimeLines(path)
        .then((timelines) => {
            console.log(timelines);
            var canvas = getCanvas();
            bootstrapCanvas(canvas, timelines);
            drawTimelineInformation(canvas, timelines);
        });
}
function getCanvas() {
    return document.getElementById("canvas");
}

function drawTimelineInformation(canvas, timelines) {
    drawTimelines(canvas, timelines);
    drawTimelineEvents(canvas, timelines);
    drawPeriods(canvas, timelines);
}