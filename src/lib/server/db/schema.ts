
import { pgTable, serial, text, integer, timestamp, doublePrecision, pgEnum } from 'drizzle-orm/pg-core';

export const emotionEnum = pgEnum('emotion', ['angry', 'fear', 'neutral', 'sad', 'disgust', 'happy', 'surprise']);
export const user = pgTable('user', {
    id: text('id').primaryKey(),
    age: integer('age'),
    username: text('username').notNull().unique(),
    passwordHash: text('password_hash').notNull()
});

export const session = pgTable("session", {
    id: text('id').primaryKey(),
    userId: text('user_id').notNull().references(() => user.id),
    expiresAt: timestamp('expires_at', { withTimezone: true, mode: 'date' }).notNull()
});

export const read = pgTable('read', {
    id: serial('id').primaryKey(),
    temp: doublePrecision('temp'),
    humid: doublePrecision('humid'),
    time: timestamp('time').defaultNow()
});

export const morale = pgTable('morale', {
    id: serial('id').primaryKey(),
    anger: doublePrecision('angry'),
    fear: doublePrecision('fear'),
    neutral: doublePrecision('neutral'),
    sad: doublePrecision('sad'),
    disgust: doublePrecision('disgust'),
    happy: doublePrecision('happy'),
    surprise: doublePrecision('surprise'),
    dominantEmotion: emotionEnum("dominant_emotion"),
    time: timestamp('time').defaultNow()
});

export type Session = typeof session.$inferSelect;

export type User = typeof user.$inferSelect;

export type Read = typeof read.$inferSelect;

export type Morale = typeof morale.$inferSelect;