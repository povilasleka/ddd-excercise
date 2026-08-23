import { BaseEntity } from '../shared/base-entity.ts';
import type { PlaybackPosition } from './revision-item.value-objects.ts';

export interface CreateRevisionItemProps {
  playbackPosition: PlaybackPosition;
  comment: string;
}

export interface RehydrateRevisionItemProps {
  id: string;
  playbackPosition: PlaybackPosition;
  comment: string;
  createdAt: Date;
  updatedAt: Date;
}

export class RevisionItem extends BaseEntity {
  private constructor(
    id: string,
    private readonly playbackPosition: PlaybackPosition,
    private readonly comment: string,
    createdAt?: Date,
    updatedAt?: Date,
  ) {
    super(id, createdAt, updatedAt);
  }

  static create(props: CreateRevisionItemProps): RevisionItem {
    return new RevisionItem(crypto.randomUUID(), props.playbackPosition, props.comment);
  }

  static rehydrate(props: RehydrateRevisionItemProps): RevisionItem {
    return new RevisionItem(
      props.id,
      props.playbackPosition,
      props.comment,
      props.createdAt,
      props.updatedAt,
    );
  }

  getPlaybackPosition = () => this.playbackPosition;
  getComment = () => this.comment;
}
