# Input

The Input component demonstrates **state management** and **events** — handling user input, validation states, and two-way data flow.

## YAML source

```yaml
name: Input
description: A text input with label, validation, and helper text

props:
  label:
    type: string
    required: true
    description: "Input label text"
  placeholder:
    type: string
    default: ""
    description: "Placeholder text"
  type:
    type: string
    default: "text"
    enum: [text, email, password, number, tel, url]
    description: "Input type"
  value:
    type: string
    default: ""
    description: "Current input value"
  helperText:
    type: string
    description: "Help text below the input"
  error:
    type: string
    description: "Error message (overrides helperText)"
  disabled:
    type: boolean
    default: false
  required:
    type: boolean
    default: false

state:
  isFocused:
    type: boolean
    default: false

events:
  input:
    description: "Emitted on every keystroke"
    payload:
      type: object
      properties:
        value:
          type: string
  change:
    description: "Emitted when input loses focus with a new value"
    payload:
      type: object
      properties:
        value:
          type: string

template:
  tag: div
  classes:
    base: "flex flex-col gap-1.5"
  children:
    # Label
    - tag: label
      classes:
        base: "text-sm font-medium text-gray-700 dark:text-gray-300"
        conditional:
          - when: "$props.error"
            class: "text-red-600 dark:text-red-400"
      children:
        - expr: "$props.label"
        - tag: span
          if: "$props.required"
          classes:
            base: "text-red-500 ml-0.5"
          children:
            - text: "*"

    # Input field
    - tag: input
      attrs:
        type: "$props.type"
        placeholder: "$props.placeholder"
        value: "$props.value"
        disabled: "$props.disabled"
        required: "$props.required"
      classes:
        base: "w-full rounded-lg border px-3 py-2 text-sm transition-colors outline-none"
        conditional:
          - when: "$props.error"
            class: "border-red-300 dark:border-red-700 focus:ring-2 focus:ring-red-500/20 focus:border-red-500"
          - when: "!$props.error && $state.isFocused"
            class: "border-cyan-500 ring-2 ring-cyan-500/20"
          - when: "!$props.error && !$state.isFocused"
            class: "border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500"
          - when: "$props.disabled"
            class: "bg-gray-50 dark:bg-gray-800 cursor-not-allowed opacity-60"
          - when: "!$props.disabled"
            class: "bg-white dark:bg-gray-900"
      on:
        input: "$emit('input', { value: $event.target.value })"
        change: "$emit('change', { value: $event.target.value })"
        focus: "$state.isFocused = true"
        blur: "$state.isFocused = false"

    # Helper text / Error message
    - tag: p
      if: "$props.error || $props.helperText"
      classes:
        base: "text-xs"
        conditional:
          - when: "$props.error"
            class: "text-red-600 dark:text-red-400"
          - when: "!$props.error"
            class: "text-gray-500 dark:text-gray-400"
      children:
        - expr: "$props.error ?? $props.helperText"
```

## Key patterns demonstrated

### Internal state for UI behavior

The `isFocused` state tracks whether the input currently has focus. This is **internal** state — the parent component doesn't need to know or care about it. It's used purely for visual feedback (the cyan ring).

```yaml
state:
  isFocused:
    type: boolean
    default: false
```

### Event-driven updates

The input emits two events:
- `input` — on every keystroke (for real-time updates)
- `change` — when the field loses focus (for form validation)

Both pass the current value in the payload:

```yaml
on:
  input: "$emit('input', { value: $event.target.value })"
  change: "$emit('change', { value: $event.target.value })"
  focus: "$state.isFocused = true"
  blur: "$state.isFocused = false"
```

### Conditional styling layers

The input demonstrates layered conditional classes — error state takes priority, then focus state, then default state:

```yaml
conditional:
  - when: "$props.error"
    class: "border-red-300 focus:ring-2 focus:ring-red-500/20 focus:border-red-500"
  - when: "!$props.error && $state.isFocused"
    class: "border-cyan-500 ring-2 ring-cyan-500/20"
  - when: "!$props.error && !$state.isFocused"
    class: "border-gray-300 hover:border-gray-400"
```

### Nullish coalescing in expressions

The helper text uses `??` to show the error message if present, falling back to helper text:

```yaml
- expr: "$props.error ?? $props.helperText"
```

## Usage

::: code-group

```tsx [React]
{/* Basic input */}
<Input label="Email" type="email" placeholder="you@example.com" />

{/* Required with helper text */}
<Input
  label="Username"
  required
  helperText="Must be 3-20 characters"
  onInput={(e) => setUsername(e.value)}
/>

{/* Error state */}
<Input
  label="Password"
  type="password"
  error="Password must be at least 8 characters"
/>

{/* Disabled */}
<Input label="Organization" value="DeclareUI" disabled />
```

```vue [Vue]
<!-- Basic input -->
<Input label="Email" type="email" placeholder="you@example.com" />

<!-- Required with helper text -->
<Input
  label="Username"
  required
  helper-text="Must be 3-20 characters"
  @input="(e) => username = e.value"
/>

<!-- Error state -->
<Input
  label="Password"
  type="password"
  error="Password must be at least 8 characters"
/>

<!-- Disabled -->
<Input label="Organization" value="DeclareUI" disabled />
```

:::
