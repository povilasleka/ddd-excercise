import { BaseError } from "../shared/base-error.ts"

export class MediaAssetNotFoundError extends BaseError {
    constructor(itemId: string) {
        super(
            `Media asset with provided id (${itemId}) not found`,
            'MEDIA_ASSET_NOT_FOUND',
        )
    }
}

export class RevisionItemNotFoundError extends BaseError {
    constructor(itemId: string) {
        super(
            `Revision item with provided id (${itemId}) not found`,
            'REVISION_ITEM_NOT_FOUND',
        )
    }
}