# Problem Statement: Console-Based Hangman Game (Countries Edition)

---

## 1. Overview

Design and implement a fully functional, console-based Hangman game in which players guess the name of a randomly selected country. The game must run entirely in a terminal/command-line environment without any graphical user interface. It should be engaging, educational, and robust — capable of handling invalid input gracefully while providing a clear and enjoyable user experience through text-based visuals.

---

## 2. Background & Motivation

Hangman is a classic word-guessing game with widespread educational appeal. By restricting the word pool to country names, this variant:

- Reinforces geographical knowledge.
- Exposes players to lesser-known nations and territories.
- Provides a consistent and bounded domain for difficulty calibration.
- Makes the game thematic and purposeful beyond random vocabulary.

The console-only constraint encourages clean program architecture, strong input/output design, and efficient use of data structures without reliance on graphical libraries.

---

## 3. Functional Requirements

### 3.1 Word Bank

- The game must maintain an internal database (hardcoded list, external `.txt` file, or `.json` file) of **at least 195 country names** representing all UN-recognized sovereign states.
- Country names may include:
  - Single-word names (e.g., `FRANCE`, `BRAZIL`)
  - Multi-word names (e.g., `SOUTH AFRICA`, `UNITED KINGDOM`, `TRINIDAD AND TOBAGO`)
  - Hyphenated names (e.g., `GUINEA-BISSAU`, `TIMOR-LESTE`)
- At the start of each round, a country name is selected **uniformly at random**.
- The same country must **not repeat** within a single session until all countries have been used (optional stretch goal).

### 3.2 Game Initialization

- Upon launching the program, the player is greeted with:
  - A welcome banner/title screen rendered in ASCII art or styled text.
  - A brief description of the game rules.
  - A prompt to select a **difficulty level** (see Section 3.5).
  - An option to view the high score leaderboard or start immediately.

### 3.3 Gameplay Loop

Each round proceeds as follows:

1. A country name is randomly selected and hidden from the player.
2. The display shows:
   - The current stage of the hangman ASCII drawing.
   - The hidden word using underscores (`_`) for unguessed letters, with **spaces and hyphens revealed** automatically.
   - A sorted list of letters already guessed (both correct and incorrect).
   - The number of incorrect guesses remaining.
   - The player's current score (if scoring is enabled).
   - An optional hint (see Section 3.6).
3. The player inputs a **single letter** as their guess.
4. Input is validated:
   - Must be an alphabetic character.
   - Must not be a previously guessed letter.
   - Invalid inputs trigger an error message; the game state does not change.
5. If the guessed letter appears in the country name:
   - All instances of that letter are revealed in the word display.
   - A success message is shown (e.g., `✓ Correct! 'A' is in the country name.`).
   - Score increases by a difficulty-weighted amount.
6. If the guessed letter does not appear:
   - The incorrect guess count increments.
   - The hangman drawing advances one stage.
   - A failure message is shown (e.g., `✗ Wrong! 'Z' is not in the country name.`).
7. The round ends when:
   - **Win condition**: All letters in the country name have been correctly guessed → display victory message, reveal the country, update score.
   - **Loss condition**: The player exhausts all allowed incorrect guesses → display the hangman in its final stage, reveal the correct country name, and show a game-over message.
8. After each round, the player is prompted to:
   - Play again (new country, same difficulty).
   - Change difficulty.
   - View the leaderboard.
   - Quit the game.

### 3.4 Hangman ASCII Drawing

The hangman must be rendered progressively in the console. A standard 6-stage drawing is required (allowing 6 incorrect guesses by default), but difficulty may alter this. Example stages:

```
Stage 0       Stage 1       Stage 2       Stage 3       Stage 4       Stage 5       Stage 6
                             -----         -----         -----         -----         -----
  |            |            |   |         |   |         |   |         |   |         |   |
  |            |            |             |   O         |   O         |   O         |   O
  |            |            |             |             |   |         |  /|         |  /|\
  |            O            |             |             |             |             |
 ---          ---           ---           ---           ---           ---           ---
```

