import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { peminatanSchema, type SantriFormData } from "./peminatanSchemaTS";

const DAFTAR_KEAHLIAN = ["HTML", "CSS", "JavaScript", "React"];

export default function PeminatanFormTS() {
  const [dataSantri, setDataSantri] = useState<SantriFormData | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm<SantriFormData>({
    resolver: zodResolver(peminatanSchema),
    mode: "onChange",
    defaultValues: {
      nama: "",
      keahlian: [],
      persetujuan: false,
    },
  });

  const onSubmit = (data: SantriFormData) => {
    console.log(data);
    setDataSantri(data);
    reset();
  };

  return (
    <div className="min-h-screen bg-slate-100 py-10 px-4">
      <div className="max-w-lg mx-auto bg-white p-6 rounded-2xl shadow-md border border-slate-200">
        <h1 className="text-2xl font-bold text-slate-800 mb-1">
          Formulir Pendaftaran Divisi IT
        </h1>
        <p className="text-sm text-slate-500 mb-6">
          Sekolah IT Abu Dzar — Kelas XI RPL
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Nama Santri */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Nama Santri
            </label>
            <input
              type="text"
              {...register("nama")}
              placeholder="Masukkan nama lengkap..."
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.nama && (
              <p className="text-red-500 text-xs mt-1">{errors.nama.message}</p>
            )}
          </div>

          {/* NIS */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              NIS
            </label>
            <input
              type="number"
              {...register("nis", { valueAsNumber: true })}
              placeholder="Contoh: 101"
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.nis && (
              <p className="text-red-500 text-xs mt-1">{errors.nis.message}</p>
            )}
          </div>

          {/* Umur */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Umur
            </label>
            <input
              type="number"
              {...register("umur", { valueAsNumber: true })}
              placeholder="15 - 20 tahun"
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.umur && (
              <p className="text-red-500 text-xs mt-1">{errors.umur.message}</p>
            )}
          </div>

          {/* Pilihan Divisi */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Pilihan Divisi
            </label>
            <select
              {...register("divisi")}
              defaultValue=""
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="" disabled>
                -- Pilih Divisi Peminatan --
              </option>
              <option value="Frontend">Frontend</option>
              <option value="Backend">Backend</option>
              <option value="UI/UX">UI/UX</option>
            </select>
            {errors.divisi && (
              <p className="text-red-500 text-xs mt-1">
                {errors.divisi.message}
              </p>
            )}
          </div>

          {/* Keahlian yang Dikuasai */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Keahlian yang Dikuasai
            </label>
            <div className="grid grid-cols-2 gap-2">
              {DAFTAR_KEAHLIAN.map((skill) => (
                <label
                  key={skill}
                  className="flex items-center gap-2 text-sm text-slate-700 bg-slate-50 px-3 py-2 rounded-lg border border-slate-200 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    value={skill}
                    {...register("keahlian")}
                    className="rounded text-blue-600 focus:ring-blue-500"
                  />
                  <span>{skill}</span>
                </label>
              ))}
            </div>
            {errors.keahlian && (
              <p className="text-red-500 text-xs mt-1">
                {errors.keahlian.message}
              </p>
            )}
          </div>

          {/* Persetujuan Tata Tertib */}
          <div>
            <label className="flex items-start gap-2 text-sm text-slate-700 cursor-pointer">
              <input
                type="checkbox"
                {...register("persetujuan")}
                className="mt-1 rounded text-blue-600 focus:ring-blue-500"
              />
              <span>
                Saya menyetujui seluruh tata tertib pendaftaran divisi IT.
              </span>
            </label>
            {errors.persetujuan && (
              <p className="text-red-500 text-xs mt-1">
                {errors.persetujuan.message}
              </p>
            )}
          </div>

          {/* Tombol Submit */}
          <button
            type="submit"
            disabled={!isValid}
            className="w-full py-2.5 px-4 rounded-lg font-semibold text-sm text-white bg-blue-600 hover:bg-blue-700 disabled:bg-slate-400 disabled:cursor-not-allowed transition-colors cursor-pointer"
          >
            Kirim Pendaftaran
          </button>
        </form>

        {/* Kartu Ringkasan Pendaftaran Berhasil */}
        {dataSantri && (
          <div className="mt-6 p-4 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-900">
            <h2 className="font-bold text-base text-emerald-800 mb-2">
              Pendaftaran Berhasil!
            </h2>
            <ul className="text-sm space-y-1">
              <li>
                <strong>Nama Santri:</strong> {dataSantri.nama}
              </li>
              <li>
                <strong>NIS:</strong> {dataSantri.nis}
              </li>
              <li>
                <strong>Umur:</strong> {dataSantri.umur} tahun
              </li>
              <li>
                <strong>Pilihan Divisi:</strong> {dataSantri.divisi}
              </li>
              <li>
                <strong>Keahlian:</strong> {dataSantri.keahlian.join(", ")}
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}