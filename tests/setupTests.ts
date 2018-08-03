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

    const mockAws = {
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

    return {
        //default key required by ts https://github.com/kulshekhar/ts-jest/issues/120
        default: mockAws
    };
});

jest.mock("src/dao/DataMapper", () => {
    const mockAws = {
        put: jest.fn().mockImplementation(obj => Promise.resolve(obj)),
        get: jest.fn().mockImplementation(obj => Promise.resolve(obj)),
        query: jest.fn().mockImplementation(mockQuery),
        update: jest.fn().mockImplementation(obj => Promise.resolve(obj)),
        delete: jest.fn().mockImplementation(obj => Promise.resolve(obj))
    };

    return {
        //default key required by ts https://github.com/kulshekhar/ts-jest/issues/120
        default: mockAws
    };
});

// async function* createAsyncIterable(syncIterable) {
//     for (const elem of syncIterable) {
//         yield elem;
//     }
// }

async function* createAsyncIterable(syncIterable) {
    for (const elem of syncIterable) {
        yield elem;
    }
}

function mockQuery(clasz, obj) {
    const asyncIterable = createAsyncIterable([obj]);
    const asyncIterator = asyncIterable[Symbol.asyncIterator]();
    return asyncIterator;
}
