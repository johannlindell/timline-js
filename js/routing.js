function goToTimeline(path) {
    location.replace(window.location.protocol + "//" + window.location.host + "/" + path);
}

function getPath() {
    return window.location.pathname.slice(1);
}