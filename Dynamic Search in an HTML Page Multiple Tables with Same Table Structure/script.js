/*const exactInput = document.getElementById("exactSearch");
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
*/

class TableSearchEngine {
    constructor(wrapper) {
        this.wrapper = wrapper;
        this.tableRows = wrapper.querySelectorAll("tbody tr");

        this.exactInput = wrapper.querySelector(".exact-search");
        this.fuzzyInput = wrapper.querySelector(".fuzzy-search");
        this.locationFilters = wrapper.querySelectorAll(".location-filter");
        this.dataToggle = wrapper.querySelector(".data-toggle");

        this.bindEvents();
    }

    bindEvents() {
        this.exactInput?.addEventListener("input", () => this.applyFilters());
        this.fuzzyInput?.addEventListener("input", () => this.applyFilters());

        this.locationFilters.forEach(cb =>
            cb.addEventListener("change", () => this.applyFilters())
        );

        this.dataToggle?.addEventListener("change", () => this.applyFilters());
    }

    getSelectedLocations() {
        return Array.from(this.locationFilters)
            .filter(cb => cb.checked)
            .map(cb => cb.value.toLowerCase());
    }

    applyFilters() {
        const exact = this.exactInput?.value.trim().toLowerCase() || "";
        const fuzzy = this.fuzzyInput?.value.trim().toLowerCase() || "";
        const locations = this.getSelectedLocations();
        const dataOnly = this.dataToggle?.checked;

        this.tableRows.forEach(row => {
            const cells = row.querySelectorAll("td");
            const role = cells[1]?.innerText.toLowerCase();
            const location = cells[2]?.innerText.toLowerCase();
            const rowText = row.innerText.toLowerCase();

            let match =
                (!exact || rowText.split(/\s+/).includes(exact)) &&
                (!fuzzy || rowText.includes(fuzzy)) &&
                (locations.length === 0 || locations.includes(location)) &&
                (!dataOnly || role.includes("data"));

            row.style.display = match ? "" : "none";
        });
    }
}
