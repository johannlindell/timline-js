function getTimeLines() {
    return {
        OffertaRefills:
        {
            name: "Offerta refills",
            startDate: new Date(2022, 0, 1, 0, 0, 0),
            endDate: new Date(2022, 2, 1, 0, 0, 0),
            events: [
                {
                    date: new Date(2022, 0, 15, 08, 13, 33),
                    description: {
                        textlines: [
                            "Order Bas"
                        ]
                    },
                    placement: {
                        isUp: true,
                        distance: 70
                    },
                    styles: {
                        textColor: "#369636",
                        backgroundColor: "green"
                    }
                },
                {
                    date: new Date(2022, 1, 15, 03, 0, 0),
                    description: {
                        textlines: [
                            "Invoice created",
                            "For Bas",
                            "Periods:",
                            "2022-01-15 - 2022-02-14 Bas 100% discount",
                            "2022-02-15 - 2022-02-28 Bas",
                        ]
                    },
                    placement: {
                        isUp: true,
                        distance: 70
                    },
                    styles: {
                        textColor: "#369636",
                        backgroundColor: "green"
                    }
                }
            ],
            periods: [
                {
                    start: new Date(2022, 0, 15, 08, 13, 33),
                    end: new Date(2022, 1, 14, 23, 59, 59),
                    description: {
                        textlines: [
                            "Free trial period"
                        ],
                        color: "#369636"
                    },
                    placement: {
                        isUp: true,
                        distance: 30
                    },
                    backgroundColor: "lightgrey",
                }
            ]
        }
    }
}

function getTimeLine(timeLine) {
    const timeLines = getTimeLines();
    return timeLines[timeLine];
}