Each stage must be clearly formatted and consistently aligned in the terminal.

### 3.5 Difficulty Levels

| Level    | Max Wrong Guesses | Hint Available | Score Multiplier |
|----------|-------------------|----------------|------------------|
| Easy     | 8                 | Yes (free)     | 1×               |
| Medium   | 6                 | Yes (costs pts)| 2×               |
| Hard     | 4                 | No             | 3×               |
| Expert   | 3                 | No             | 5×               |

- **Easy**: More attempts; hints are freely available; ideal for beginners.
- **Medium**: Standard gameplay; hints available at a score penalty.
- **Hard**: Fewer attempts; no hints; only for experienced players.
- **Expert**: Near-no-margin gameplay; extremely high reward.

### 3.6 Hint System

- In Easy mode, the player may request a hint at any time by entering a special character (e.g., `?`).
- In Medium mode, requesting a hint deducts a fixed number of points.
- A hint reveals one of the following (randomly chosen or in order):
  1. The **continent** the country belongs to.
  2. The **first letter** of the country name (if not already revealed).
  3. The country's **capital city**.
  4. A **geographical or cultural fact** about the country (e.g., "This country borders France to the south").
- Each type of hint may only be used **once per round**.

### 3.7 Scoring System

- Players start each session with **0 points**.
- Points are awarded per correct letter guess: `base_points × difficulty_multiplier`.
- Points are deducted for:
  - Each incorrect guess: fixed penalty per difficulty.
  - Using a hint in Medium mode.
- A **time bonus** may optionally be applied: faster completion yields extra points.
- The score for completing a word = `(letters_guessed_correctly × multiplier) + time_bonus - penalties`.
- Scores persist across rounds in a session and are submitted to the leaderboard at the end.

### 3.8 Leaderboard

- The top 10 scores are saved to a local file (e.g., `scores.txt` or `scores.json`).
- Each entry records:
  - Player name (entered at start of session or after game over).
  - Total score.
  - Difficulty level.
  - Number of rounds played and won.
  - Date and time of the session.
- The leaderboard is displayed in a formatted table in the console.
- It persists between program executions (file-based storage).

---

## 4. Non-Functional Requirements

### 4.1 Input Handling & Robustness
- The program must never crash on invalid input (letters, numbers, symbols, empty input, whitespace).
- All input must be **case-insensitive** (internally normalized to uppercase).
- Repeated guesses must be rejected with a clear message and no state change.

### 4.2 Display Clarity
- The console output must be **cleared or refreshed** between turns to prevent clutter (using `cls`/`clear` system calls or equivalent library methods).
- All visual elements must be aligned and consistently formatted.
- Color-coded output is encouraged where the terminal supports it (e.g., green for correct, red for incorrect, yellow for hints).

### 4.3 Portability
- The game must run on at least **two of the following platforms**: Windows, macOS, Linux.
- Platform-specific behaviors (e.g., screen clearing) must be handled with OS detection.

### 4.4 Code Quality
- Code must be modular: separate functions/modules for game logic, display, input handling, scoring, and file I/O.
- Meaningful variable and function names must be used throughout.
- Inline comments and a top-level docstring or README must be included.

### 4.5 Performance
- The game must launch in under 2 seconds on standard hardware.
- File I/O for the word bank and leaderboard must not introduce noticeable delay.

---

## 5. Data Design

### 5.1 Country Entry Format (JSON example)
```json
{
  "name": "SOUTH AFRICA",
  "continent": "Africa",
  "capital": "Pretoria",
  "fact": "This country has 11 official languages and is located at the southern tip of the African continent."
}
```

### 5.2 Score Entry Format (JSON example)
```json
{
  "player": "Alice",
  "score": 4750,
  "difficulty": "Hard",
  "rounds_played": 10,
  "rounds_won": 8,
  "timestamp": "2025-05-09T14:32:00"
}
```

---

## 6. Game Flow Diagram

