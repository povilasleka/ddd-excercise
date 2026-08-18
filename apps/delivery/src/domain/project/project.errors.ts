import { BaseError } from "../shared/base-error.ts"

export class RevisionNotFoundError extends BaseError {
    constructor(itemId: string) {
        super(
            `Revision with provided id (${itemId}) not found`,
            'REVISION_NOT_FOUND',
        )
    }
}