function filterMethods(category, clickedButton) {
    const cards = document.getElementsByClassName("method-card");
    const buttons = document.getElementsByClassName("filter-button");
    let shown = 0;

    for (let i = 0; i < cards.length; i++) {
        cards[i].style.display = "none";
    }

    if (category === "all") {
        for (let i = 0; i < cards.length; i++) {
            cards[i].style.display = "block";
            shown = shown + 1;
        }
    } else {
        const matches = document.getElementsByClassName(category);

        for (let i = 0; i < matches.length; i++) {
            matches[i].style.display = "block";
            shown = shown + 1;
        }
    }

    for (let i = 0; i < buttons.length; i++) {
        buttons[i].className = "filter-button";
    }

    clickedButton.className = "filter-button active";

    document.getElementById("filter-result").innerHTML =
        "Showing " + shown + " method(s).";
}

function calculateStudyTime() {
    const sessions = Number(document.getElementById("sessions").value);
    const focus = Number(document.getElementById("focus").value);
    const breaks = Number(document.getElementById("breaks").value);

    if (sessions < 1 || sessions > 8 || focus < 1 || breaks < 0) {
        document.getElementById("total-time").innerHTML = "Check the numbers";
        document.getElementById("time-breakdown").innerHTML =
            "Use 1 to 8 sessions, positive focus time, and non-negative breaks.";
        document.getElementById("study-timeline").innerHTML =
            "<p class='timeline-empty'>Please correct the numbers first.</p>";
        return;
    }

    const focusTotal = sessions * focus;
    const breakTotal = (sessions - 1) * breaks;
    const total = focusTotal + breakTotal;

    document.getElementById("total-time").innerHTML = total + " minutes";
    document.getElementById("time-breakdown").innerHTML =
        "Focus: " + focusTotal + " min + Breaks: " + breakTotal + " min";

    let timeline = "";

    for (let i = 1; i <= sessions; i++) {
        timeline = timeline +
            "<div class='timeline-focus'>" +
            "<span>FOCUS " + i + "</span>" +
            "<strong>" + focus + " min</strong>" +
            "</div>";

        if (i < sessions && breaks > 0) {
            timeline = timeline +
                "<div class='timeline-break'>Break " + breaks + " min</div>";
        }
    }

    document.getElementById("study-timeline").innerHTML = timeline;
}

function resetStudyTime() {
    document.getElementById("sessions").value = 4;
    document.getElementById("focus").value = 25;
    document.getElementById("breaks").value = 5;

    document.getElementById("total-time").innerHTML = "0 minutes";
    document.getElementById("time-breakdown").innerHTML =
        "Press Calculate to see your study plan.";
    document.getElementById("study-timeline").innerHTML =
        "<p class='timeline-empty'>Your focus and break cards will appear here.</p>";
}
