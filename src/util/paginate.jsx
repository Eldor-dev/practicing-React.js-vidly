import _ from "lodash";

export function paginate(item, pageNumber, pageSize) {
    const startNumber = (pageNumber - 1) * pageSize;
    return _(item).slice(startNumber).take(pageSize).value();
}
 
