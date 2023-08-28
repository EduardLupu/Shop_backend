/**
 * Get projection fields from select string
 * If includeMongoId is true, the _id field will be included in the projection
 *
 * @param select
 * @param includeMongoId
 */
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