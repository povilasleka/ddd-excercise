import { BaseEntity } from "../shared/base-entity.ts";
import type { Dimensions } from "./media-asset.value-objects.ts";

export interface RehydrateMediaAssetProps {
    id: string;
    url: string;
    dimensions: Dimensions;
    createdAt: Date;
    updatedAt: Date;
}

export interface CreateMediaAssetProps {
    url: string;
    dimensions: Dimensions;
}

export class MediaAsset extends BaseEntity {
    private constructor(
        id: string,
        private readonly url: string,
        private readonly dimensions: Dimensions,
        createdAt?: Date,
        updatedAt?: Date,
    ) {
        super(id, createdAt, updatedAt);
    }

    public static create(props: CreateMediaAssetProps): MediaAsset {
        return new MediaAsset(
            crypto.randomUUID(), 
            props.url, 
            props.dimensions
        );
    }

    public static rehydrate(props: RehydrateMediaAssetProps): MediaAsset {
        return new MediaAsset(
            props.id,
            props.url,
            props.dimensions,
            props.createdAt,
            props.updatedAt,
        );
    }

    getUrl = () => this.url;
    getDimensions = () => this.dimensions;
}