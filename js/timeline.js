function drawTimeLine(canvas, timeline) {
    const startingPoint = getStartingPoint(canvas);
    const endingPoint = getEndingPoint(canvas);

    const startDate = new Date(timeline.startDate);
    const endDate = new Date(timeline.endDate);

    drawLine(canvas, startingPoint, endingPoint);
    drawDates(canvas, startingPoint, endingPoint, startDate, endDate);
    drawMonthsText(canvas, timeline);
    //drawYearText(canvas, timeLine);    

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

function drawMonthsText(canvas, timeLine) {
    var currentDate = new Date(timeLine.startDate);
    while (currentDate <= timeLine.endDate) {
        drawMonthText(canvas, currentDate, timeLine);
        currentDate.addMonths(1);
    }
}

function drawMonthText(canvas, currentDate, timeLine) {
    const pointOnLine = findPointOnTimeLine(currentDate, timeLine, canvas);
    const ctx = canvas.getContext('2d');
    const pixelsPerDay = getPixelsPerDay(timeLine.startDate, timeLine.endDate, getStartingPoint(canvas), getEndingPoint(canvas));

    ctx.fillText(currentDate.getMonthName(), pointOnLine.x + pixelsPerDay + 5, pointOnLine.y - 5);
}

function getDateLineHeight(date) {
    return date.getDate() == 1 ? 10 : 5;
}

function getPixelsPerDay(startDate, endDate, startingPoint, endingPoint) {
    const numberOfDays = (endDate.getTime() - startDate.getTime()) / (24 * 60 * 60 * 1000);
    const lineLength = endingPoint.x - startingPoint.x;
    return Math.floor(lineLength / numberOfDays);
}

function getStartingPoint(canvas) {
    return { x: 100, y: canvas.height / 2 };
}

function getEndingPoint(canvas) {
    const startingPoint = getStartingPoint(canvas);

    return { x: canvas.width - startingPoint.x, y: startingPoint.y };
}

function findPointOnTimeLine(dateTime, timeline, canvas) {
    const distanceToStart = (dateTime.getTime() - timeline.startDate.getTime()) / 1000;

    const secondsInADay = 24 * 60 * 60;
    const wholeDays = Math.ceil(distanceToStart / secondsInADay) - 1;

    const pixelsPerDay = getPixelsPerDay(timeline.startDate, timeline.endDate, getStartingPoint(canvas), getEndingPoint(canvas));
    const startingPoint = getStartingPoint(canvas);
    const secondsInDate = dateTime.getHours() * 60 * 60 + dateTime.getMinutes() * 60 + dateTime.getSeconds();
    const startX = startingPoint.x + pixelsPerDay * wholeDays + (secondsInDate / secondsInADay) * pixelsPerDay;

    return { x: startX, y: startingPoint.y };
}