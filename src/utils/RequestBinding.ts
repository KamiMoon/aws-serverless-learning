export function bindRequest(schema, input) {
    const result = { ...input };

    for (const key in schema) {
        const value = schema[key];

        if (key in result) {
            switch (value) {
                case "int":
                    result[key] = parseInt(result[key], 10);
                    break;
                case "float":
                    result[key] = parseFloat(result[key]);
                    break;
                case "boolean":
                    // tslint:disable-next-line:triple-equals
                    result[key] = result[key] == "true";
                    break;
                case "string":
                    result[key] = decodeURIComponent(result[key]);
                    break;
                default:
                    break;
            }
        }
    }

    return result;
}
