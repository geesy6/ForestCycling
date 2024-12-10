// Function to load CSV data and display it in a table
function loadCSVData(file) {
  fetch(file)
    .then((response) => response.text())
    .then((data) => {
      const csvData = data.split("\n").map((row) => row.split(","));
      const headers = csvData.shift();

      // Clear the existing table
      const resultsTable = document.getElementById("results-table");
      resultsTable.innerHTML = "";

      // Create a new table
      const table = document.createElement("table");
      const thead = document.createElement("thead");
      const tbody = document.createElement("tbody");

      // Add headers
      const headerRow = document.createElement("tr");
      headers.forEach((header) => {
        const th = document.createElement("th");
        th.textContent = header.trim(); // Trim whitespace from headers
        headerRow.appendChild(th);
      });
      thead.appendChild(headerRow);

      // Add rows
      csvData.forEach((row) => {
        if (row.length > 1) {
          // Ensure there are columns to add
          const rowElement = document.createElement("tr");
          row.forEach((cell) => {
            const td = document.createElement("td");
            td.textContent = cell.trim(); // Trim whitespace from cell data
            rowElement.appendChild(td);
          });
          tbody.appendChild(rowElement);
        }
      });

      table.appendChild(thead);
      table.appendChild(tbody);
      resultsTable.appendChild(table);
    })
    .catch((error) => console.error("Error loading CSV:", error));
}

// Function to update the results table based on the selected event type
function updateResults() {
  const eventType = document.getElementById("event-type").value;

  let file;

  switch (eventType) {
    case "little500_race":
      file = "little500_race.csv";
      break;
    case "qualifications":
      file = "qualifications.csv";
      break;
    case "team_pursuit":
      file = "team_pursuit.csv";
      break;
    case "individual_time_trials":
      file = "individual_time_trials.csv";
      break;
    default:
      return; // Exit if no valid option is selected.
  }

  loadCSVData(file); // Load the selected CSV file.
}

// Initial call to display no results when the page loads.
updateResults();
