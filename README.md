# Angular AI - OpenAI Client

This is a modern **Angular** application designed to interact with OpenAI's services through a **NestJS** backend. It serves as a comprehensive client interface demonstrating various AI capabilities, from text analysis and generation to audio processing and image creation.

This project showcases modern Angular development practices, including **Signals**, the new **Control Flow** syntax (`@if`, `@for`), and a responsive UI built with **TailwindCSS**.

---

## 📚 Table of Contents

- [Getting Started](#getting-started)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prettier Configuration](#prettier-configuration)

---

## 🚀 Getting Started

Follow these instructions to get a local copy of the project up and running.

### Prerequisites

- **Node.js** (Latest LTS recommended)
- **pnpm** (Package manager)
- A running instance of the **NestJS Backend** (expected at `http://localhost:3000`).

### Installation

1. **Clone the repository:**

   ```bash
   git clone <repository-url>
   cd angular-ia
   ```

2. **Install dependencies:**
   This project uses `pnpm` for efficient package management.

   ```bash
   pnpm install
   ```

3. **Verify Environment Configuration:**
   Check `src/environments/environment.ts`. By default, it connects to:

   ```typescript
   export const environment = {
     backendApi: 'http://localhost:3000/ai',
   };
   ```

   Ensure your backend server is running on this port.

4. **Start the Development Server:**
   ```bash
   ng serve
   ```
   Navigate to `http://localhost:4200/` in your browser. The app will automatically reload if you change any source files.

---

## ✨ Features

This application includes several modules, each dedicated to a specific AI capability:

### 1. 📝 Orthography Check

**Goal:** Improve writing quality.

- **Function:** Analyzes user input and corrects spelling and grammatical errors.
- **Example:** Input "Hellow world" → AI corrects to "Hello world" and explains the correction.

### 2. ⚖️ Pros & Cons

**Goal:** Decision making helper.

- **Function:** Generates a comparative list of pros and cons for a given topic.
- **Example:** Ask "Pros and cons of remote work" to get a structured comparison.

### 3. 🌊 Pros & Cons (Stream)

**Goal:** Real-time feedback.

- **Function:** Similar to the standard Pros & Cons, but streams the response token by token as it's being generated, reducing perceived latency.

### 4. 🗣️ Translate

**Goal:** Language translation.

- **Function:** Translates text from one language to another.
- **Example:** Translate "Hello, how are you?" to Spanish, French, or German.

### 5. 🔊 Text to Audio

**Goal:** Text-to-Speech (TTS).

- **Function:** Converts written text into spoken audio files. Useful for accessibility or creating audio content.

### 6. 🎙️ Audio to Text

**Goal:** Speech-to-Text (STT) / Transcription.

- **Function:** Takes an audio file or voice recording and transcribes it into text.

### 7. 🖼️ Image Generation

**Goal:** Visual content creation.

- **Function:** Generates images based on text prompts using models like DALL-E.
- **Example:** "A futuristic city with flying cars at sunset."

### 8. 🎨 Image Tuning

**Goal:** Image editing and variation.

- **Function:** Allows modifying or creating variations of an existing image based on new instructions.

### 9. 🤖 Assistant

**Goal:** General purpose helper.

- **Function:** A conversational agent that can handle general queries, maintain context, and assist with various tasks.

---

## 🛠️ Tech Stack

This project is built with the latest web technologies:

- **[Angular](https://angular.io/)**: Framework version 21+.
  - **Signals**: For reactive state management.
  - **Control Flow**: New syntax (`@if`, `@for`, `@switch`) for cleaner templates.
  - **Standalone Components**: Modular architecture without NgModules.
- **[TailwindCSS](https://tailwindcss.com/)**: Utility-first CSS framework for rapid UI development.
- **[ngx-markdown](https://github.com/jfcere/ngx-markdown)**: For rendering Markdown content within chat messages.
- **[pnpm](https://pnpm.io/)**: Fast, disk space efficient package manager.

---

## 💅 Prettier Configuration

To ensure consistent code formatting, especially with the new Angular Control Flow syntax, this project uses a specific Prettier configuration.

### 1. Install Prettier

```bash
pnpm add -D prettier
```

### 2. Configuration (`package.json`)

We configure Prettier directly in `package.json` to use the native **Angular parser** included in Prettier 3.x. This supports the new control flow syntax without requiring extra plugins.

```json
"prettier": {
  "semi": true,
  "trailingComma": "all",
  "singleQuote": true,
  "printWidth": 100,
  "tabWidth": 2,
  "overrides": [
    {
      "files": "*.html",
      "options": {
        "parser": "angular"
      }
    },
    {
      "files": "*.ts",
      "options": {
        "parser": "typescript"
      }
    }
  ]
}
```
