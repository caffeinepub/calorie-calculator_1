# Numerology App

## Current State
New project, no existing application files.

## Requested Changes (Diff)

### Add
- Input form: Date of Birth (date picker) and Full Name (text input)
- Numerology calculations (all done in frontend, deterministic):
  - Life Path Number: sum of all digits in DOB reduced to single digit (or master numbers 11, 22, 33)
  - Destiny Number: sum of all letters in full name (A=1..Z=26 reduced)
  - Soul Urge Number: sum of vowels in name
  - Personality Number: sum of consonants in name
  - Birth Day Number: day of birth reduced
- Results page showing each number with its meaning, traits, and prediction
- Cosmic/mystical dark-themed UI

### Modify
- N/A

### Remove
- N/A

## Implementation Plan
1. Frontend-only app (no backend needed for deterministic numerology math)
2. Input form with DOB and name
3. Numerology calculation utilities
4. Results display with cards for each number showing meaning and traits
5. Animated cosmic UI
