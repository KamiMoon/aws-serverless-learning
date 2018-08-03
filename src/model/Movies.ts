import { embed } from "@aws/dynamodb-data-mapper";
import {
    attribute,
    hashKey,
    rangeKey,
    table
} from "@aws/dynamodb-data-mapper-annotations";
import { Info } from "src/model/Info";

@table("Movies")
export class Movies {
    @hashKey()
    year: number;

    @rangeKey()
    title: string;

    @attribute({ memberType: embed(Info) })
    info?: Info;
}
