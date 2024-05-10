import "dotenv/config";
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";

import * as schema from "../db/schema";

const sql = neon(process.env.DATABASE_URL!);

const db = drizzle(sql, { schema });

const main = async () => {
  try {
    console.log("Seeding database...");

    await db.delete(schema.courses);
    await db.delete(schema.userProgress);
    await db.delete(schema.units);
    await db.delete(schema.lessons);
    await db.delete(schema.challenges);
    await db.delete(schema.challengeOptions);
    await db.delete(schema.challengeProgress);

    await db.insert(schema.courses).values([
      {
        id: 1,
        title: "Hindi",
        imageSrc: "/in.svg",
      },
      {
        id: 2,
        title: "Japanese",
        imageSrc: "/jp.svg",
      },
      {
        id: 3,
        title: "Spanish",
        imageSrc: "/es.svg",
      },
      {
        id: 4,
        title: "French",
        imageSrc: "/fr.svg",
      },
      {
        id: 5,
        title: "Croatian",
        imageSrc: "/hr.svg",
      },
      {
        id: 6,
        title: "Italian",
        imageSrc: "/it.svg",
      },
    ]);

    await db.insert(schema.units).values([
      {
        id: 1,
        courseId: 1, // Hindi
        title: "Unit 1",
        description: "Learn the basics of Hindi",
        order: 1,
      },
    ]);

    await db.insert(schema.lessons).values([
      {
        id: 1,
        unitId: 1, // Unit 1 (Learn the basic of Hindi)
        order: 1,
        title: "Nouns",
      },
      {
        id: 2,
        unitId: 1, // Unit 1 (Learn the basic of Hindi)
        order: 2,
        title: "Verbs",
      },
      {
        id: 3,
        unitId: 1, // Unit 1 (Learn the basic of Hindi)
        order: 3,
        title: "Adjectives",
      },
      {
        id: 4,
        unitId: 1, // Unit 1 (Learn the basic of Hindi)
        order: 4,
        title: "Phrases",
      },
      {
        id: 5,
        unitId: 1, // Unit 1 (Learn the basic of Hindi)
        order: 5,
        title: "Numbers",
      },
    ]);

    await db.insert(schema.challenges).values([
      {
        id: 1,
        lessonsId: 1, // Nouns
        type: "SELECT",
        order: 1,
        question: 'What is the Hindi word for "apple"?',
      },
      {
        id: 2,
        lessonsId: 1, // Nouns
        type: "SELECT",
        order: 2,
        question: 'What is the Hindi word for "banana"?',
      },
      // {
      //   id: 3,
      //   lessonsId: 1, // Nouns
      //   type: "SELECT",
      //   order: 3,
      //   question: 'What is the Hindi word for "cat"?',
      // },
      // {
      //   id: 4,
      //   lessonsId: 2, // Verbs
      //   type: "SELECT",
      //   order: 1,
      //   question: 'What is the Hindi word for "run"?',
      // },
      // {
      //   id: 5,
      //   lessonsId: 2, // Verbs
      //   type: "SELECT",
      //   order: 2,
      //   question: 'What is the Hindi word for "jump"?',
      // },
      // {
      //   id: 6,
      //   lessonsId: 2, // Verbs
      //   type: "SELECT",
      //   order: 3,
      //   question: 'What is the Hindi word for "eat"?',
      // },
      // {
      //   id: 7,
      //   lessonsId: 3, // Adjectives
      //   type: "SELECT",
      //   order: 1,
      //   question: 'What is the Hindi word for "big"?',
      // },
      // {
      //   id: 8,
      //   lessonsId: 3, // Adjectives
      //   type: "SELECT",
      //   order: 2,
      //   question: 'What is the Hindi word for "small"?',
      // },
      // {
      //   id: 9,
      //   lessonsId: 3, // Adjectives
      //   type: "SELECT",
      //   order: 3,
      //   question: 'What is the Hindi word for "fast"?',
      // },
    ]);

    await db.insert(schema.challengeOptions).values([
      {
        id: 1,
        challengeId: 1, // What is the Hindi word for "apple"?
        text: "सेब",
        correct: true,
        imageSrc: "/apple.svg",
        audioSrc: "/in_apple.mp3",
      },
      {
        id: 2,
        challengeId: 1, // What is the Hindi word for "apple"?
        text: "केला",
        correct: false,
        imageSrc: "/banana.svg",
        audioSrc: "/in_banana.mp3",
      },
      {
        id: 3,
        challengeId: 1, // What is the Hindi word for "apple"?
        text: "बिल्ली",
        correct: false,
        imageSrc: "/cat.svg",
        audioSrc: "/in_cat.mp3",
      },
      {
        id: 4,
        challengeId: 1, // What is the Hindi word for "apple"?
        text: "गाय",
        correct: false,
        imageSrc: "/cow.svg",
        audioSrc: "/in_cow.mp3",
      },
    ]);

    console.log("Seeding finished successfully!");
  } catch (error) {
    console.error(error);
    throw new Error("Failed to seed database");
  }
};

main();
