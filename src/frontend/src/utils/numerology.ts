export interface NumerologyMeaning {
  archetype: string;
  description: string;
  traits: string[];
}

export interface NumerologyResult {
  lifePathNumber: number;
  destinyNumber: number;
  soulUrgeNumber: number;
  personalityNumber: number;
  birthDayNumber: number;
}

const MEANINGS: Record<number, NumerologyMeaning> = {
  1: {
    archetype: "The Leader",
    description:
      "Independent, ambitious, and pioneering — you are destined to forge your own path and inspire others. A natural born leader with strong willpower and an unyielding drive to succeed. Your energy is magnetic and others are naturally drawn to your confidence. You blaze trails and create opportunities wherever you go.",
    traits: ["Independent", "Ambitious", "Pioneering", "Confident", "Driven"],
  },
  2: {
    archetype: "The Diplomat",
    description:
      "Cooperative, sensitive, and a natural peacemaker — you thrive in partnerships and bring harmony to relationships. Highly intuitive and empathetic, you sense what others feel before they say a word. Your greatest strength lies in your ability to unite people and mediate conflict. You are the glue that holds relationships together.",
    traits: [
      "Cooperative",
      "Sensitive",
      "Intuitive",
      "Empathetic",
      "Harmonious",
    ],
  },
  3: {
    archetype: "The Communicator",
    description:
      "Creative, expressive, and joyful — you have a gift for communication and the arts. A social butterfly who uplifts everyone around them, your words carry power and charm. Life is your canvas and you paint it with color, wit, and imagination. You are meant to entertain, inspire, and bring light to the world.",
    traits: ["Creative", "Expressive", "Joyful", "Charismatic", "Artistic"],
  },
  4: {
    archetype: "The Builder",
    description:
      "Practical, disciplined, and reliable — you build solid foundations in life with patience and precision. Hard-working and trustworthy, you create lasting security for yourself and those you love. Your methodical approach ensures that what you create endures. The universe rewards your steadfast dedication with lasting success.",
    traits: ["Practical", "Disciplined", "Reliable", "Patient", "Methodical"],
  },
  5: {
    archetype: "The Adventurer",
    description:
      "Freedom-loving, versatile, and dynamic — you crave change and new experiences above all else. Adaptable and magnetic, life is your greatest adventure and you embrace it fully. You thrive in variety, resist restrictions, and inspire others to break free from convention. Every day holds the promise of something thrilling.",
    traits: [
      "Adventurous",
      "Versatile",
      "Dynamic",
      "Free-spirited",
      "Magnetic",
    ],
  },
  6: {
    archetype: "The Nurturer",
    description:
      "Caring, responsible, and deeply protective — you are the heart of family and community. A natural healer who gives unconditional love, your compassion knows no bounds. You are drawn to service and find deep fulfillment in supporting others through their challenges. Your home is always a sanctuary of warmth and belonging.",
    traits: ["Caring", "Responsible", "Protective", "Compassionate", "Devoted"],
  },
  7: {
    archetype: "The Seeker",
    description:
      "Analytical, introspective, and spiritually attuned — you seek the deeper truths of existence with relentless curiosity. A philosopher and researcher with profound inner wisdom, your mind is your greatest gift. You are drawn to mystery, metaphysics, and the hidden patterns underlying reality. Solitude is your sanctuary for revelation.",
    traits: [
      "Analytical",
      "Introspective",
      "Spiritual",
      "Wise",
      "Philosophical",
    ],
  },
  8: {
    archetype: "The Achiever",
    description:
      "Ambitious, authoritative, and destined for material mastery — you are built for success and abundance. A powerful manifestor who turns dreams into reality through sheer force of will and strategic thinking. You understand the laws of power and use them wisely. Wealth, influence, and recognition are your natural inheritance.",
    traits: [
      "Ambitious",
      "Authoritative",
      "Strategic",
      "Powerful",
      "Prosperous",
    ],
  },
  9: {
    archetype: "The Humanitarian",
    description:
      "Compassionate, wise, and deeply idealistic — you are here to serve the greater good of humanity. A visionary with deep universal understanding, your soul carries the wisdom of all previous numbers. You feel the pain of others as your own and are driven to heal the world. Your legacy will be one of profound and lasting impact.",
    traits: ["Compassionate", "Wise", "Idealistic", "Visionary", "Universal"],
  },
  11: {
    archetype: "The Intuitive",
    description:
      "A master number of the highest spiritual sensitivity — you carry spiritual illumination and the power to uplift humanity. Highly intuitive, inspirational, and visionary, you bridge the earthly and divine realms. Your heightened perception allows you to sense truths others cannot. You are here to be a beacon of light and awakening.",
    traits: [
      "Intuitive",
      "Inspirational",
      "Visionary",
      "Sensitive",
      "Illuminated",
    ],
  },
  22: {
    archetype: "The Master Builder",
    description:
      "The most powerful of all numbers — you can turn the most ambitious dreams into reality on a grand scale. A master number that combines visionary thinking with practical execution, you are a force of transformation. Entire movements, institutions, and civilizations can be shaped by your hands. Your potential knows no earthly limit.",
    traits: [
      "Visionary",
      "Powerful",
      "Transformative",
      "Masterful",
      "Limitless",
    ],
  },
  33: {
    archetype: "The Master Teacher",
    description:
      "Compassion, blessings, and inspiration on the highest level — a rare gift to the world. This master number embodies the purest form of unconditional love and devoted service to humanity. You are here to nurture the spiritual evolution of all. Your very presence heals and elevates those fortunate enough to cross your path.",
    traits: ["Nurturing", "Healing", "Selfless", "Inspiring", "Divine"],
  },
};

