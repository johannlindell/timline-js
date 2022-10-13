function createPng() {
    const canvas = getCanvas();
    return canvas.toDataURL("image/png");
}

function downloadFile() {
    const image = createPng();
    const aElement = document.createElement('a');
    aElement.setAttribute('download', getPath() + ".png");
    const href = image;
    aElement.href = href;

    aElement.setAttribute('target', '_blank');
    aElement.click();
}