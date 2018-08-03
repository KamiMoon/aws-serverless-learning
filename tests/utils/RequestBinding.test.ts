import { bindRequest } from "src/utils/RequestBinding";
import { Movies } from "src/model/Movies";

import { validate } from "class-validator";
import { plainToClass } from "class-transformer";
import { transformAndValidate } from "class-transformer-validator";

function getProperty<T, K extends keyof T>(o: T, name: K) {
    return o[name];
}

describe("RequestBinding", () => {
    test("decodes based on schema", () => {
        const input = {
            title: "The%20Big%20New%20Movie",
            year: "2015",
            pay: "20.56",
            isFun: "true",
            isDead: "false"
        };

        const schema = {
            title: "string",
            year: "int",
            pay: "float",
            isFun: "boolean",
            isDead: "boolean"
        };

        const result = bindRequest(schema, input);

        const expected = {
            title: "The Big New Movie",
            year: 2015,
            pay: 20.56,
            isFun: true,
            isDead: false
        };

        expect(result).toEqual(expected);
    });

    test("can transform and validate seperately", () => {
        const data = {
            title: "The Big New Movie",
            year: "2015"
        };

        const movie = plainToClass(Movies, data);

        return validate(movie, { validationError: { target: false } }).then(
            errors => {
                // errors is an array of validation errors
                // if (errors.length > 0) {
                //     console.log("validation failed. errors: ", errors);
                // } else {
                //     console.log("validation succeed");
                // }

                console.log(errors);

                errors.forEach(e => {
                    console.log(e);
                });

                expect(errors.length).toEqual(1);
            }
        );
    });

    test("can transform and validate together", () => {
        const data = {
            title: "The Big New Movie",
            year: "2015"
        };

        return transformAndValidate(Movies, data, {
            validator: {
                validationError: { target: false }
            }
        })
            .then((userObject: Movies) => {
                // now you can access all your class prototype method
                console.log(`Hello ${userObject.title}`); // prints "Hello World!" on console
            })
            .catch(errors => {
                // here you can handle error on transformation (invalid JSON)
                // or validation error (e.g. invalid email property)

                expect(errors).toEqual([
                    {
                        children: [],
                        constraints: {
                            isInt: "year must be an integer number"
                        },
                        property: "year",
                        value: "2015"
                    }
                ]);
            });
    });
});
