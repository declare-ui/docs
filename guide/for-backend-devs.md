# YAML for UI Builders

If you've written a `docker-compose.yml`, a GitHub Actions workflow, or a Kubernetes manifest, you already know most of what you need. DeclareUI uses YAML — the same format you use for config files and CI/CD — to describe UI components.

This guide walks you through the essentials in about 10 minutes.

## YAML quick primer (5 min)

If you work with YAML daily, skip ahead to [Tailwind in 5 minutes](#tailwind-quick-primer-5-min).

YAML is just structured data — keys and values, lists, and nesting:

```yaml
# Key-value pairs
name: Button
version: 1

# Nested objects (indent with 2 spaces)
props:
  label:
    type: string
    required: true

# Lists (dash prefix)
children:
  - tag: span
  - tag: div

# Multiline strings
description: |
  A button component that
  supports multiple variants.
```

That's genuinely all you need. No brackets, no semicolons, no closing tags.

::: tip YAML golden rule
Indentation matters (use spaces, not tabs), and that's about the only gotcha.
:::

## Tailwind quick primer (5 min)

[Tailwind CSS](https://tailwindcss.com/) uses utility classes — small, single-purpose class names that each do one thing:

```
px-4        → padding left/right: 1rem
py-2        → padding top/bottom: 0.5rem
bg-blue-500 → background: blue
text-white  → text color: white
rounded-lg  → border-radius: large
font-bold   → font-weight: bold
hover:bg-blue-600 → on hover, darker blue background
```

You combine them to style elements:

```yaml
classes:
  base: "px-4 py-2 bg-blue-500 text-white rounded-lg font-bold hover:bg-blue-600"
```

That's a styled button. No CSS files, no class naming decisions. You describe what you want, and the classes map directly to visual properties.

::: tip
You don't need to memorize classes. The [Tailwind docs](https://tailwindcss.com/docs) have great search, and AI assistants are excellent at suggesting the right utilities.
:::

## Your first component, step by step

Let's build a notification banner. Here's the plan:

> A colored banner that shows a message with an optional title. It can be info (blue), success (green), or error (red).

### Step 1: Name and props

Start with what data the component needs:

```yaml
name: Banner
description: A notification banner with variants

props:
  title:
    type: string
  message:
    type: string
    required: true
  variant:
    type: string
    default: "info"
    enum: [info, success, error]
```

This is just like defining a schema — name your fields, set types, mark what's required.

### Step 2: Structure

Define the HTML structure:

```yaml
template:
  tag: div
  children:
    - tag: strong
      children:
        - expr: "$props.title"
    - tag: p
      children:
        - expr: "$props.message"
```

`$props.title` is how you reference prop values — similar to template variables in Jinja, Handlebars, or Go templates.

### Step 3: Styling

Add Tailwind classes:

```yaml
template:
  tag: div
  classes:
    base: "p-4 rounded-lg border"
    variants:
      variant:
        info: "bg-blue-50 border-blue-200 text-blue-900"
        success: "bg-green-50 border-green-200 text-green-900"
        error: "bg-red-50 border-red-200 text-red-900"
  children:
    - tag: strong
      classes:
        base: "block font-semibold mb-1"
      children:
        - expr: "$props.title"
    - tag: p
      classes:
        base: "text-sm"
      children:
        - expr: "$props.message"
```

The `variants` section works like a switch statement — based on the `variant` prop value, different classes are applied.

### Step 4: Build

```bash
declareui build
```

That's it. You now have a typed, production-ready React (or Vue, or Svelte...) component.

### The complete file

```yaml
name: Banner
description: A notification banner with variants

props:
  title:
    type: string
  message:
    type: string
    required: true
  variant:
    type: string
    default: "info"
    enum: [info, success, error]

template:
  tag: div
  classes:
    base: "p-4 rounded-lg border"
    variants:
      variant:
        info: "bg-blue-50 border-blue-200 text-blue-900"
        success: "bg-green-50 border-green-200 text-green-900"
        error: "bg-red-50 border-red-200 text-red-900"
  children:
    - tag: strong
      classes:
        base: "block font-semibold mb-1"
      children:
        - expr: "$props.title"
    - tag: p
      classes:
        base: "text-sm"
      children:
        - expr: "$props.message"
```

39 lines of YAML, and you get a fully typed component in any framework you need.

## How the generated code works

You don't need to understand React, Vue, or any specific framework to use DeclareUI — but it helps to know what happens under the hood.

When you run `declareui build`, the YAML is compiled to idiomatic framework code:

- **React** — Functional component with TypeScript props interface, JSX template, and conditional class logic
- **Vue** — `<script setup>` with `defineProps`, template with `:class` bindings
- **Svelte** — `export let` props, Svelte template syntax, reactive class expressions
- **Web Components** — Custom element class with Shadow DOM, observed attributes, and template rendering

The generated code is clean and readable — it's the same code an experienced developer would write by hand. You can inspect it, learn from it, or customize it if needed.

## What you already know

| Concept | You know it from | DeclareUI equivalent |
|:--------|:-----------------|:--------------------|
| Key-value config | `docker-compose.yml` | Component props |
| Nested objects | Kubernetes manifests | Template tree |
| Enums / choices | CI/CD matrix strategies | Prop enums, variants |
| Conditional logic | `if:` in GitHub Actions | Conditional classes, `when:` |
| Environment variables | `$&#123;&#123; secrets.KEY &#125;&#125;` | `$props.label`, `$state.count` |

## Next steps

- See more [examples](/examples/button) to build intuition
- Read the full [schema reference](/reference/schema) when you need specifics
- Set up [AI integration](/guide/ai) to generate components from natural language
