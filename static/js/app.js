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
};

// Create function when click
function handleClick(){
    let date = d3.select("#datetime").property("value");        // Grab the datetime value from the fileter //#datetime is a selector string in D3.js, d3.select tell D3 to look for the #datetime id in HTML tags
    let filteredData = tableData; //set default filter as the original tableData
    if (date) {         //check to see a date is entered
        filteredData = filteredData.filter(row => row.datetime === date);       //Apply filter to the table data to only keep the rows where the datetime value matches the selected date
    };
    buildTable(filteredData);       //Rebuild the table using the filtered data, if no date was selected, the filtered Data will be the original tableData
}

d3.select("#filter-btn").on("click", handleClick);      // selector string 'filter-btn'

// Load the entire original data as the page loads
buildTable(tableData);
