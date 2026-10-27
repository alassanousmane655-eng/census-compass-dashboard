import { z } from "zod";
import { NOTICE_VERSION, INTERESTS } from "./reference";
import { profileSchema, residenceSchema, activitySchema } from "@/features/census/validation";
export const noticeSchema = z.object({
  version: z.literal(NOTICE_VERSION),
  acknowledgedAt: z.string().datetime(),
  acceptsCentreContact: z.boolean(),
});
export const participationSchema = z.object({
  interested: z.boolean(),
  interests: z
    .array(z.string().refine((v) => INTERESTS.some((i) => i.value === v)))
    .max(INTERESTS.length),
});
export const submissionSchema = z.object({
  notice: noticeSchema,
  profile: profileSchema,
  residence: residenceSchema,
  activity: activitySchema,
  participation: participationSchema,
});
export const draftSchema = z.object({
  step: z.number().int().min(0).max(5),
  notice: z
    .object({ version: z.string(), acknowledgedAt: z.string(), acceptsCentreContact: z.boolean() })
    .optional(),
  profile: z
    .object({
      firstName: z.string().optional(),
      lastName: z.string().optional(),
      ageBand: z.string().optional(),
      contactType: z.enum(["telephone", "email"]).optional(),
      contact: z.string().optional(),
    })
    .optional(),
  residence: z
    .object({
      regionCode: z.string().optional(),
      departmentCode: z.string().optional(),
      arrondissementCode: z.string().optional(),
      localite: z.string().optional(),
    })
    .optional(),
  activity: z
    .object({
      situation: z.string().optional(),
      sectorCode: z.string().optional(),
      profession: z.string().optional(),
    })
    .optional(),
  participation: participationSchema.optional(),
  savedAt: z.string().optional(),
});
