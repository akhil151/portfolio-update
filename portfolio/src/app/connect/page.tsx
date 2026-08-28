"use client";

import { useState, useRef } from "react";
import ConnectTitle from "@/components/ConnectTitle";
import { ArrowRight, Check } from "lucide-react";
import { sendEmail } from "../../utils/sendEmail";
import Footer from "@/components/Footer";

export default function Connect() {
  const formRef = useRef<HTMLFormElement>(null);
  const [selectedBudget, setSelectedBudget] = useState("500 - 1k");
  const [status, setStatus] = useState<"idle" | "sending" | "success">("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status !== "idle") return;

    setStatus("sending");
    const formData = new FormData(e.currentTarget);

    const result = await sendEmail(formData);

    if (result.success) {
      setStatus("success");
      formRef.current?.reset();
      setTimeout(() => setStatus("idle"), 5000);
    } else {
      setStatus("idle");
      alert("Submission failed. Please check your connection.");
    }
  };

  return (
    <div className="w-full min-h-screen bg-(--bg-color) flex flex-col items-center justify-between pt-16 lg:pt-24 pb-0 overflow-hidden">
      <ConnectTitle />

      <section className="mt-8 lg:mt-12 w-[90%] md:w-[60%] lg:w-[42%] flex items-center justify-center pb-16 relative">
        {/* SUCCESS OVERLAY */}
        {status === "success" && (
          <div className="absolute inset-0 z-50 bg-(--bg-color) flex flex-col items-center justify-center text-center animate-in fade-in zoom-in duration-500">
            <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mb-6">
              <Check className="text-white" size={32} />
            </div>
            <h2 className="text-3xl uppercase splineRegular tracking-tighter">
              Received.
            </h2>
            <p className="mt-2 splineLight uppercase text-xs tracking-widest text-black/60">
              I&apos;ll get back to you shortly.
            </p>
            <button
              onClick={() => setStatus("idle")}
              className="mt-8 text-xs border-b border-black uppercase splineLight cursor-pointer"
            >
              Send another message
            </button>
          </div>
        )}

        {/* CONTACT FORM */}
        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className={`w-full flex flex-col items-center justify-start py-4 px-2 transition-opacity duration-500 ${
            status !== "idle" ? "opacity-30 pointer-events-none" : "opacity-100"
          }`}
        >
          <input
            className="splineLight text-sm lg:text-base focus:outline-none tracking-tight placeholder:text-black/60 placeholder:text-xs lg:placeholder:text-sm placeholder:uppercase w-full h-10 py-3 bg-transparent border-b border-black/30 focus:border-black transition-colors"
            type="text"
            name="name"
            placeholder="Your name*"
            required
          />
          <input
            className="splineLight mt-8 text-sm lg:text-base focus:outline-none tracking-tight placeholder:text-black/60 placeholder:text-xs lg:placeholder:text-sm placeholder:uppercase w-full h-10 py-3 bg-transparent border-b border-black/30 focus:border-black transition-colors"
            type="tel"
            name="phone"
            placeholder="Phone*"
            required
          />
          <input
            className="splineLight mt-8 text-sm lg:text-base focus:outline-none tracking-tight placeholder:text-black/60 placeholder:text-xs lg:placeholder:text-sm placeholder:uppercase w-full h-10 py-3 bg-transparent border-b border-black/30 focus:border-black transition-colors"
            type="email"
            name="email"
            placeholder="Your Email*"
            required
          />
          <textarea
            name="textarea"
            rows={3}
            placeholder="How can I help you"
            className="splineLight mt-8 text-sm lg:text-base focus:outline-none tracking-tight placeholder:text-black/60 placeholder:text-xs lg:placeholder:text-sm placeholder:uppercase w-full resize-none bg-transparent border-b border-black/30 focus:border-black transition-colors"
          />

          <p className="text-xs mt-8 w-full text-black/70 splineLight tracking-wider uppercase">
            Project Budget (USD)
          </p>
          <div className="w-full mt-4 flex flex-row flex-wrap gap-6">
            {["500 - 1k", "5k - 10k", "MORE"].map((option) => (
              <label
                key={option}
                className={`splineRegular text-sm lg:text-base uppercase tracking-tight cursor-pointer pb-1 transition-all ${
                  selectedBudget === option
                    ? "font-bold border-b-2 border-black"
                    : "opacity-40 hover:opacity-70"
                }`}
              >
                <span>{option}</span>
                <input
                  type="radio"
                  name="budget"
                  value={option}
                  checked={selectedBudget === option}
                  onChange={() => setSelectedBudget(option)}
                  className="hidden"
                />
              </label>
            ))}
          </div>

          <button
            type="submit"
            disabled={status === "sending"}
            style={{ "--from-rotate": "0deg", "--to-rotate": "-45deg" } as React.CSSProperties}
            className="group relative w-full lg:w-[70%] h-12 mt-12 flex items-center justify-between uppercase splineLight tracking-tight text-base lg:text-lg transition-all duration-300 text-black cursor-pointer"
          >
            <span className="flex items-center justify-between w-full gap-2 z-10">
              {status === "sending" ? "Processing..." : "Discuss the project"}
              <ArrowRight
                size={20}
                strokeWidth={1.5}
                className="transition-transform duration-500 origin-center"
              />
            </span>
            <span className="absolute bottom-0 left-0 h-px w-full overflow-hidden">
              <span className="absolute inset-0 bg-black transition-transform duration-500 group-hover:translate-x-[110%]" />
              <span
                className="absolute inset-0 bg-black -translate-x-[110%] transition-transform group-hover:translate-x-0"
                style={{ transitionDelay: "0.1s" }}
              />
            </span>
          </button>
        </form>
      </section>

      <Footer />
    </div>
  );
}