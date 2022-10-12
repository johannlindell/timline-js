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
            var canvas = document.getElementById("canvas");
            bootstrapCanvas(canvas, timelines);
            drawTimelineInformation(canvas, timelines);
        });
}

function getPath() {
    return window.location.pathname.slice(1);
}

function drawTimelineInformation(canvas, timelines) {
    drawTimelines(canvas, timelines);
    drawTimelineEvents(canvas, timelines);
    drawPeriods(canvas, timelines);
}
//Yeah
function fetchJsonData() {
    fetch('/timelines/test.json')
        .then((response) => {
            console.log(response);
            return response.json();
        })
        .then((data) => console.log(data));
}