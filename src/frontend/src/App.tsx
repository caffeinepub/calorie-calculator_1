import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  type NumerologyResult,
  calculate,
  getMeaning,
} from "@/utils/numerology";
import { Moon, Sparkles, Star } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

const cardConfigs: Array<{
  key: keyof NumerologyResult;
  label: string;
  emoji: string;
}> = [
  { key: "lifePathNumber", label: "Life Path Number", emoji: "✦" },
  { key: "destinyNumber", label: "Destiny Number", emoji: "◈" },
  { key: "soulUrgeNumber", label: "Soul Urge Number", emoji: "♾" },
  { key: "personalityNumber", label: "Personality Number", emoji: "⬡" },
  { key: "birthDayNumber", label: "Birth Day Number", emoji: "✧" },
];

export default function App() {
  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const [results, setResults] = useState<NumerologyResult | null>(null);
  const [error, setError] = useState("");

  function handleCalculate() {
    setError("");
    if (!name.trim()) {
      setError("Please enter your full name.");
      return;
    }
    if (!dob) {
      setError("Please select your date of birth.");
      return;
    }
    setResults(calculate(name.trim(), dob));
  }

  function handleReset() {
    setResults(null);
    setName("");
    setDob("");
    setError("");
  }

  const year = new Date().getFullYear();

  return (
    <div
      className="min-h-screen star-field"
      style={{ background: "oklch(0.13 0.03 280)" }}
    >
      {/* Cosmic gradient overlay */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, oklch(0.25 0.1 290 / 0.4) 0%, transparent 60%), radial-gradient(ellipse at 80% 80%, oklch(0.22 0.08 260 / 0.3) 0%, transparent 50%)",
        }}
      />

      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Header */}
        <header className="text-center pt-12 pb-6 px-4">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <div className="flex items-center justify-center gap-2 mb-3">
              <Moon
                className="text-gold w-5 h-5"
                style={{ color: "oklch(0.78 0.14 82)" }}
              />
              <span
                className="text-sm tracking-[0.3em] uppercase font-body"
                style={{ color: "oklch(0.62 0.12 82)" }}
              >
                Sacred Numerology
              </span>
              <Moon
                className="text-gold w-5 h-5 scale-x-[-1]"
                style={{ color: "oklch(0.78 0.14 82)" }}
              />
            </div>
            <h1
              className="font-display text-5xl md:text-7xl font-bold mb-3"
              style={{
                color: "oklch(0.93 0.05 80)",
                textShadow: "0 0 40px oklch(0.78 0.14 82 / 0.4)",
              }}
            >
              Cosmic Numbers
            </h1>
            <p
              className="font-body text-lg max-w-xl mx-auto"
              style={{ color: "oklch(0.72 0.05 278)" }}
            >
              Unlock the hidden language of the universe encoded within your
              birth date and name.
            </p>
          </motion.div>
        </header>

        <main className="flex-1 px-4 pb-16">
          <AnimatePresence mode="wait">
            {!results ? (
              <motion.div
                key="form"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="max-w-md mx-auto mt-8"
              >
                <div
                  className="rounded-2xl p-8"
                  style={{
                    background: "oklch(0.17 0.04 275 / 0.8)",
                    border: "1px solid oklch(0.78 0.14 82 / 0.25)",
                    boxShadow: "0 0 40px oklch(0.55 0.18 300 / 0.15)",
                    backdropFilter: "blur(12px)",
                  }}
                  data-ocid="numerology.panel"
                >
                  <div className="flex items-center gap-2 mb-6">
                    <Sparkles
                      className="w-5 h-5"
                      style={{ color: "oklch(0.78 0.14 82)" }}
                    />
                    <h2
                      className="font-display text-xl"
                      style={{ color: "oklch(0.93 0.05 80)" }}
                    >
                      Enter Your Details
                    </h2>
                  </div>

                  <div className="space-y-5">
                    <div className="space-y-2">
                      <Label
                        htmlFor="full-name"
                        className="font-body text-sm tracking-wide"
                        style={{ color: "oklch(0.78 0.14 82)" }}
                      >
                        Full Name
                      </Label>
                      <Input
                        id="full-name"
                        type="text"
                        placeholder="e.g. Amelia Rose Carter"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        onKeyDown={(e) =>
                          e.key === "Enter" && handleCalculate()
                        }
                        className="font-body text-base"
                        style={{
                          background: "oklch(0.13 0.03 280 / 0.8)",
                          border: "1px solid oklch(0.35 0.06 280)",
                          color: "oklch(0.93 0.02 280)",
                        }}
                        data-ocid="numerology.input"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label
                        htmlFor="dob"
                        className="font-body text-sm tracking-wide"
                        style={{ color: "oklch(0.78 0.14 82)" }}
                      >
                        Date of Birth
                      </Label>
                      <Input
                        id="dob"
                        type="date"
                        value={dob}
                        onChange={(e) => setDob(e.target.value)}
                        className="font-body text-base"
                        style={
                          {
                            background: "oklch(0.13 0.03 280 / 0.8)",
                            border: "1px solid oklch(0.35 0.06 280)",
                            color: "oklch(0.93 0.02 280)",
                            colorScheme: "dark",
                          } as React.CSSProperties
                        }
                        data-ocid="numerology.select"
                      />
                    </div>

                    {error && (
                      <p
                        className="text-sm font-body"
                        style={{ color: "oklch(0.7 0.2 25)" }}
                        data-ocid="numerology.error_state"
                      >
                        {error}
                      </p>
                    )}

                    <Button
                      onClick={handleCalculate}
                      className="w-full font-body text-base font-semibold tracking-wide py-6"
                      style={{
                        background:
                          "linear-gradient(135deg, oklch(0.75 0.14 82) 0%, oklch(0.65 0.16 70) 100%)",
                        color: "oklch(0.13 0.03 280)",
                        border: "none",
                        boxShadow: "0 0 20px oklch(0.78 0.14 82 / 0.4)",
                      }}
                      data-ocid="numerology.primary_button"
                    >
                      <Sparkles className="mr-2 w-4 h-4" />
                      Reveal My Numbers
                    </Button>
                  </div>
                </div>

                {/* Sample names hint */}
                <p
                  className="text-center text-xs mt-4 font-body"
                  style={{ color: "oklch(0.5 0.04 278)" }}
                >
                  Use your full birth name for the most accurate reading
                </p>
              </motion.div>
            ) : (
              <motion.div
                key="results"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="max-w-5xl mx-auto mt-8"
              >
                {/* Summary bar */}
                <div className="text-center mb-10">
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    <p
                      className="font-body text-sm tracking-widest uppercase mb-1"
                      style={{ color: "oklch(0.62 0.12 82)" }}
                    >
                      Cosmic Reading for
                    </p>
                    <h2
                      className="font-display text-3xl md:text-4xl font-bold"
                      style={{ color: "oklch(0.93 0.05 80)" }}
                    >
                      {name}
                    </h2>
                    <p
                      className="font-body text-sm mt-1"
                      style={{ color: "oklch(0.55 0.05 278)" }}
                    >
                      Born{" "}
                      {new Date(`${dob}T12:00:00`).toLocaleDateString("en-US", {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </p>
                  </motion.div>
                </div>

                {/* Cards grid */}
                <div
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
                  data-ocid="numerology.list"
                >
                  {cardConfigs.map((cfg, idx) => {
                    const num = results[cfg.key];
                    const meaning = getMeaning(num);
                    const isMaster = num === 11 || num === 22 || num === 33;
                    return (
                      <NumerologyCard
                        key={cfg.key}
                        index={idx + 1}
                        emoji={cfg.emoji}
                        label={cfg.label}
                        number={num}
                        archetype={meaning.archetype}
                        description={meaning.description}
                        traits={meaning.traits}
                        isMaster={isMaster}
                        delay={idx * 0.1}
                      />
                    );
                  })}
                </div>

                <div className="text-center mt-10">
                  <Button
                    onClick={handleReset}
                    variant="outline"
                    className="font-body px-8 py-5"
                    style={{
                      border: "1px solid oklch(0.78 0.14 82 / 0.4)",
                      color: "oklch(0.78 0.14 82)",
                      background: "transparent",
                    }}
                    data-ocid="numerology.secondary_button"
                  >
                    <Star className="mr-2 w-4 h-4" />
                    New Reading
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </main>

        {/* Footer */}
        <footer className="text-center py-6 px-4">
          <p
            className="font-body text-xs"
            style={{ color: "oklch(0.42 0.04 278)" }}
          >
            © {year}. Built with{" "}
            <span style={{ color: "oklch(0.7 0.2 25)" }}>♥</span> using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
              style={{ color: "oklch(0.62 0.12 82)" }}
            >
              caffeine.ai
            </a>
          </p>
        </footer>
      </div>
    </div>
  );
}

interface NumerologyCardProps {
  index: number;
  emoji: string;
  label: string;
  number: number;
  archetype: string;
  description: string;
  traits: string[];
  isMaster: boolean;
  delay: number;
}

function NumerologyCard({
  index,
  emoji,
  label,
  number,
  archetype,
  description,
  traits,
  isMaster,
  delay,
}: NumerologyCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      className="rounded-2xl p-6 flex flex-col gap-4 relative overflow-hidden"
      style={{
        background: isMaster
          ? "linear-gradient(135deg, oklch(0.18 0.06 290) 0%, oklch(0.21 0.09 300) 100%)"
          : "oklch(0.17 0.04 275 / 0.9)",
        border: isMaster
          ? "1px solid oklch(0.78 0.14 82 / 0.6)"
          : "1px solid oklch(0.78 0.14 82 / 0.2)",
        boxShadow: isMaster
          ? "0 0 30px oklch(0.78 0.14 82 / 0.2), inset 0 1px 0 oklch(0.78 0.14 82 / 0.1)"
          : "0 4px 24px oklch(0 0 0 / 0.3)",
        backdropFilter: "blur(12px)",
      }}
      data-ocid={`numerology.item.${index}`}
    >
      {/* Subtle shimmer for master numbers */}
      {isMaster && (
        <div
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            background:
              "linear-gradient(105deg, transparent 40%, oklch(0.78 0.14 82 / 0.6) 50%, transparent 60%)",
            backgroundSize: "200% 100%",
            animation: "shimmer 3s linear infinite",
          }}
        />
      )}

      {/* Top row */}
      <div className="flex items-start justify-between">
        <div>
          <p
            className="font-body text-xs tracking-widest uppercase"
            style={{ color: "oklch(0.55 0.08 278)" }}
          >
            {label}
          </p>
          {isMaster && (
            <Badge
              className="mt-1 text-xs font-body"
              style={{
                background: "oklch(0.78 0.14 82 / 0.15)",
                color: "oklch(0.78 0.14 82)",
                border: "1px solid oklch(0.78 0.14 82 / 0.3)",
              }}
            >
              Master Number
            </Badge>
          )}
        </div>
        <span className="text-2xl select-none" style={{ opacity: 0.6 }}>
          {emoji}
        </span>
      </div>

      {/* Number */}
      <div className="flex items-end gap-2">
        <span
          className="font-display leading-none"
          style={{
            fontSize: "4.5rem",
            fontWeight: 700,
            color: "oklch(0.88 0.12 82)",
            textShadow:
              "0 0 20px oklch(0.78 0.14 82 / 0.7), 0 0 40px oklch(0.78 0.14 82 / 0.3)",
            lineHeight: 1,
          }}
        >
          {number}
        </span>
      </div>

      {/* Archetype */}
      <div>
        <h3
          className="font-display text-lg font-semibold"
          style={{ color: "oklch(0.92 0.04 80)" }}
        >
          {archetype}
        </h3>
      </div>

      {/* Description */}
      <p
        className="font-body text-sm leading-relaxed"
        style={{ color: "oklch(0.68 0.04 278)" }}
      >
        {description}
      </p>

      {/* Traits */}
      <div className="flex flex-wrap gap-2 mt-auto">
        {traits.map((trait) => (
          <span
            key={trait}
            className="text-xs font-body px-2.5 py-1 rounded-full"
            style={{
              background: "oklch(0.78 0.14 82 / 0.08)",
              border: "1px solid oklch(0.78 0.14 82 / 0.2)",
              color: "oklch(0.78 0.14 82)",
            }}
          >
            {trait}
          </span>
        ))}
      </div>
    </motion.div>
  );
}
