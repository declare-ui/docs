# Button

The Button is the flagship DeclareUI example — a fully featured component with variants, sizes, disabled state, and click events.

## YAML source

```yaml
name: Button
description: A versatile button component with multiple variants and sizes

props:
  label:
    type: string
    required: true
    description: "Button text content"
  variant:
    type: string
    default: "primary"
    enum: [primary, secondary, ghost, danger]
    description: "Visual style variant"
  size:
    type: string
    default: "md"
    enum: [sm, md, lg]
    description: "Button size"
  disabled:
    type: boolean
    default: false
    description: "Whether the button is disabled"
  fullWidth:
    type: boolean
    default: false
    description: "Whether the button spans full width"

events:
  click:
    description: "Emitted when the button is clicked"
    payload:
      type: object
      properties:
        event:
          type: object

template:
  tag: button
  attrs:
    type: button
    disabled: "$props.disabled"
  classes:
    base: "inline-flex items-center justify-center font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
    variants:
      variant:
        primary: "bg-cyan-500 text-white hover:bg-cyan-600 active:bg-cyan-700"
        secondary: "bg-gray-200 text-gray-900 hover:bg-gray-300 active:bg-gray-400"
        ghost: "text-gray-600 hover:bg-gray-100 active:bg-gray-200"
        danger: "bg-red-500 text-white hover:bg-red-600 active:bg-red-700"
      size:
        sm: "text-sm px-3 py-1.5 gap-1.5"
        md: "text-base px-4 py-2 gap-2"
        lg: "text-lg px-6 py-3 gap-2.5"
    conditional:
      - when: "$props.disabled"
        class: "opacity-50 cursor-not-allowed pointer-events-none"
      - when: "$props.fullWidth"
        class: "w-full"
  on:
    click: "$emit('click', { event: $event })"
  children:
    - expr: "$props.label"
```

## What each section does

| Section | Purpose |
|:--------|:--------|
| `props` | Five inputs: label (required text), variant (style), size, disabled flag, fullWidth flag |
| `events` | Emits `click` with the native event wrapped in a payload |
| `template.attrs` | Sets `type="button"` and forwards the `disabled` prop |
| `classes.base` | Common styles applied to every button instance |
| `classes.variants` | Maps `variant` and `size` prop values to specific Tailwind classes |
| `classes.conditional` | Applies `opacity-50` when disabled, `w-full` when fullWidth |
| `on.click` | Emits the custom `click` event when the button is clicked |

## Generated: React

```tsx
import React from "react";

interface ButtonProps {
  label: string;
  variant?: "primary" | "secondary" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  fullWidth?: boolean;
  onClick?: (payload: { event: React.MouseEvent }) => void;
}

export function Button({
  label,
  variant = "primary",
  size = "md",
  disabled = false,
  fullWidth = false,
  onClick,
}: ButtonProps) {
  const variantClasses: Record<string, string> = {
    primary: "bg-cyan-500 text-white hover:bg-cyan-600 active:bg-cyan-700",
    secondary:
      "bg-gray-200 text-gray-900 hover:bg-gray-300 active:bg-gray-400",
    ghost: "text-gray-600 hover:bg-gray-100 active:bg-gray-200",
    danger: "bg-red-500 text-white hover:bg-red-600 active:bg-red-700",
  };

  const sizeClasses: Record<string, string> = {
    sm: "text-sm px-3 py-1.5 gap-1.5",
    md: "text-base px-4 py-2 gap-2",
    lg: "text-lg px-6 py-3 gap-2.5",
  };

  const className = [
    "inline-flex items-center justify-center font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500",
    variantClasses[variant],
    sizeClasses[size],
    disabled && "opacity-50 cursor-not-allowed pointer-events-none",
    fullWidth && "w-full",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button
      type="button"
      disabled={disabled}
      className={className}
      onClick={(e) => onClick?.({ event: e })}
    >
      {label}
    </button>
  );
}
```

## Generated: Web Component

```typescript
class DuiButton extends HTMLElement {
  static get observedAttributes() {
    return ["label", "variant", "size", "disabled", "full-width"];
  }

  private _label = "";
  private _variant = "primary";
  private _size = "md";
  private _disabled = false;
  private _fullWidth = false;

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback() {
    this._label = this.getAttribute("label") ?? "";
    this._variant = this.getAttribute("variant") ?? "primary";
    this._size = this.getAttribute("size") ?? "md";
    this._disabled = this.hasAttribute("disabled");
    this._fullWidth = this.hasAttribute("full-width");
    this.render();
  }

  private render() {
    const variantClasses: Record<string, string> = {
      primary: "bg-cyan-500 text-white hover:bg-cyan-600 active:bg-cyan-700",
      secondary:
        "bg-gray-200 text-gray-900 hover:bg-gray-300 active:bg-gray-400",
      ghost: "text-gray-600 hover:bg-gray-100 active:bg-gray-200",
      danger: "bg-red-500 text-white hover:bg-red-600 active:bg-red-700",
    };

    const sizeClasses: Record<string, string> = {
      sm: "text-sm px-3 py-1.5 gap-1.5",
      md: "text-base px-4 py-2 gap-2",
      lg: "text-lg px-6 py-3 gap-2.5",
    };

    const classes = [
      "inline-flex items-center justify-center font-medium rounded-lg transition-colors",
      variantClasses[this._variant],
      sizeClasses[this._size],
      this._disabled && "opacity-50 cursor-not-allowed pointer-events-none",
      this._fullWidth && "w-full",
    ]
      .filter(Boolean)
      .join(" ");

    this.shadowRoot!.innerHTML = `
      <button
        type="button"
        class="${classes}"
        ${this._disabled ? "disabled" : ""}
      >${this._label}</button>
    `;

    this.shadowRoot!.querySelector("button")?.addEventListener("click", (e) => {
      this.dispatchEvent(new CustomEvent("dui-click", { detail: { event: e } }));
    });
  }
}

customElements.define("dui-button", DuiButton);
```

## Usage

::: code-group

```tsx [React]
<Button label="Save" variant="primary" size="md" />
<Button label="Cancel" variant="secondary" />
<Button label="Delete" variant="danger" disabled />
```

```vue [Vue]
<Button label="Save" variant="primary" size="md" />
<Button label="Cancel" variant="secondary" />
<Button label="Delete" variant="danger" disabled />
```

```html [Web Component]
<dui-button label="Save" variant="primary" size="md"></dui-button>
<dui-button label="Cancel" variant="secondary"></dui-button>
<dui-button label="Delete" variant="danger" disabled></dui-button>
```

:::
