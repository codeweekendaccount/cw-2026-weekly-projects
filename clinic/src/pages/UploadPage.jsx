import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import { chunkText } from "../services/chunking";
import { generateEmbeddings } from "../services/embeddings";
import { supabase } from "../services/config";
import { toast } from "react-toastify";

const inputClass =
  "mt-1.5 block w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20";

export default function UploadPage() {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    try {
      const chunks = await chunkText(input);
      const vectors = await generateEmbeddings(chunks);

      const dataToStore = chunks.map((ch, idx) => {
        return {
          content: ch,
          embedding: vectors[idx].embedding,
        };
      });

      const { error } = await supabase.from("clinic_info").insert(dataToStore);
      if (error) {
        throw error;
      }

      toast.success("Knowledge added successfully");
      setInput("");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <main className="px-4 py-12">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 max-w-2xl">
            <Link
              to="/"
              className="mb-6 inline-flex items-center gap-1.5 text-sm text-slate-500 transition-colors hover:text-teal-600"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to homepage
            </Link>
            <h1 className="mb-4 text-3xl font-semibold text-slate-900 sm:text-4xl">
              Upload Clinic Information
            </h1>
            <p className="text-slate-500">
              Add FAQs, service descriptions, doctor profiles, and policies that
              power the RAG chatbot. This page collects content — wire it to
              your embedding pipeline when ready.
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-[1fr_340px]">
            <form
              onSubmit={handleSubmit}
              className="rounded-2xl border border-slate-200 bg-white p-8"
            >
              <section className="mb-10 border-b border-slate-200 pb-10">
                <h2 className="mb-2 text-xl font-semibold text-slate-900">
                  SmartClinic Information
                </h2>
                <p className="mb-5 text-sm text-slate-500">
                  Upload your clinic information, this will be used for chatbot
                  knowledge.
                </p>
                <label className="block text-sm font-medium text-slate-700">
                  Document Text
                  <textarea
                    rows={8}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Paste clinic brochure, policy document, or FAQ page content here…"
                    className={inputClass}
                  />
                </label>
              </section>
              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-full bg-teal-600 py-3.5 text-base font-semibold text-white transition-colors hover:bg-teal-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading ? "Processing..." : "Add to Knowledge Base"}
              </button>
            </form>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
