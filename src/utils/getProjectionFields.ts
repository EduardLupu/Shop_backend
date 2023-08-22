
export function getProjectionFields(select: string | undefined, includeMongoId: boolean = false) {
    const projection: any = {};
    if (!includeMongoId) {
        projection['_id'] = 0;
    }
    if (select) {
        const fields = select.split(',');
        fields.forEach((field: string) => {
            projection[field] = 1;
        });
    }
    return projection;
}