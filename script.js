function checkMAFVisibility() {
    const has = document.getElementById("has").value;
    const daf = document.getElementById("daf").value;
    const mafContainer = document.getElementById("maf-container");
    const mafSelect = document.getElementById("maf");

    if ((has === "1" || has === "2") && (daf === "4" || daf === "5" || daf === "6")) {
        mafContainer.style.display = "block";
        // Enable MAF 105+ only if HAS is 1 and DAF is 6
        if (has === "1" && daf === "6") {
            mafSelect.innerHTML = `
                <option value="Yes">Yes</option>
                <option value="No">No</option>
                <option value="MAF 105+">MAF 105+</option>
            `;
        } else {
            mafSelect.innerHTML = `
                <option value="Yes">Yes</option>
                <option value="No">No</option>
            `;
        }
    } else {
        mafContainer.style.display = "none";
    }
}

function calculate() {
    const has = parseInt(document.getElementById("has").value);
    const daf = parseInt(document.getElementById("daf").value);
    const maf = document.getElementById("maf").value;
    const govHours = parseInt(document.getElementById("gov-hours").value);
    
    let maxHours = 0;

    // Calculate maximum allowable hours based on HAS, DAF, and MAF
    if (daf === 1) {
        maxHours = 4;
    } else if (daf === 2) {
        maxHours = 10;
    } else if (daf === 3) {
        maxHours = 25;
    } else if (daf === 4 || daf === 5 || daf === 6) {
        if (has === 1) {
            if (maf === "Yes") {
                maxHours = 84; // HAS 1, DAF 4, MAF Yes
            } else if (maf === "No") {
                maxHours = 40; // HAS 1, DAF 4, MAF No
            } else if (maf === "MAF 105+") {
                maxHours = 168; // HAS 1, DAF 6, MAF 105+
            }
        } else if (has === 2) {
            if (maf === "Yes") {
                maxHours = 84; // HAS 2, DAF 4, MAF Yes
            } else if (maf === "No") {
                maxHours = 40; // HAS 2, DAF 4, MAF No
            } else if (maf === "MAF 105+") {
                maxHours = 168; // HAS 2, DAF 6, MAF 105+
            }
        } else if (has === 3) {
            maxHours = 25; // HAS 3, DAF 4, 5, or 6
        }
    }

    // Check if government hours exceed maximum allowable hours
    if (govHours > maxHours) {
        document.getElementById("error-message").innerText = "Error: Government hours exceed the maximum allowable hours.";
        document.getElementById("error-message").style.display = "block";
        document.getElementById("results").style.display = "none";
        return; // Exit the function
    } else {
        document.getElementById("error-message").style.display = "none"; // Clear any previous error messages
    }

    let currentAllowableHours;
    if (govHours === 0) {
        currentAllowableHours = maxHours; // Set to the maximum for the calculated level
    } else {
        currentAllowableHours = Math.max(maxHours - govHours, 0);
    }

    const cfsLevel = determineCFSLevel(currentAllowableHours);

    // Check if allowable hours calculate to 0
    if (currentAllowableHours === 0) {
        document.getElementById("current-allowable-hours").innerText = "Based on the calculated allowable hours, there is no homecare eligibility and CFS payments are not applicable.";
        document.getElementById("cfs-level").innerText = `CFS Level: 0`;
    } else {
        document.getElementById("current-allowable-hours").innerText = `Current Allowable Hours: ${currentAllowableHours}`;
        document.getElementById("cfs-level").innerText = `CFS Level: ${cfsLevel}`;
    }
    
    document.getElementById("results").style.display = "block";

    // Reset location dropdown and payment amount
    document.getElementById("location").selectedIndex = 0; // Reset to "Select Location"
    document.getElementById("payment-amount").innerText = ""; // Clear payment amount
}

function determineCFSLevel(currentAllowableHours) {
    if (currentAllowableHours === 0) return "Level 0"; // Explicitly handle 0 hours
    if (currentAllowableHours >= 1 && currentAllowableHours <= 4) return "Level 1";
    if (currentAllowableHours >= 5 && currentAllowableHours <= 10) return "Level 2";
    if (currentAllowableHours >= 11 && currentAllowableHours <= 25) return "Level 3";
    if (currentAllowableHours >= 26 && currentAllowableHours <= 40) return "Level 4";
    if (currentAllowableHours >= 41 && currentAllowableHours <= 44) return "Level 5.1";
    if (currentAllowableHours >= 45 && currentAllowableHours <= 64) return "Level 5.2";
    if (currentAllowableHours >= 65 && currentAllowableHours <= 84) return "Level 5.3";
    if (currentAllowableHours >= 85 && currentAllowableHours <= 105) return "Level 6";
    if (currentAllowableHours >= 106 && currentAllowableHours <= 125) return "Level 7.1";
    if (currentAllowableHours >= 126 && currentAllowableHours <= 145) return "Level 7.2";
    if (currentAllowableHours >= 146 && currentAllowableHours <= 168) return "Level 7.3"; // Explicitly handle 146 to 168 hours
    
    return "Level 4"; // Default case if none match
}

