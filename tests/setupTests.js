jest.mock("src/utils/AWSDocClient", () => {
    function buildPromiseObj(obj) {
        return {
            promise: () => {
                return new Promise((resolve, reject) => {
                    resolve(obj);
                });
            }
        };
    }

    return {
        put: obj => {
            return buildPromiseObj(obj);
        },
        get: obj => {
            return buildPromiseObj(obj);
        },
        query: obj => {
            return buildPromiseObj(obj);
        },
        update: obj => {
            return buildPromiseObj(obj);
        },
        delete: obj => {
            return buildPromiseObj(obj);
        }
    };
});
