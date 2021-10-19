function outResourceWithPagination(status, data, pagination) {
    const temp = JSON.stringify({
        status: status,
        metadata: pagination,
        data: data,
    })
    return ContentService.createTextOutput(temp).setMimeType(ContentService.MimeType.JSON);
}

function outResource(status, data) {
    const temp = JSON.stringify({
        status: status,
        data: data,
    })
    return ContentService.createTextOutput(temp).setMimeType(ContentService.MimeType.JSON);
}

function errorOutResource(status, message) {
    const temp = JSON.stringify({
        status: status,
        message: message,
    })
    return ContentService.createTextOutput(temp).setMimeType(ContentService.MimeType.JSON);
}