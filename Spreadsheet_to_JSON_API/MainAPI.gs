const SHEETID = '{YOUR_SHEET_ID}';

function getSheetName(e) {
    if ('sheet' in e.parameters) {
        let sheetName = e.parameters['sheet'][0];
        if (sheetName) {
            return sheetName;
        }
    }
    return null;
}

function doGet(e) {
    let sheetName = getSheetName(e);

    if (sheetName === null) {
        return errorOutResource("ERROR", "Missing sheet name");
    }

    if (sheetName.includes("carta")) {
        return doGetCarta(e);
    }

}