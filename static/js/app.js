// import the data from data.js
const tableData = data;

// REference the HTML table using D3
var tbody = d3.select("tbody");

// Add data into table
function buildTable(data) {
    tbody.html("");         //Clear out any existing data
    data.forEach((dataRow) =>{          //loop through each object in the data and append a row and cells for eachh row value
        let row = tbody.append("tr");           //Append a row to the table body
        Object.values(dataRow).forEach((val) => {       //Loop through each row in dataRow
            let cell = row.append("td");        //Append a cell to the table row
            cell.text(val);         //Add each dataRow value as table cell          
        });    
    });
}

// Keep track of all filters
var filters = {};

// This function will replace your handleClick function
function updateFilters() {
    // Save the element, value, and id of the filter that was changed
      let date = d3.select("#datetime").property("value");
      let city = d3.select("#city").property("value");
      let state = d3.select("#state").property("value");
      let country = d3.select("#country").property("value");
      let shape =d3.select("#shape").property("value");
  
    // If a filter value was entered then add that filterId and value
    // to the filters list. Otherwise, clear that filter from the filters object
      if (date) {filters.datetime= date;} else {delete filters.datetime};
      if (city) {filters.city= city;} else {delete filters.city};
      if (state) {filters.state= state;} else {delete filters.state};
      if (country) {filters.country= country;} else {delete filters.country};
      if (shape) {filters.shape= shape;} else {delete filters.shape};
    // Call function to apply all filters and rebuild the table
    filterTable();
}

function filterTable() {

    // Set the filteredData to the tableData
    let filteredData = tableData;
    // Loop through all of the filters and keep any data that
    // matches the filter values
    Object.entries(filters).forEach(([key, value]) => {
      filteredData = filteredData.filter(row => row[key] === value);
    });
    
    // Finally, rebuild the table using the filtered Data
    buildTable(filteredData);
}

// Attach an event to listen for changes to each filter
// Hint: You'll need to select the event and what it is listening for within each set of parenthesis
d3.select("#filter-btn").on("click", updateFilters);      // selector string 'filter-btn'

// Load the entire original data as the page loads
buildTable(tableData);
