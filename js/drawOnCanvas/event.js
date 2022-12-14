function drawTimelineEvents(canvas, timelines) {
    var timelineorder = 0;
    timelines.forEach(timeline => {
        drawEvents(canvas, timeline, timelines, timelineorder)
        ++timelineorder;
    })
}

function drawEvents(canvas, timeline, timelines, timelineorder) {
    const startDate = timeline.startDate;
    const endDate = timeline.endDate;
    const startingPoint = getStartingPoint(canvas, timelines, timelineorder);
    const endingPoint = getEndingPoint(canvas, timelines, timelineorder);
    
    const events = timeline.events;
    const ctx = canvas.getContext('2d');

    events.forEach(event => {
        drawEvent(canvas, event, timeline, startingPoint, endingPoint);
    });
    ctx.closePath();

}

function drawEvent(canvas, event, timeline, startingPoint, endingPoint) {
    const ctx = canvas.getContext('2d');
    const endPoint = drawEventLine(canvas, event, timeline, startingPoint, endingPoint);
    const descriptionWidth = Math.ceil(
        ctx.measureText(getLongestStringInArray(event.description.textlines, new Date(event.date).toLocaleDateString('sv-se')))
            .width
    ) + 40;
    const boxStartPoint = drawEventBox(canvas, event, endPoint, descriptionWidth);
    printEventContent(canvas, event, boxStartPoint, descriptionWidth);
}

function getEventFont() {
    return { size: 20, style: "Arial" };
}

function drawEventLine(canvas, event, timeLine, startingPoint, endingPoint) {
    const pointOnTimeLine = findPointOnTimeLine(new Date(event.date), timeLine, startingPoint, endingPoint);
    const ctx = canvas.getContext('2d');

    const y = pointOnTimeLine.y + (event.placement.isUp ? -1 : 1) * event.placement.distance;
    const endpoint = { x: pointOnTimeLine.x, y: y };
    ctx.beginPath();
    ctx.strokeStyle = event.styles.textColor;
    ctx.moveTo(pointOnTimeLine.x, pointOnTimeLine.y);
    ctx.lineTo(endpoint.x, endpoint.y);
    ctx.stroke();

    return endpoint;
}

function drawEventBox(canvas, event, lineEndPoint, boxWidth) {
    const ctx = canvas.getContext('2d');
    const lineHeight = getFontHeight(canvas, true);

    var height = lineHeight * (event.description.textlines.length + 1) + 10;
    const startingPoint = {
        x: lineEndPoint.x - Math.ceil(boxWidth / 2),
        y: event.placement.isUp ? lineEndPoint.y - height : lineEndPoint.y
    };
    ctx.fillStyle = event.styles.backgroundColor;
    ctx.fillRect(startingPoint.x, startingPoint.y, boxWidth, height);

    return startingPoint;
}

function printEventContent(canvas, event, boxStartPoint) {
    const ctx = canvas.getContext('2d');
    const dateStartPoint = { x: boxStartPoint.x + 10, y: boxStartPoint.y + 21 };
    var nextStartPoint = { x: dateStartPoint.x, y: dateStartPoint.y + 22 };
    ctx.fillStyle = "white";
    ctx.fillText(new Date(event.date).toLocaleDateString('sv-se'), dateStartPoint.x, dateStartPoint.y);

    event.description.textlines.forEach(textline => {
        ctx.fillText(textline, nextStartPoint.x, nextStartPoint.y);
        nextStartPoint = { x: nextStartPoint.x, y: nextStartPoint.y + 22 };
    });
}

function getLongestStringInArray(textlines, datestring) {
    var longestString = datestring;
    textlines.forEach(textline => {
        if (textline.length > longestString.length) {
            longestString = textline;
        }
    });

    return longestString;
}