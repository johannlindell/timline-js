function listTimelines() {
    fetchAllTimelinesName()
        .then((allTimelines) => {
            populateTimelinesMenu(allTimelines);
        });
}

function populateTimelinesMenu(allTimelines) {
    const htmlElementLinks =  buildLinkElements(allTimelines);
    presentElements(htmlElementLinks);
}

function buildLinkElements(allTimelines) {
    var htmlElementLinks = [];
    for(const [key, value] of Object.entries(allTimelines)) {
        htmlElementLinks.push(buildHtmlTimelineLink(value.linkName, value.file));
    }
    return htmlElementLinks;
}

function buildHtmlTimelineLink(linkName, file) {
    const linkDiv = document.createElement('div');
    const linkText = document.createTextNode(linkName);
    linkDiv.appendChild(linkText);
    
    linkDiv.onclick = function() { goToTimeline(linkName); };

    return linkDiv;
}

function presentElements(htmlElementLinks) {
    const timelineslist = document.getElementById('timelineslist');
    htmlElementLinks.forEach(element => {
        timelineslist.appendChild(element);
    });
}