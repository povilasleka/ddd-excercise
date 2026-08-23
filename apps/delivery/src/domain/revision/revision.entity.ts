import { BaseEntity } from "../shared/base-entity.ts";
import { RevisionItem } from "../revision-item/revision-item.entity.ts";
import { MediaAssetNotFoundError, RevisionItemNotFoundError } from "./revision.errors.ts";
import type { MediaAsset } from "../media-asset/media-asset.entity.ts";
import type { PlaybackPosition } from "../revision-item/revision-item.value-objects.ts";

export interface CreateRevisionProps {
    projectId: string;
    version: string;
    description: string;
}

export interface RehydrateRevisionProps {
    id: string;
    projectId: string;
    version: string;
    description: string;
    assets: MediaAsset[];
    revisionItems: RevisionItem[];
    createdAt: Date;
    updatedAt: Date;
}

export interface AddRevisionItemProps {
    playbackPosition: PlaybackPosition;
    comment: string;
}

export class Revision extends BaseEntity {
    private constructor(
        id: string,
        private readonly projectId: string,
        private readonly version: string,
        private readonly description: string,
        private readonly assets: MediaAsset[] = [],
        private readonly revisionItems: RevisionItem[] = [],
        createdAt?: Date,
        updatedAt?: Date,
    ) {
        super(id, createdAt, updatedAt);
    }

    static create(props: CreateRevisionProps): Revision {
        return new Revision(
            crypto.randomUUID(),
            props.projectId,
            props.version,
            props.description
        );
    }

    static rehydrate(props: RehydrateRevisionProps): Revision {
        return new Revision(
            props.id,
            props.projectId,
            props.version,
            props.description,
            props.assets,
            props.revisionItems,
            props.createdAt,
            props.updatedAt,
        )
    }

    getVersion = () => this.version;
    getDescription = () => this.description;
    getProjectId = () => this.projectId;
    getAssets = (): readonly MediaAsset[] => [...this.assets];
    getRevisionItems = (): readonly RevisionItem[] => [...this.revisionItems];

    addMediaAsset(asset: MediaAsset): void {
        this.assets.push(asset);
        this.touch();
    }

    removeMediaAsset(assetId: string): void {
        const index = this.assets.findIndex(asset => asset.getId() === assetId);
        if (index === -1) {
            throw new MediaAssetNotFoundError(assetId);
        }

        this.assets.splice(index, 1);
        this.touch();
    }

    addRevisionItem(props: AddRevisionItemProps): void {
        this.revisionItems.push(RevisionItem.create({
            playbackPosition: props.playbackPosition,
            comment: props.comment,
        }));
        this.touch();
    }

    removeRevisionItem(itemId: string): void {
        const index = this.revisionItems.findIndex(item => item.getId() === itemId);
        if (index === -1) {
            throw new RevisionItemNotFoundError(itemId);
        }

        this.revisionItems.splice(index, 1);
        this.touch();
    }
}