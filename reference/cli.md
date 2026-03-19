# CLI Reference

The `@declareuihq/cli` package provides the `declareui` command for creating, building, and validating components.

## Installation

```bash
# Global install
npm install -g @declareuihq/cli

# Or use with npx
npx @declareuihq/cli <command>

# Or with pnpm
pnpm add -g @declareuihq/cli
```

## Commands

### `declareui init`

Create a new DeclareUI project.

```bash
declareui init <project-name> [options]
```

#### Arguments

| Argument | Description |
|:---------|:------------|
| `project-name` | Directory name for the new project |

#### Options

| Option | Default | Description |
|:-------|:--------|:------------|
| `--target <framework>` | `react` | Default build target (`react`, `vue`, `svelte`, `angular`, `webcomponent`) |
| `--tailwind` | `true` | Include Tailwind CSS configuration |
| `--typescript` | `true` | Generate TypeScript output |
| `--example` | `true` | Include example component |
| `--package-manager <pm>` | auto-detect | Package manager to use (`npm`, `pnpm`, `yarn`) |

#### Examples

```bash
# Create a React project (default)
declareui init my-app

# Create a Vue project
declareui init my-app --target vue

# Create without example component
declareui init my-app --no-example

# Create with specific package manager
declareui init my-app --package-manager pnpm
```

#### Generated structure

```
my-app/
├── components/
│   └── Button.ui.yaml        # Example component (if --example)
├── output/
│   └── react/                 # Build output directory
├── declareui.config.yaml      # Project configuration
├── package.json
└── tsconfig.json              # TypeScript config (if --typescript)
```

---

### `declareui build`

Compile `.ui.yaml` components to framework code.

```bash
declareui build [options]
```

#### Options

| Option | Default | Description |
|:-------|:--------|:------------|
| `--target <framework>` | from config | Build target (`react`, `vue`, `svelte`, `angular`, `webcomponent`) |
| `--outdir <path>` | `./output` | Output directory |
| `--watch` | `false` | Watch for changes and rebuild |
| `--components <glob>` | `./components/**/*.ui.yaml` | Component files glob pattern |
| `--clean` | `false` | Clean output directory before build |
| `--format` | `true` | Format output with Prettier |
| `--sourcemap` | `false` | Include source maps |

#### Examples

```bash
# Build with defaults (uses config file)
declareui build

# Build for multiple targets
declareui build --target react
declareui build --target vue
declareui build --target webcomponent

# Watch mode for development
declareui build --watch

# Build specific components
declareui build --components "src/ui/**/*.ui.yaml"

# Build to custom directory
declareui build --outdir ./src/generated

# Clean build
declareui build --clean
```

#### Output structure

```
output/
└── react/
    ├── Button.tsx
    ├── Card.tsx
    ├── Input.tsx
    └── index.ts              # Barrel export file
```

---

### `declareui validate`

Validate `.ui.yaml` files against the DeclareUI schema.

```bash
declareui validate [files...] [options]
```

#### Arguments

| Argument | Description |
|:---------|:------------|
| `files` | Specific files to validate (optional, defaults to all) |

#### Options

| Option | Default | Description |
|:-------|:--------|:------------|
| `--components <glob>` | `./components/**/*.ui.yaml` | Component files glob pattern |
| `--strict` | `false` | Enable strict mode (warnings become errors) |
| `--format <format>` | `pretty` | Output format (`pretty`, `json`, `github`) |

#### Exit codes

| Code | Meaning |
|:-----|:--------|
| `0` | All files valid |
| `1` | Validation errors found |
| `2` | File not found or read error |

#### Examples

```bash
# Validate all components
declareui validate

# Validate specific file
declareui validate components/Button.ui.yaml

# Strict mode (for CI)
declareui validate --strict

# JSON output (for tooling)
declareui validate --format json

# GitHub Actions annotation format
declareui validate --format github
```

#### Example output

```
✓ components/Button.ui.yaml — valid
✗ components/Card.ui.yaml — 2 errors

  error: props.title.type must be one of: string, number, boolean, array, object
    at props.title.type (line 8, col 11)

  error: template.children[0].tag is required
    at template.children[0] (line 15, col 7)

1 passed, 1 failed (2 errors)
```

---

## Configuration

### `declareui.config.yaml`

Project-level configuration file.

```yaml
# Build target framework
target: react

# Component source directory
components: ./components/**/*.ui.yaml

# Output directory
outdir: ./output

# TypeScript output
typescript: true

# Format output with Prettier
format: true

# Tailwind configuration
tailwind:
  config: ./tailwind.config.ts
  prefix: ""                      # Optional class prefix

# Code generation options
codegen:
  # Barrel exports (index.ts)
  barrel: true

  # Component file naming
  naming: pascal                   # pascal, kebab, camel

  # Import style
  imports: named                   # named, default

  # React-specific options
  react:
    runtime: automatic             # automatic, classic
    memo: false                    # Wrap in React.memo

  # Vue-specific options
  vue:
    scriptSetup: true              # Use <script setup>
    defineModel: false             # Use defineModel for v-model

  # Svelte-specific options
  svelte:
    runes: true                    # Use Svelte 5 runes

  # Web Component options
  webcomponent:
    shadow: true                   # Use Shadow DOM
    prefix: "dui"                  # Custom element prefix (e.g., <dui-button>)
```

### Minimal config

```yaml
target: react
```

All other options have sensible defaults and are only needed when you want to customize behavior.
