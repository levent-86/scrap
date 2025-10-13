# Developer Guide & Contribution Guidelines

**NeuraLetter Suite: Scrap** is a labor of care. Even the project icon is custom-made and open-source.

## Icon Design & Licensing

The "Pick Icon" visible on the Chrome toolbar was custom-designed for this project, embodying its unique functionality.

- **Designer:** Mustafa Levent Fidancı
- **Concept:** A simplified, modern representation of data selection and collection.
- **License:** The icon's source SVG is included and licensed under the **MIT License**, ensuring it remains free to use, modify, and distribute along with the code. You can find the source in the `public/` directory.

## Legal Disclaimer & Licensing

By contributing code, documentation, or any other assets (images, fonts, etc.) to **NeuraLetter Suite: Scrap**, you agree to the following conditions:

1.  **Ownership and Responsibility:** You affirm that any materials submitted are either your original work or that you have the necessary rights and permissions to contribute them.
    - Any legal issues arising from the unauthorized use or infringement of third-party intellectual property in your contribution are the **sole responsibility of the contributor**, not the project owner.
2.  **Open Source Licensing:** All contributions, including your original code and materials, will be released under the **MIT License**.
    - By submitting a Pull Request, you consent to license your contributions under the terms of the MIT License, ensuring that the project remains permanently open-source.

**Proceeding with a contribution implies that you have read, understood, and accepted these terms.**

---

## Getting Started

Thank you for your interest in contributing to **NeuraLetter Suite: Scrap**! We believe in the power of community and appreciate any effort to improve our tool.

If you're looking to run the extension locally or contribute code, here's how to get set up.

### Technology Stack

**NeuraLetter Suite: Scrap** is a modern Google Chrome Extension built using the following technologies:

- **Frontend/Logic:** JavaScript (ES6+), HTML5, CSS3
- **Framework/Libraries:** React.js
- **UI Tool:** Daisy UI
- **Build Tool:** Vite
- **Test/Coverage Tools:** Vitest, React Testing Library, user-event, coverage v8
- **Development Environment:** Node.js (v20.19.5), npm (10.8.2)
- **Code Style/Linter:** ESLint, Prettier

### Local Setup Instructions

Follow these steps to get a copy of the project running on your local machine for development and testing purposes.

#### 1. Prerequisites

- Node.js
- npm
- Google Chrome Browser

  _(Check Technology Stack above to see **Node.js** and **npm** versions used on this project.)_

#### 2. Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/levent-86/scrap.git
    cd scrap
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Build extension:
    ```bash
    npm run build
    ```

#### 3. Loading the Extension in Chrome

1.  Open Chrome and navigate to `chrome://extensions`
2.  Enable **"Developer mode"** in the top right corner.
3.  Click the **"Load unpacked"** button.
4.  Select the project directory `dist` within the project folder.
5.  The **NeuraLetter Suite: Scrap** icon should now appear in your browser's toolbar.

## Recommended Editor Setup

To ensure a smooth and consistent development experience, especially regarding code styling, we recommend using **Visual Studio Code (VS Code)** with the following setup:

### Required VS Code Extensions:

Please install these extensions to utilize the project's automatic formatting and linting rules:

1.  **ESLint**
2.  **Prettier - Code Formatter**

### Workspace Settings:

This project includes a `.vscode/settings.json` file. This file contains **project-specific rules** for ESLint and Prettier.

**Important:** We strongly recommend honoring these workspace settings. When working on this repository, please ensure your local VS Code settings do not override the project's defined rules to maintain code consistency across all contributions.

## Contribution Guidelines

We follow a standard workflow to ensure code quality and consistency.

### Reporting Bugs and Suggesting Features

- **Bugs:** Please check the [Issues](https://github.com/levent-86/scrap/issues) first. If the issue is new, open a new issue and use the "Bug Report" template, detailing the steps to reproduce the bug.
- **Features:** Before starting to implement a feature, please open a new issue with the "Feature Request" template to discuss the idea with the maintainer(s).

### Pull Request Process

1.  Fork the repository and create your feature branch (`git checkout -b feature/AmazingFeature`).
2.  Ensure your code adheres to the defined **Code Style** (see below) and runs without any linting errors.
3.  Write clear, concise, and descriptive commit messages (e.g., `feat: Add bulk tab opening feature`).
4.  **Before opening a PR, run tests locally** (`npm run test`) to ensure all unit tests pass.
5.  Open a Pull Request (PR) against the `main` branch. Provide a brief explanation of your change. **Our GitHub Actions CI will automatically run all tests and build steps to verify your contribution. Additionally, the CI will automatically fix any formatting or simple linting issues.**

## Testing

- **Unit Tests:** You must write unit tests for any new features or bug fixes. Run tests locally with the `npm run test` command. Your PR will not be merged unless it passes the full test suite run by GitHub Actions.
- **Manual Testing:** Before submitting a PR, please manually test your changes in the Chrome extension, verifying that existing features still work as expected.

## Code Style & Naming Conventions

- We use **ESLint** and **Prettier** to enforce code consistency.
- **Auto-Fix Integration:** We recommend checking your code locally before committing. However, our CI pipeline uses a dedicated GitHub Action to automatically apply Prettier and ESLint fixes. If you forget a semicolon or spacing, the CI will fix it and commit the changes to your PR for you.
- Please use **camelCase** for variables and functions, and **PascalCase** for components/classes.
- Maintain clear separation of concerns (e.g., keeping UI logic separate from data persistence logic).
