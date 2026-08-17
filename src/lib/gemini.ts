import "server-only";

import { GoogleGenAI } from "@google/genai";

function requireEnvironmentValue(value: string | undefined, name: string) {
  if (!value) {
    throw new Error(`Missing required server environment variable: ${name}`);
  }

  return value;
}

const project = process.env.GOOGLE_CLOUD_PROJECT || "shield-zabnix";
const location = process.env.GOOGLE_CLOUD_LOCATION || "global";
export const GEMINI_MODEL = process.env.GEMINI_MODEL || "gemini-2.5-flash";

export function getGeminiClient() {
  return new GoogleGenAI({
    vertexai: true,
    project: requireEnvironmentValue(project, "GOOGLE_CLOUD_PROJECT"),
    location,
    apiVersion: "v1",
  });
}
