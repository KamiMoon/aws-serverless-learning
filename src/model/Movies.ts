import { embed } from "@aws/dynamodb-data-mapper";
import {
    attribute,
    hashKey,
    rangeKey,
    table
} from "@aws/dynamodb-data-mapper-annotations";
import { Info } from "src/model/Info";

import { Type } from "class-transformer";

import { IsInt, IsString, validate } from "class-validator";

@table("Movies")
export class Movies {
    @IsInt()
    @hashKey()
    year: number;

    @IsString()
    @rangeKey()
    title: string;

    @Type(() => Info)
    @attribute({ memberType: embed(Info) })
    info?: Info;
}
