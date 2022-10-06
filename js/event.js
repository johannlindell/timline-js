function drawEvents(canvas, timeline) {
    const startDate = timeline.startDate;
    const endDate = timeline.endDate;
    const events = timeline.events;
    const ctx = canvas.getContext('2d');

    events.forEach(event => {
        const endPoint = drawEventLine(canvas, event, timeline);
        const descriptionWidth = Math.ceil(
            ctx.measureText(getLongestStringInArray(event.description.textlines, event.date.toLocaleDateString('sv-se')))
                .width
        ) + 40;
        const boxStartPoint = drawEventBox(canvas, event, endPoint, descriptionWidth);
        console.log(boxStartPoint);
        printEventContent(canvas, event, boxStartPoint, descriptionWidth);
    });
    ctx.closePath();
}

function getEventFont() {
    return { size: 20, style: "Arial" };
}

function drawEventLine(canvas, event, timeLine) {
    const pointOnTimeLine = findPointOnTimeLine(event.date, timeLine, canvas);
    console.log("Hungry Hippps", event.date, timeLine, canvas, pointOnTimeLine.y);
    const ctx = canvas.getContext('2d');
    console.log(event.placement.isUp, event.placement.distance, pointOnTimeLine.y + (event.placement.isUp ? -1 : 1) * event.placement.distance);

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
    ctx.fillText(event.date.toLocaleDateString('sv-se'), dateStartPoint.x, dateStartPoint.y);

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