function extractData(e, sheetName) {
    const ss = SpreadsheetApp.openById(SHEETID);
    const sheet = ss.getSheetByName(sheetName);
    const rows = sheet.getDataRange().getValues();
    const headings = rows[0].map(heading => {
        return heading.toString().toLowerCase();
    })
    const data = rows.slice(1);
    let dataObj = makeObj(data, headings);
    return dataObj;
}

function makeObj(data, headings) {
    const temp1 = data.map((arr) => {
        const obj = {};
        headings.forEach((heading, index) => {
            if (arr[index] === 'null') {
                obj[heading] = null;
            } else {
                obj[heading] = arr[index];
            }
        })
        return obj;
    })
    return temp1;
}
