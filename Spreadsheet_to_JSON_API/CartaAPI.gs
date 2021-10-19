const DEFAULT_SHEET_NAME = 'carta_entrantes'
const DEFAULT_LIMIT = 10;

function getSheetNameCarta(e) {
    if ('sheet' in e.parameters) {
        let sheetName = e.parameters['sheet'][0];
        if (sheetName) {
            return sheetName;
        }
    }
    return DEFAULT_SHEET_NAME;
}

function doGetCarta(e) {
    let sheetName = getSheetNameCarta(e);
    var dataObj = extractData(e, sheetName);

    const pagination = setPaginationData(e, dataObj);

    const myData = dataObj.splice(pagination.init, pagination.limit);

    return outResourceWithPagination('OK', myData, pagination);
}