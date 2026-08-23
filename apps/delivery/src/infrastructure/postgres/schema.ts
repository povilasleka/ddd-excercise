import { pgTable, uuid, varchar, text, timestamp, integer } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

export const timestamps = {
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
};

export const projects = pgTable('projects', {
  id: uuid('id').primaryKey().defaultRandom(),
  title: varchar('title', { length: 255 }).notNull(),
  description: text('description').notNull(),
  ...timestamps,
});

export const revisions = pgTable('revisions', {
  id: uuid('id').primaryKey().defaultRandom(),
  projectId: uuid('project_id')
    .notNull()
    .references(() => projects.id),
  version: varchar('version', { length: 10 }).notNull(),
  description: text('description').notNull(),
  ...timestamps,
});

export const revisionItems = pgTable('revision_items', {
  id: uuid('id').primaryKey().defaultRandom(),
  revisionId: uuid('revision_id')
    .notNull()
    .references(() => revisions.id),
  playbackPosition: integer('playback_position').notNull(),
  comment: text('comment').notNull(),
  ...timestamps,
});

export const projectsRelations = relations(projects, ({ many }) => ({
  revisions: many(revisions),
}));

export const revisionsRelations = relations(revisions, ({ one }) => ({
  project: one(projects, {
    fields: [revisions.projectId],
    references: [projects.id],
  }),
}));

export const revisionItemsRelations = relations(revisionItems, ({ one }) => ({
  revision: one(revisions, {
    fields: [revisionItems.revisionId],
    references: [revisions.id],
  }),
}));
