function drawPeriods (canvas, timelines) {
    const ctx = canvas.getContext('2d');
    var timelineorder = 0;
    timelines.forEach(timeline => {
        drawTimelinePeriod(canvas, timeline, timelines, timelineorder);
        ++timelineorder;
    })
}

function drawTimelinePeriod(canvas, timeline, timelines, timelineorder) {
    const ctx = canvas.getContext('2d');
    const lineStartingPoint = getStartingPoint(canvas, timelines, timelineorder);
    const lineEndingPoint = getEndingPoint(canvas, timelines, timelineorder);
    timeline.periods.forEach(period => {
        const startingPoint = drawPeriod(canvas, timeline, period, lineStartingPoint, lineEndingPoint);
        drawPeriodText(canvas, period, startingPoint);
    });

    ctx.closePath();
}

function drawPeriod(canvas, timeline, period, lineStartingPoint, lineEndingPoint) {
    const startingPointOnLine = findPointOnTimeLine(new Date(period.start), timeline, lineStartingPoint, lineEndingPoint);
    const endingPointOnLine = findPointOnTimeLine(new Date(period.end), timeline, lineStartingPoint, lineEndingPoint);
    const boxWidth = endingPointOnLine.x - startingPointOnLine.x;;

    const fontHeight = getFontHeight(canvas, true);
    const boxHeight = fontHeight + 10;
    const startingPoint = {
        x: startingPointOnLine.x,
        y: startingPointOnLine.y +
            (period.placement.isUp ? - 1 : 1) * period.placement.distance +
            (period.placement.isUp ? -fontHeight : fontHeight)
    };

    const ctx = canvas.getContext('2d');
    ctx.fillStyle = period.backgroundColor;
    ctx.fillRect(startingPoint.x, startingPoint.y, boxWidth, boxHeight);

    return startingPoint;
}

function drawPeriodText(canvas, period, boxStartPoint) {
    const ctx = canvas.getContext('2d');
    const startPoint = { x: boxStartPoint.x + 10, y: boxStartPoint.y + 21 };
    ctx.fillStyle = period.description.color;
    ctx.fillText(period.description.textlines[0], startPoint.x, startPoint.y);
}