export function getMeaning(n: number): NumerologyMeaning {
  return (
    MEANINGS[n] ?? {
      archetype: "The Mystic",
      description:
        "Your number carries a unique vibration that transcends ordinary classification. You walk a path less traveled, guided by cosmic forces that few can perceive.",
      traits: ["Unique", "Mysterious", "Complex"],
    }
  );
}

function reduceNumber(n: number): number {
  if (n === 11 || n === 22 || n === 33) return n;
  if (n < 10) return n;
  const sum = String(n)
    .split("")
    .reduce((acc, d) => acc + Number(d), 0);
  return reduceNumber(sum);
}

export function calcLifePath(dob: string): number {
  // dob format: YYYY-MM-DD
  const digits = dob.replace(/-/g, "").split("").map(Number);
  const sum = digits.reduce((a, b) => a + b, 0);
  return reduceNumber(sum);
}

export function letterValue(ch: string): number {
  const code = ch.toUpperCase().charCodeAt(0);
  if (code < 65 || code > 90) return 0;
  return code - 64; // A=1, Z=26
}

const VOWELS = new Set(["A", "E", "I", "O", "U"]);

export function calcDestiny(name: string): number {
  const sum = name
    .toUpperCase()
    .split("")
    .reduce((acc, ch) => acc + letterValue(ch), 0);
  return reduceNumber(sum);
}

export function calcSoulUrge(name: string): number {
  const sum = name
    .toUpperCase()
    .split("")
    .filter((ch) => VOWELS.has(ch))
    .reduce((acc, ch) => acc + letterValue(ch), 0);
  return reduceNumber(sum || 1);
}

export function calcPersonality(name: string): number {
  const sum = name
    .toUpperCase()
    .split("")
    .filter((ch) => ch >= "A" && ch <= "Z" && !VOWELS.has(ch))
    .reduce((acc, ch) => acc + letterValue(ch), 0);
  return reduceNumber(sum || 1);
}

export function calcBirthDay(dob: string): number {
  // dob format: YYYY-MM-DD
  const day = Number(dob.split("-")[2]);
  return reduceNumber(day);
}

export function calculate(name: string, dob: string): NumerologyResult {
  return {
    lifePathNumber: calcLifePath(dob),
    destinyNumber: calcDestiny(name),
    soulUrgeNumber: calcSoulUrge(name),
    personalityNumber: calcPersonality(name),
    birthDayNumber: calcBirthDay(dob),
  };
}
