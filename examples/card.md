# Card

The Card component demonstrates the **slot composition pattern** — letting parent components inject content into predefined areas.

## YAML source

```yaml
name: Card
description: A composable card with header, body, and footer slots

props:
  variant:
    type: string
    default: "default"
    enum: [default, bordered, elevated]
    description: "Card visual style"
  padding:
    type: string
    default: "md"
    enum: [none, sm, md, lg]
    description: "Content padding"

slots:
  header:
    description: "Card header content (title, actions, etc.)"
  default:
    description: "Main card body content"
  footer:
    description: "Card footer content (actions, metadata, etc.)"

template:
  tag: div
  classes:
    base: "rounded-xl overflow-hidden"
    variants:
      variant:
        default: "bg-white dark:bg-gray-800"
        bordered: "bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700"
        elevated: "bg-white dark:bg-gray-800 shadow-lg shadow-gray-200/50 dark:shadow-gray-900/50"
  children:
    - tag: div
      if: "$slots.header"
      classes:
        base: "border-b border-gray-100 dark:border-gray-700 px-6 py-4"
      children:
        - slot: header

    - tag: div
      classes:
        base: ""
        variants:
          padding:
            none: "p-0"
            sm: "p-4"
            md: "p-6"
            lg: "p-8"
      children:
        - slot: default

    - tag: div
      if: "$slots.footer"
      classes:
        base: "border-t border-gray-100 dark:border-gray-700 px-6 py-4"
      children:
        - slot: footer
```

## How slots work

Slots define **content placeholders** that parent components fill in. This is how you build composable, reusable layout components.

| Slot | Purpose | When visible |
|:-----|:--------|:-------------|
| `header` | Title area, top of card | Only when content is provided |
| `default` | Main body content | Always |
| `footer` | Actions or metadata area | Only when content is provided |

The `if: "$slots.header"` conditional means the header section (including its border) is only rendered when the parent actually provides header content. Same for footer.

## Key patterns demonstrated

**Slot composition** — The Card doesn't decide what goes inside it. The parent component provides the content, and the Card provides the structure and styling.

**Conditional slot rendering** — The `if: "$slots.header"` pattern avoids rendering empty header/footer sections with their borders.

**Variant-based styling** — Three visual variants (default, bordered, elevated) controlled by a single prop.

**Padding variants** — Separate control over content padding, useful for cards that contain images or other full-bleed content.

## Usage

::: code-group

```tsx [React]
<Card variant="bordered">
  <template #header>
    <h3 className="text-lg font-semibold">Card Title</h3>
  </template>

  <p>This is the main content of the card.</p>

  <template #footer>
    <div className="flex justify-end gap-2">
      <Button label="Cancel" variant="ghost" />
      <Button label="Save" variant="primary" />
    </div>
  </template>
</Card>
```

```vue [Vue]
<Card variant="bordered">
  <template #header>
    <h3 class="text-lg font-semibold">Card Title</h3>
  </template>

  <p>This is the main content of the card.</p>

  <template #footer>
    <div class="flex justify-end gap-2">
      <Button label="Cancel" variant="ghost" />
      <Button label="Save" variant="primary" />
    </div>
  </template>
</Card>
```

```html [Web Component]
<dui-card variant="bordered">
  <div slot="header">
    <h3 class="text-lg font-semibold">Card Title</h3>
  </div>

  <p>This is the main content of the card.</p>

  <div slot="footer">
    <dui-button label="Cancel" variant="ghost"></dui-button>
    <dui-button label="Save" variant="primary"></dui-button>
  </div>
</dui-card>
```

:::

## Minimal usage (body only)

```yaml
# No header, no footer — just body content
```

::: code-group

```tsx [React]
<Card>
  <p>Just some content — no header or footer borders rendered.</p>
</Card>
```

```vue [Vue]
<Card>
  <p>Just some content — no header or footer borders rendered.</p>
</Card>
```

:::

## Full-bleed content

Use `padding="none"` for images or content that needs to reach the card edges:

```tsx
<Card variant="elevated" padding="none">
  <img src="/hero.jpg" alt="Hero" className="w-full aspect-video object-cover" />
  <div className="p-6">
    <h3>Article Title</h3>
    <p>Article description goes here.</p>
  </div>
</Card>
```
