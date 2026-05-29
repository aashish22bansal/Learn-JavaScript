const exactInput = document.getElementById("exactSearch");
const fuzzyInput = document.getElementById("fuzzySearch");
const tableRows = document.querySelectorAll("#dataTable tbody tr");

const locationCheckboxes = document.querySelectorAll(".locationFilter");
const dataRoleToggle = document.getElementById("dataRoleToggle");

function getSelectedLocations() {
    return Array.from(locationCheckboxes)
        .filter(cb => cb.checked)
        .map(cb => cb.value);
}

function searchTable() {
    const exactValue = exactInput.value.trim().toLowerCase();
    const fuzzyValue = fuzzyInput.value.trim().toLowerCase();
    const selectedLocations = getSelectedLocations();
    const dataOnly = dataRoleToggle.checked;

    tableRows.forEach(row => {
        const cells = row.querySelectorAll("td");
        const name = cells[0].innerText.toLowerCase();
        const role = cells[1].innerText.toLowerCase();
        const location = cells[2].innerText.toLowerCase();
        const rowText = row.innerText.toLowerCase();

        // Exact match
        let exactMatch = true;
        if (exactValue) {
            exactMatch = rowText.split(/\s+/).includes(exactValue);
        }

        // Fuzzy match
        let fuzzyMatch = true;
        if (fuzzyValue) {
            fuzzyMatch = rowText.includes(fuzzyValue);
        }

        // Checkbox (multi-select)
        let locationMatch = true;
        if (selectedLocations.length > 0) {
            locationMatch = selectedLocations.includes(location);
        }

        // Toggle (single filter)
        let dataRoleMatch = true;
        if (dataOnly) {
            dataRoleMatch = role.includes("data");
        }

        row.style.display =
            exactMatch &&
            fuzzyMatch &&
            locationMatch &&
            dataRoleMatch
                ? ""
                : "none";
    });
}

// Event bindings
exactInput.addEventListener("input", searchTable);
fuzzyInput.addEventListener("input", searchTable);
locationCheckboxes.forEach(cb => cb.addEventListener("change", searchTable));
dataRoleToggle.addEventListener("change", searchTable);
