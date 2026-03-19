# Getting Started

Get up and running with DeclareUI in under five minutes.

## Installation

Install the CLI globally:

```bash
npm install -g @declareui/cli
```

Or use it directly with `npx`:

```bash
npx @declareui/cli init my-project
```

## Create a project

```bash
declareui init my-project
cd my-project
```

This creates the following structure:

```
my-project/
├── components/
│   └── Button.ui.yaml      # Your first component
├── output/
│   └── react/               # Generated code goes here
├── declareui.config.yaml     # Project configuration
└── package.json
```

## Your first component

The generated `Button.ui.yaml` looks like this:

```yaml
name: Button
description: A simple button component

props:
  label:
    type: string
    required: true
  variant:
    type: string
    default: "primary"
    enum: [primary, secondary, ghost]

template:
  tag: button
  attrs:
    type: button
  classes:
    base: "px-4 py-2 rounded-md font-medium transition-colors"
    variants:
      variant:
        primary: "bg-cyan-500 text-white hover:bg-cyan-600"
        secondary: "bg-gray-200 text-gray-900 hover:bg-gray-300"
        ghost: "text-gray-600 hover:bg-gray-100"
  children:
    - expr: "$props.label"
```

## Build

Compile your YAML components to framework code:

```bash
declareui build
```

By default, this generates React components. You can target any framework:

```bash
declareui build --target vue
declareui build --target svelte
declareui build --target webcomponent
declareui build --target angular
```

## What gets generated

For the Button example above, `declareui build` produces:

::: code-group

```tsx [React]
import React from "react";

interface ButtonProps {
  label: string;
  variant?: "primary" | "secondary" | "ghost";
}

export function Button({ label, variant = "primary" }: ButtonProps) {
  const variantClasses = {
    primary: "bg-cyan-500 text-white hover:bg-cyan-600",
    secondary: "bg-gray-200 text-gray-900 hover:bg-gray-300",
    ghost: "text-gray-600 hover:bg-gray-100",
  };

  return (
    <button
      type="button"
      className={`px-4 py-2 rounded-md font-medium transition-colors ${variantClasses[variant]}`}
    >
      {label}
    </button>
  );
}
```

```vue [Vue]
<script setup lang="ts">
interface Props {
  label: string;
  variant?: "primary" | "secondary" | "ghost";
}

const props = withDefaults(defineProps<Props>(), {
  variant: "primary",
});

const variantClasses: Record<string, string> = {
  primary: "bg-cyan-500 text-white hover:bg-cyan-600",
  secondary: "bg-gray-200 text-gray-900 hover:bg-gray-300",
  ghost: "text-gray-600 hover:bg-gray-100",
};
</script>

<template>
  <button
    type="button"
    :class="[
      'px-4 py-2 rounded-md font-medium transition-colors',
      variantClasses[props.variant],
    ]"
  >
    {{ props.label }}
  </button>
</template>
```

:::

## Next steps

- Learn the [core concepts](/guide/concepts) behind DeclareUI
- Explore the full [YAML schema reference](/reference/schema)
- Check out more [examples](/examples/button)
- Already comfortable with YAML? Jump to the [CLI reference](/reference/cli)
