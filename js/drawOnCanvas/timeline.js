function drawTimelines(canvas, timelines) {
    var timelineorder = 0;

    timelines.forEach(timeline => {
        drawTimeline(canvas, timeline, timelineorder, timelines)
        ++timelineorder;
    });
}

function drawTimeline(canvas, timeline, timelineorder, timelines) {
    const startingPoint = getStartingPoint(canvas, timelines, timelineorder);
    const endingPoint = getEndingPoint(canvas, timelines, timelineorder);

    const startDate = new Date(timeline.startDate);
    const endDate = new Date(timeline.endDate);

    drawLine(canvas, startingPoint, endingPoint);
    drawDates(canvas, startingPoint, endingPoint, startDate, endDate);
    drawMonthsText(canvas, timeline, startingPoint, endingPoint);
    drawHeader(canvas, timeline.name, startingPoint, timelines);
}

function drawLine(canvas, startingPoint, endingPoint) {
    const ctx = canvas.getContext('2d');

    ctx.beginPath();
    ctx.moveTo(startingPoint.x, startingPoint.y);
    ctx.lineTo(endingPoint.x, startingPoint.y);
    ctx.stroke();
}

function drawDates(canvas, startingPoint, endingPoint, startDate, endDate) {
    const pixelsPerDay = getPixelsPerDay(startDate, endDate, startingPoint, endingPoint);

    var currentDate = new Date(startDate);
    var currentDateX = startingPoint.x;
    const dateY = startingPoint.y;
    while (currentDate <= endDate) {
        drawDateLine(canvas, currentDateX, dateY, currentDate);
        drawDateText(canvas, currentDateX, dateY, currentDate);
        currentDate.addDays(1);
        currentDateX += pixelsPerDay;
    }
}

function drawDateLine(canvas, x, y, date) {
    const ctx = canvas.getContext('2d');
    const height = getDateLineHeight(date);
    var startPoint = { x: x, y: y + (date.getDate() === 1 ? -10 : 0) };
    var endingPoint = { x: x, y: y + height };
    ctx.beginPath();
    ctx.moveTo(startPoint.x, startPoint.y);
    ctx.lineTo(endingPoint.x, endingPoint.y);
    ctx.stroke();
}

function drawDateText(canvas, x, y, date) {
    const ctx = canvas.getContext('2d');
    const height = getDateLineHeight(date);
    const center = date.getDate() < 10 ? 3 : 6;
    ctx.fillText(date.getDate(), x - center, y + height + 16);
}

function drawMonthsText(canvas, timeLine, startingPoint, endingPoint) {
    var currentDate = new Date(timeLine.startDate);
    while (currentDate <= new Date(timeLine.endDate)) {
        drawMonthText(canvas, currentDate, timeLine, startingPoint, endingPoint);
        currentDate.addMonths(1);
    }
}

function drawMonthText(canvas, currentDate, timeLine, startingPoint, endingPoint) {
    const pointOnLine = findPointOnTimeLine(currentDate, timeLine, startingPoint, endingPoint);
    const ctx = canvas.getContext('2d');
    const pixelsPerDay = getPixelsPerDay(timeLine.startDate, timeLine.endDate, startingPoint, endingPoint);

    ctx.fillText(currentDate.getMonthName(), pointOnLine.x + pixelsPerDay + 5, pointOnLine.y - 5);
}

function drawHeader(canvas, header, startingPoint, timelines) {
    const ctx = canvas.getContext('2d');
    const headerFontHeight = 30;
    const fontString = 'px sans-serif';
    const fontHeight = getFontHeight(canvas, 0);
    setFont(canvas, headerFontHeight + fontString);
    const timelineCanvasHeight = canvas.height / timelines.length;

    ctx.fillText(header, startingPoint.x, (startingPoint.y - timelineCanvasHeight/2) + headerFontHeight);

    setFont(canvas, fontHeight + fontString);
}

function getDateLineHeight(date) {
    return date.getDate() == 1 ? 10 : 5;
}

function getPixelsPerDay(startDate, endDate, startingPoint, endingPoint) {
    const numberOfDays = (new Date(endDate).getTime() - new Date(startDate).getTime()) / (24 * 60 * 60 * 1000);
    const lineLength = endingPoint.x - startingPoint.x;
    return Math.floor(lineLength / numberOfDays);
}

function getStartingPoint(canvas, timelines, timelineorder) {
    const timelineCanvasHeight = canvas.height / timelines.length;
    const timelinePlacement = timelineCanvasHeight * (1/2 + timelineorder);

    return { x: 100, y: timelinePlacement };
}

function getEndingPoint(canvas, timelines, timelineorder) {
    const startingPoint = getStartingPoint(canvas, timelines, timelineorder);

    return { x: canvas.width - startingPoint.x, y: startingPoint.y };
}

function findPointOnTimeLine(dateTime, timeline, startingPoint, endingPoint) {
    const distanceToStart = (dateTime.getTime() - new Date(timeline.startDate).getTime()) / 1000;

    const secondsInADay = 24 * 60 * 60;
    const wholeDays = Math.ceil(distanceToStart / secondsInADay) - 1;

    const pixelsPerDay = getPixelsPerDay(timeline.startDate, timeline.endDate, startingPoint, endingPoint);
    const secondsInDate = dateTime.getHours() * 60 * 60 + dateTime.getMinutes() * 60 + dateTime.getSeconds();
    const startX = startingPoint.x + pixelsPerDay * wholeDays + (secondsInDate / secondsInADay) * pixelsPerDay;

    return { x: startX, y: startingPoint.y };
}