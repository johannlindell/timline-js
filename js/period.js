function drawPeriods (canvas, timeline) {
    const ctx = canvas.getContext('2d');

    timeline.periods.forEach(period => {
        const startingPoint = drawPeriod(canvas, timeline, period);
        drawPeriodText(canvas, period, startingPoint);
    });

    ctx.closePath();
}

function drawPeriod(canvas, timeline, period) {
    const startingPointOnLine = findPointOnTimeLine(period.start, timeline, canvas);
    const endingPointOnLine = findPointOnTimeLine(period.end, timeline, canvas);
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