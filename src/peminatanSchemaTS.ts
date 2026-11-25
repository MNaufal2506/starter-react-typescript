import { z } from "zod";

export const peminatanSchema = z.object({
  nama: z
    .string()
    .min(3, "Nama santri wajib diisi minimal 3 karakter"),

  nis: z
    .number()
    .min(100, "NIS tidak valid"),

  umur: z
    .number()
    .min(15, "Umur minimal 15 tahun")
    .max(20, "Umur maksimal 20 tahun"),

  divisi: z.enum(["Frontend", "Backend", "UI/UX"]),

  keahlian: z
    .array(z.string())
    .min(1, "Wajib mencentang minimal 1 keahlian"),

  persetujuan: z
    .boolean()
    .refine((val) => val === true, {
      message: "Wajib menyetujui tata tertib",
    }),
});

export type SantriFormData = z.infer<typeof peminatanSchema>;