function getInit(e, total) {
    if ('init' in e.parameters) {
        let init = Number(e.parameters['init'][0]);
        if (init && init < total && init > 0) {
            return init;
        }
    }
    return 0;
}

function getLimit(e, total) {
    if ('limit' in e.parameters) {
        let limit = Number(e.parameters['limit'][0]);
        if (limit && limit > 0) {
            if (total < limit)
                return total;
            return limit;
        }
    }
    return DEFAULT_LIMIT;
}

function getRelativeUrl(e, pagination) {
    let sheetName = getSheetName(e);

    var url = `?sheet=${sheetName}`;

    return url;
}

function getPagination(e, total) {
    return {
        init: getInit(e, total),
        limit: getLimit(e, total),
        total: total,
        totalPages: null,
        page: null,
        links: null,
    };
}

function setPaginationData(e, dataObj) {
    var pagination = getPagination(e, dataObj.length);
    let hasNext = true;
    let hasPrevious = true;
    // Check the limit requested is higher than the total of items
    if (pagination.total < pagination.limit) {
        hasNext = false;
    }
    // Check if we are on the last page to disable setting the 'next' attribute
    if (pagination.init + pagination.limit >= pagination.total) {
        hasNext = false;
    }
    // Check if we are on the first page to disable setting the 'previous' attribute
    if (pagination.init - pagination.limit < 0) {
        hasPrevious = false;
    }
    pagination.totalPages = Math.ceil(dataObj.length / pagination.limit);
    pagination.page = Math.ceil((pagination.init - 1) / pagination.limit) + 1;

    let url = getRelativeUrl(e, pagination);

    let nextInit = pagination.init + pagination.limit;
    let previousInit = pagination.init - pagination.limit;
    let fisrtInit = 0;
    let lastInit = pagination.total - pagination.limit;
    let links = {
        self: url + `&init=${pagination.init}&limit=${pagination.limit}`,
        first: url + `&init=${fisrtInit}&limit=${pagination.limit}`,
        last: url + `&init=${lastInit}&limit=${pagination.limit}`,
    }
    if (hasNext) {
        links.next = url + `&init=${nextInit}&limit=${pagination.limit}`;
    }
    if (hasPrevious) {
        links.previous = url + `&init=${previousInit}&limit=${pagination.limit}`;
    }
    pagination.links = links;
    return pagination;
}