```
START
  │
  ▼
Show Welcome Screen & Rules
  │
  ▼
Select Difficulty
  │
  ▼
Enter Player Name
  │
  ▼
┌─────────────────────────────────┐
│         GAME ROUND LOOP         │
│                                 │
│  Pick Random Country            │
│         │                       │
│         ▼                       │
│  Display Hangman + Hidden Word  │
│         │                       │
│         ▼                       │
│  Player Input (letter or '?')   │
│         │                       │
│    ┌────┴────┐                  │
│  Valid?    Invalid → Reprompt   │
│    │                            │
│  ┌─┴──────────┐                 │
│ Correct?    Wrong               │
│  │             │                │
│ Reveal      Advance Hangman     │
│  │             │                │
│  └─────┬───────┘                │
│     Win/Loss?                   │
│     │       │                   │
│    Yes      No → Loop           │
│     │                           │
│  Show Result + Update Score     │
│     │                           │
│  Play Again? ──No──► Leaderboard│
│     │Yes                        │
└─────┘                           │
                                  ▼
                             END / EXIT
```

---

## 7. Sample Console Output

```
╔══════════════════════════════════════════════════╗
║        HANGMAN — COUNTRIES OF THE WORLD          ║
║              Difficulty: MEDIUM                  ║
╚══════════════════════════════════════════════════╝

    -----
    |   |
    |   O
    |  /|
    |
   ---

  Word:  _ _ _ _ _   _ _ _ _ _ _

  Guessed Letters:  A  E  I  O  R  T

  Incorrect Guesses Remaining: 3
  Score: 1,200

  Enter a letter (or '?' for a hint): _
```

---

## 8. Error Messages Reference

| Scenario                        | Message Displayed                                      |
|---------------------------------|--------------------------------------------------------|
| Non-alphabetic input            | `⚠ Invalid input. Please enter a single letter (A–Z).` |
| Already guessed letter          | `⚠ You already guessed 'E'. Try a different letter.`   |
| Multiple characters entered     | `⚠ Please enter only one letter at a time.`            |
| Hint requested in Hard/Expert   | `⚠ Hints are not available in Hard/Expert mode.`       |
| Hint already used (same type)   | `⚠ You've already used the continent hint this round.` |
| File not found (word bank)      | `✗ Error: Country data file not found. Check install.` |

---

## 9. Stretch Goals (Optional Enhancements)

1. **Multiplayer Mode**: Two players alternate rounds; the one with the highest cumulative score after N rounds wins.
2. **Category Filters**: Allow players to restrict the word pool by continent (e.g., "Africa only", "Europe only").
3. **Streak Bonus**: Award bonus points for consecutive correct guesses without a wrong attempt.
4. **Statistics Dashboard**: Track win rate, average guesses per game, and most commonly missed letters across all sessions.
5. **Timed Mode**: A countdown timer adds urgency; remaining time contributes to the score.
6. **Letter Frequency Hint**: Show a bar chart (ASCII) of the most common remaining letters as an advanced hint.
7. **Sound Effects** (terminal bell): Use ASCII bell character `\a` for correct/wrong guesses on supported terminals.

---

## 10. Deliverables

| Deliverable                  | Description                                                  |
|------------------------------|--------------------------------------------------------------|
| `hangman.py` (or equivalent) | Main game source file(s)                                     |
| `countries.json` / `.txt`    | Country data with name, continent, capital, and fact fields  |
| `scores.json` / `.txt`       | Leaderboard file (auto-created on first run)                 |
| `README.md`                  | Setup instructions, how to run, dependencies                 |
| This problem statement       | Reference document for expected behavior and design          |

---

## 11. Evaluation Criteria

| Criterion                  | Weight |
|----------------------------|--------|
| Correctness of game logic  | 30%    |
| Input validation & safety  | 15%    |
| ASCII display quality      | 15%    |
| Difficulty & scoring system| 15%    |
| Code quality & modularity  | 15%    |
| Leaderboard persistence    | 10%    |

---

*End of Problem Statement — Hangman (Countries Edition)*