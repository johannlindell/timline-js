async function fetchAllTimelinesName() {
    return fetch('/data/timelinesByName.json')
        .then((response) => response.json())
        .then((data) => data);
}

async function getTimeLines(linkName) {
    return fetchAllTimelinesName()
        .then((allTimelines) => allTimelines[linkName])
        .then((timelineByname) => {
            return fetch('/data/timelines/'+timelineByname.file)
                .then((response) => response.json())
                .then((data) => data[linkName]);
        });
}