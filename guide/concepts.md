# Core Concepts

## What is a DeclareUI component?

A DeclareUI component is a `.ui.yaml` file that **describes** a UI component — its props, structure, styling, events, and behavior. DeclareUI compiles this description into real framework code (React, Vue, Svelte, Angular, or Web Components).

Think of it like this: you write the **what**, DeclareUI handles the **how**.

```yaml
# What you write
name: Alert
props:
  message:
    type: string
    required: true

template:
  tag: div
  classes:
    base: "p-4 rounded-lg bg-blue-50 text-blue-900"
  children:
    - expr: "$props.message"
```

```tsx
// What gets generated (React)
export function Alert({ message }: { message: string }) {
  return (
    <div className="p-4 rounded-lg bg-blue-50 text-blue-900">{message}</div>
  );
}
```

## Anatomy of a `.ui.yaml` file

Every component file has these top-level sections:

```yaml
name: ComponentName        # Required — the component's name
description: What it does  # Optional — shows up in generated docs

props:                     # Input values the component accepts
  # ...

state:                     # Internal reactive state
  # ...

template:                  # The component's DOM structure
  # ...

events:                    # Custom events the component emits
  # ...

slots:                     # Content insertion points
  # ...

lifecycle:                 # Mount/unmount hooks
  # ...
```

You only need `name` and `template` at minimum. Everything else is optional.

## Props

Props define the data your component receives from its parent.

```yaml
props:
  label:
    type: string
    required: true
    description: "The button text"

  size:
    type: string
    default: "md"
    enum: [sm, md, lg]

  disabled:
    type: boolean
    default: false

  count:
    type: number
    default: 0

  items:
    type: array
    items:
      type: string

  config:
    type: object
```

Supported types: `string`, `number`, `boolean`, `array`, `object`.

## Template

The template describes your component's HTML structure as a tree of nodes.

```yaml
template:
  tag: div                     # HTML tag
  attrs:                       # HTML attributes
    role: alert
    aria-live: polite
  classes:                     # Tailwind classes
    base: "p-4 rounded-lg"
  children:                    # Child nodes
    - tag: span
      classes:
        base: "font-bold"
      children:
        - expr: "$props.title"
    - tag: p
      children:
        - expr: "$props.message"
```

### Text and expressions

Use `expr` to output dynamic values:

```yaml
children:
  - expr: "$props.label"           # Prop value
  - expr: "$state.count"           # State value
  - text: "Static text"            # Static string
  - expr: "$props.count + 1"       # Simple expression
```

## Classes

DeclareUI has a powerful class system built for Tailwind:

```yaml
classes:
  # Always applied
  base: "px-4 py-2 rounded-md font-medium"

  # Applied based on prop value
  variants:
    size:
      sm: "text-sm px-2 py-1"
      md: "text-base px-4 py-2"
      lg: "text-lg px-6 py-3"
    variant:
      primary: "bg-cyan-500 text-white"
      secondary: "bg-gray-200 text-gray-900"

  # Applied when a condition is true
  conditional:
    - when: "$props.disabled"
      class: "opacity-50 cursor-not-allowed"
    - when: "$props.fullWidth"
      class: "w-full"
```

## Events

Define events your component emits and their handlers:

```yaml
events:
  click:
    description: "Emitted when the button is clicked"
    payload:
      type: object
      properties:
        value:
          type: string

template:
  tag: button
  on:
    click: "$emit('click', { value: $props.label })"
  children:
    - expr: "$props.label"
```

## State

Internal reactive state for your component:

```yaml
state:
  isOpen:
    type: boolean
    default: false
  searchQuery:
    type: string
    default: ""
```

Reference state in templates with `$state`:

```yaml
template:
  tag: div
  children:
    - tag: input
      attrs:
        value: "$state.searchQuery"
      on:
        input: "$state.searchQuery = $event.target.value"
```

## Slots

Slots let parent components inject content:

```yaml
slots:
  default:
    description: "Main content"
  header:
    description: "Header content"
    fallback:
      tag: h2
      children:
        - text: "Default Header"

template:
  tag: div
  children:
    - tag: header
      children:
        - slot: header
    - slot: default
```

## Expressions

DeclareUI uses a simple expression syntax:

| Expression | Description |
|:-----------|:------------|
| `$props.name` | Access a prop value |
| `$state.name` | Access state value |
| `$emit('event', payload)` | Emit a custom event |
| `$event` | The native DOM event (in handlers) |
| `$state.name = value` | Update state |

Expressions support basic JavaScript operators:

```yaml
# Ternary
- expr: "$props.count > 0 ? 'Has items' : 'Empty'"

# Template literals
- expr: "`${$props.firstName} ${$props.lastName}`"

# Logical operators
- when: "$props.show && !$props.disabled"
```

## How YAML becomes code

The compilation pipeline:

1. **Parse** — YAML is read and validated against the DeclareUI schema
2. **AST** — A framework-agnostic component AST (abstract syntax tree) is built
3. **Transform** — The AST is optimized (dead code removal, class merging)
4. **Generate** — A target-specific code generator produces framework code
5. **Format** — Output is formatted with Prettier

Each framework generator understands the idioms of its target — React uses JSX and hooks, Vue uses `<script setup>` and `defineProps`, Svelte uses reactive declarations, and so on.

## Next steps

- Read the [YAML for UI Builders](/guide/for-backend-devs) guide for a gentle introduction
- Explore the full [schema reference](/reference/schema)
- See real examples: [Button](/examples/button), [Card](/examples/card), [Input](/examples/input)
