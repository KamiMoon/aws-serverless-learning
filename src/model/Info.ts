import { attribute } from "@aws/dynamodb-data-mapper-annotations";

export class Info {
    @attribute()
    directors?: string[];

    @attribute()
    release_date?: string;

    @attribute()
    rating?: number;

    @attribute()
    genres?: string[];

    @attribute()
    image_url?: string;

    @attribute()
    plot?: string;

    @attribute()
    rank?: number;

    @attribute()
    running_time_secs?: number;

    @attribute()
    actors?: string[];
}
