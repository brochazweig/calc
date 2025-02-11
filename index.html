<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Online Calculator</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 20px;
            padding: 20px;
            border: 1px solid #ccc;
            border-radius: 5px;
            max-width: 600px;
        }
        input, select {
            margin-bottom: 10px;
            padding: 10px;
            width: 100%;
        }
        button {
            padding: 10px;
            background-color: #4CAF50;
            color: white;
            border: none;
            cursor: pointer;
        }
        button:hover {
            background-color: #45a049;
        }
        .result {
            margin-top: 20px;
            font-weight: bold;
        }
    </style>
</head>
<body>

<h2>Calculate CFS Level and Earnings</h2>

<label for="location">Select Location:</label>
<select id="location">
    <option value="Slovakia">Slovakia</option>
    <option value="Greece">Greece</option>
    <option value="Antwerp">Antwerp</option>
    <option value="Netherlands">Netherlands</option>
    <option value="Hartford">Hartford</option>
    <option value="Philadelphia">Philadelphia</option>
    <option value="Detroit">Detroit</option>
    <option value="Rockville">Rockville</option>
    <option value="Cleveland">Cleveland</option>
    <option value="Columbus">Columbus</option>
    <option value="Cincinnati">Cincinnati</option>
    <option value="Portland">Portland</option>
    <option value="San Francisco Regional">San Francisco Regional</option>
    <option value="San Francisco">San Francisco</option>
    <option value="Brazil">Brazil</option>
    <option value="Australia">Australia</option>
    <option value="London">London</option>
    <option value="Brussels">Brussels</option>
    <option value="ADIAM">ADIAM</option>
    <option value="CASIP">CASIP</option>
    <option value="CASIM">CASIM</option>
    <option value="Croatia">Croatia</option>
</select>

<label for="has">Enter HAS:</label>
<select id="has">
    <option value="1">1</option>
    <option value="2">2</option>
    <option value="3">3</option>
</select>

<label for="daf">Enter DAF:</label>
<select id="daf">
    <option value="1">1</option>
    <option value="2">2</option>
    <option value="3">3</option>
    <option value="4">4</option>
    <option value="5">5</option>
    <option value="6">6</option>
</select>

<label for="maf">Enter MAF:</label>
<select id="maf">
    <option value="Yes">Yes</option>
    <option value="No">No</option>
    <option value="MAF 105+">MAF 105+</option>
</select>

<label for="govHours">Enter Government Hours (0 to 168):</label>
<input type="number" id="govHours" min="0" max="168">

<button onclick="calculate()">Calculate</button>

<div class="result" id="result"></div>

<script>
function calculateMaxHours(has, daf, maf) {
    if (has >= 1 && has <= 3 && daf == 1) return 4;
    else if (has >= 1 && has <= 3 && daf == 2) return 10;
    else if (has >= 1 && has <= 3 && daf == 3) return 25;
    else if (has == 3 && (daf == 4 || daf == 5 || daf == 6)) return 25;
    else if (has <= 2 && daf == 4) return maf === "Yes" ? 84 : 40;
    else if (has <= 2 && daf == 5) return maf === "Yes" ? 105 : 40;
    else if (has == 1 && daf == 6) {
        if (maf === "Yes") return 105;
        else if (maf === "MAF 105+") return 168;
        else return 40;
    }
    return 0;
}

function determineCFSLevel(currentAllowableHours, maf) {
    if (currentAllowableHours < 4) return 1;
    else if (currentAllowableHours < 10) return 2;
    else if (currentAllowableHours < 25) return 3;
    else if (currentAllowableHours < 40) return 4;
    else if (maf === "Yes" && currentAllowableHours < 44) return 5.1;
    else if (maf === "Yes" && currentAllowableHours < 64) return 5.2;
    else if (maf === "Yes" && currentAllowableHours < 84) return 5.3;
    else if (maf === "Yes" && currentAllowableHours >= 84) return 6;
    else if (maf === "MAF 105+" && currentAllowableHours < 125) return 7.1;
    else if (maf === "MAF 105+" && currentAllowableHours < 145) return 7.2;
    else if (maf === "MAF 105+" && currentAllowableHours >= 145) return 7.3;
    return 0;
}

function calculate() {
    const location = document.getElementById("location").value;
    const has = parseInt(document.getElementById("has").value);
    const daf = parseInt(document.getElementById("daf").value);
    const maf = document.getElementById("maf").value;
    const governmentHours = parseInt(document.getElementById("govHours").value);

    if (isNaN(governmentHours) || governmentHours < 0 || governmentHours > 168) {
        alert("Invalid government hours. Please enter a value between 0 and 168.");
        return;
    }

    const maxHours = calculateMaxHours(has, daf, maf);
    const currentAllowableHours = maxHours - governmentHours;

    // Check for negative current allowable hours
    if (currentAllowableHours < 0) {
        document.getElementById("result").innerHTML = "Please review your entries.";
        return;
    }

    const cfsLevel = determineCFSLevel(currentAllowableHours, maf);

    const earningStructure = {
        "Slovakia": 10, "Greece": 12, "Antwerp": 15, "Netherlands": 14,
        "Hartford": 16, "Philadelphia": 18, "Detroit": 20, "Rockville": 22,
        "Cleveland": 19, "Columbus": 17, "Cincinnati": 15, "Portland": 20,
        "San Francisco Regional": 25, "San Francisco": 30, "Brazil": 11,
        "Australia": 28, "London": 24, "Brussels": 23, "ADIAM": 26,
        "CASIP": 21, "CASIM": 22, "Croatia": 13
    };

    const amountEarned = earningStructure[location] ? earningStructure[location] * currentAllowableHours : 0;

    // Display the result without currency marker
    document.getElementById("result").innerHTML = `
        Current Allowable Hours: ${currentAllowableHours}<br>
        CFS Level: ${cfsLevel}<br>
        Amount Earned in ${location}: ${amountEarned.toFixed(2)}
    `;
}
</script>

</body>
</html>
