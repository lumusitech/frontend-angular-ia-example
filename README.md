# AngularIa

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 21.0.0.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.

## Prettier Configuration for Angular Projects

To ensure consistent code formatting, especially with the new Angular Control Flow syntax (`@if`, `@for`), follow these steps to configure Prettier in your Angular projects.

### 1. Install Prettier

Install Prettier as a dev dependency (version 3.2.5 or higher recommended):

```bash
pnpm add -D prettier
```

### 2. Configure `package.json`

Add the following `prettier` configuration block directly to your `package.json` file. This configuration uses the native Angular parser included in Prettier 3.x, ensuring proper formatting for HTML templates and TypeScript files without needing extra plugins.

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

### Why this setup?

- **Native Support:** Prettier 3.x includes native support for Angular's control flow syntax.
- **No Extra Plugins:** You don't need `@prettier/plugin-angular` anymore.
- **Centralized Config:** Keeping the config in `package.json` ensures all tools (VS Code, CLI) use the same settings.