function showPaymentAmount() {
    const cfsLevel = document.getElementById("cfs-level").innerText.split(": ")[1];
    const location = document.getElementById("location").value;
    const paymentAmounts = {
        "Slovakia": { "Level 1": 32, "Level 2": 80, "Level 3": 200, "Level 4": 319, "Level 5.1": 351, "Level 5.2": 510, "Level 5.3": 670, "Level 6": 838, "Level 7.1": 998, "Level 7.2": 1157, "Level 7.3": 1341 },
        "Greece": { "Level 1": 46, "Level 2": 114, "Level 3": 286, "Level 4": 459, "Level 5.1": 508, "Level 5.2": 739, "Level 5.3": 970, "Level 6": 1202, "Level 7.1": 1432, "Level 7.2": 1661, "Level 7.3": 1925 },
        "Antwerp": { "Level 1": 105, "Level 2": 261, "Level 3": 651, "Level 4": 1042, "Level 5.1": 1150, "Level 5.2": 1672, "Level 5.3": 2195, "Level 6": 2734, "Level 7.1": 3255, "Level 7.2": 3775, "Level 7.3": 4375 },
        "Netherlands": { "Level 1": 105, "Level 2": 261, "Level 3": 651, "Level 4": 1042, "Level 5.1": 1150, "Level 5.2": 1672, "Level 5.3": 2195, "Level 6": 2734, "Level 7.1": 3255, "Level 7.2": 3775, "Level 7.3": 4375 },
        "Hartford": { "Level 1": 124, "Level 2": 310, "Level 3": 774, "Level 4": 1240, "Level 5.1": 1368, "Level 5.2": 1989, "Level 5.3": 2610, "Level 6": 3253, "Level 7.1": 3873, "Level 7.2": 4493, "Level 7.3": 5206 },
        "Philadelphia": { "Level 1": 124, "Level 2": 310, "Level 3": 774, "Level 4": 1240, "Level 5.1": 1368, "Level 5.2": 1989, "Level 5.3": 2610, "Level 6": 3253, "Level 7.1": 3873, "Level 7.2": 4493, "Level 7.3": 5206 },
        "Detroit": { "Level 1": 124, "Level 2": 310, "Level 3": 774, "Level 4": 1240, "Level 5.1": 1368, "Level 5.2": 1989, "Level 5.3": 2610, "Level 6": 3253, "Level 7.1": 3873, "Level 7.2": 4493, "Level 7.3": 5206 },
        "Rockville": { "Level 1": 124, "Level 2": 310, "Level 3": 774, "Level 4": 1240, "Level 5.1": 1368, "Level 5.2": 1989, "Level 5.3": 2610, "Level 6": 3253, "Level 7.1": 3873, "Level 7.2": 4493, "Level 7.3": 5206 },
        "Cleveland": { "Level 1": 218, "Level 2": 545, "Level 3": 1362, "Level 4": 2179, "Level 5.1": 2398, "Level 5.2": 3487, "Level 5.3": 4576, "Level 6": 5720, "Level 7.1": 6809, "Level 7.2": 7898, "Level 7.3": 9152 },
        "Columbus": { "Level 1": 124, "Level 2": 310, "Level 3": 775, "Level 4": 1240, "Level 5.1": 1364, "Level 5.2": 1983, "Level 5.3": 2603, "Level 6": 3254, "Level 7.1": 3873, "Level 7.2": 4493, "Level 7.3": 5206 },
        "Cincinnati": { "Level 1": 181, "Level 2": 451, "Level 3": 1128, "Level 4": 1805, "Level 5.1": 1986, "Level 5.2": 2889, "Level 5.3": 3791, "Level 6": 4739, "Level 7.1": 5642, "Level 7.2": 6544, "Level 7.3": 7583 },
        "Portland": { "Level 1": 224, "Level 2": 560, "Level 3": 1401, "Level 4": 2241, "Level 5.1": 2466, "Level 5.2": 3587, "Level 5.3": 4707, "Level 6": 5883, "Level 7.1": 7003, "Level 7.2": 8123, "Level 7.3": 9413 },
        "San Francisco Regional": { "Level 1": 217, "Level 2": 543, "Level 3": 1358, "Level 4": 2172, "Level 5.1": 2390, "Level 5.2": 3475, "Level 5.3": 4561, "Level 6": 5702, "Level 7.1": 6788, "Level 7.2": 7873, "Level 7.3": 9123 },
        "San Francisco": { "Level 1": 200, "Level 2": 499, "Level 3": 1247, "Level 4": 1995, "Level 5.1": 2196, "Level 5.2": 3193, "Level 5.3": 4190, "Level 6": 5238, "Level 7.1": 6235, "Level 7.2": 7232, "Level 7.3": 8380 },
        "Brazil": { "Level 1": 19, "Level 2": 48, "Level 3": 119, "Level 4": 191, "Level 5.1": 210, "Level 5.2": 306, "Level 5.3": 401, "Level 6": 502, "Level 7.1": 597, "Level 7.2": 693, "Level 7.3": 803 },
        "Australia": { "Level 1": 386, "Level 2": 965, "Level 3": 2412, "Level 4": 3860, "Level 5.1": 4248, "Level 5.2": 6177, "Level 5.3": 8106, "Level 6": 10132, "Level 7.1": 12062, "Level 7.2": 13991, "Level 7.3": 16212 },
        "London": { "Level 1": 112, "Level 2": 280, "Level 3": 700, "Level 4": 1121, "Level 5.1": 1233, "Level 5.2": 1793, "Level 5.3": 2353, "Level 6": 2942, "Level 7.1": 3502, "Level 7.2": 4062, "Level 7.3": 4707 },
        "Brussels": { "Level 1": 87, "Level 2": 218, "Level 3": 545, "Level 4": 872, "Level 5.1": 959, "Level 5.2": 1394, "Level 5.3": 1830, "Level 6": 2288, "Level 7.1": 2724, "Level 7.2": 3159, "Level 7.3": 3661 },
        "ADIAM": { "Level 1": 162, "Level 2": 405, "Level 3": 1012, "Level 4": 1619, "Level 5.1": 1781, "Level 5.2": 2590, "Level 5.3": 3399, "Level 6": 4249, "Level 7.1": 5058, "Level 7.2": 5867, "Level 7.3": 6798 },
        "CASIP": { "Level 1": 131, "Level 2": 327, "Level 3": 818, "Level 4": 1309, "Level 5.1": 1440, "Level 5.2": 2095, "Level 5.3": 2749, "Level 6": 3437, "Level 7.1": 4091, "Level 7.2": 4746, "Level 7.3": 5499 },
        "CASIM": { "Level 1": 154, "Level 2": 384, "Level 3": 960, "Level 4": 1536, "Level 5.1": 1690, "Level 5.2": 2457, "Level 5.3": 3225, "Level 6": 4032, "Level 7.1": 4800, "Level 7.2": 5567, "Level 7.3": 6451 },
        "Croatia": { "Level 1": 51, "Level 2": 128, "Level 3": 319, "Level 4": 511, "Level 5.1": 562, "Level 5.2": 817, "Level 5.3": 1072, "Level 6": 1340, "Level 7.1": 1595, "Level 7.2": 1850, "Level 7.3": 2144 }
    };

    const cfsPayment = paymentAmounts[location] ? paymentAmounts[location][cfsLevel] : "N/A";
    const formattedPayment = formatCurrency(cfsPayment, location);
    document.getElementById("payment-amount").innerText = `Payment Amount: ${formattedPayment}`;
}

function formatCurrency(amount, location) {
    if (amount === "N/A") return amount;

    let currencySymbol;
    switch (location) {
        case "Australia":
            currencySymbol = "AUD ";
            break;
        case "London":
            currencySymbol = "GBP ";
            break;
        case "Brussels":
        case "Antwerp":
        case "Netherlands":
        case "Greece":
        case "Slovakia":
        case "Croatia":
	case "ADIAM":
	case "CASIP":
	case "CASIM":
            currencySymbol = "EUR ";
            break;
        default:
            currencySymbol = "USD ";
    }

    return currencySymbol + Number(amount).toLocaleString();
}
