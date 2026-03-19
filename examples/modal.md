# Modal

The Modal component demonstrates **complex state management**, **lifecycle hooks**, and **portal-like rendering** — a dialog that opens and closes with proper keyboard handling and backdrop interaction.

## YAML source

```yaml
name: Modal
description: A dialog overlay with open/close state and keyboard handling

props:
  title:
    type: string
    required: true
    description: "Modal title"
  open:
    type: boolean
    default: false
    description: "Whether the modal is visible"
  closable:
    type: boolean
    default: true
    description: "Whether the modal can be closed by the user"
  size:
    type: string
    default: "md"
    enum: [sm, md, lg, xl, full]
    description: "Modal width"

slots:
  default:
    description: "Modal body content"
  footer:
    description: "Modal footer actions"

events:
  close:
    description: "Emitted when the modal requests to be closed"

state:
  isAnimating:
    type: boolean
    default: false

lifecycle:
  mount: |
    if ($props.closable) {
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') $emit('close')
      })
    }
  unmount: |
    document.removeEventListener('keydown')

template:
  tag: div
  if: "$props.open"
  classes:
    base: "fixed inset-0 z-50 flex items-center justify-center"
  children:
    # Backdrop
    - tag: div
      classes:
        base: "absolute inset-0 bg-black/50 backdrop-blur-sm"
      on:
        click: |
          if ($props.closable) $emit('close')

    # Dialog panel
    - tag: div
      attrs:
        role: dialog
        aria-modal: "true"
        aria-labelledby: "modal-title"
      classes:
        base: "relative z-10 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl flex flex-col max-h-[90vh]"
        variants:
          size:
            sm: "w-full max-w-sm"
            md: "w-full max-w-md"
            lg: "w-full max-w-lg"
            xl: "w-full max-w-xl"
            full: "w-full max-w-[90vw]"
      children:
        # Header
        - tag: div
          classes:
            base: "flex items-center justify-between px-6 py-4 border-b border-gray-100 dark:border-gray-700"
          children:
            - tag: h2
              attrs:
                id: modal-title
              classes:
                base: "text-lg font-semibold text-gray-900 dark:text-white"
              children:
                - expr: "$props.title"
            - tag: button
              if: "$props.closable"
              attrs:
                type: button
                aria-label: "Close"
              classes:
                base: "p-1 rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              on:
                click: "$emit('close')"
              children:
                - tag: svg
                  attrs:
                    xmlns: "http://www.w3.org/2000/svg"
                    width: "20"
                    height: "20"
                    viewBox: "0 0 24 24"
                    fill: none
                    stroke: currentColor
                    stroke-width: "2"
                    stroke-linecap: round
                    stroke-linejoin: round
                  children:
                    - tag: path
                      attrs:
                        d: "M18 6 6 18"
                    - tag: path
                      attrs:
                        d: "m6 6 12 12"

        # Body
        - tag: div
          classes:
            base: "px-6 py-4 overflow-y-auto"
          children:
            - slot: default

        # Footer
        - tag: div
          if: "$slots.footer"
          classes:
            base: "px-6 py-4 border-t border-gray-100 dark:border-gray-700"
          children:
            - slot: footer
```

## Key patterns demonstrated

### Open/close state

The modal uses a `$props.open` prop to control visibility rather than internal state. This follows the **controlled component** pattern — the parent owns the state:

```yaml
template:
  tag: div
  if: "$props.open"
```

The modal doesn't open or close itself. It **requests** closure by emitting the `close` event:

```yaml
events:
  close:
    description: "Emitted when the modal requests to be closed"
```

### Lifecycle hooks

The `mount` and `unmount` hooks handle keyboard event listeners:

```yaml
lifecycle:
  mount: |
    if ($props.closable) {
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') $emit('close')
      })
    }
  unmount: |
    document.removeEventListener('keydown')
```

This ensures:
- Pressing Escape closes the modal (when `closable` is true)
- Event listeners are cleaned up when the component unmounts

### Backdrop click

Clicking the semi-transparent backdrop behind the dialog also triggers close:

```yaml
- tag: div
  classes:
    base: "absolute inset-0 bg-black/50 backdrop-blur-sm"
  on:
    click: |
      if ($props.closable) $emit('close')
```

### Accessibility

The dialog includes proper ARIA attributes:
- `role="dialog"` — identifies it as a dialog
- `aria-modal="true"` — indicates it's modal (blocks interaction behind)
- `aria-labelledby="modal-title"` — links to the title element
- `aria-label="Close"` — labels the close button

### Size variants

Five sizes from compact to full-width:

```yaml
variants:
  size:
    sm: "w-full max-w-sm"
    md: "w-full max-w-md"
    lg: "w-full max-w-lg"
    xl: "w-full max-w-xl"
    full: "w-full max-w-[90vw]"
```

### SVG inline

The close button uses an inline SVG icon, demonstrating that DeclareUI templates can include SVG elements with attributes:

```yaml
- tag: svg
  attrs:
    xmlns: "http://www.w3.org/2000/svg"
    width: "20"
    height: "20"
    viewBox: "0 0 24 24"
    fill: none
    stroke: currentColor
```

## Usage

::: code-group

```tsx [React]
function App() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button label="Open Modal" onClick={() => setIsOpen(true)} />

      <Modal
        title="Confirm Action"
        open={isOpen}
        onClose={() => setIsOpen(false)}
      >
        <p>Are you sure you want to continue?</p>

        <template #footer>
          <div className="flex justify-end gap-2">
            <Button
              label="Cancel"
              variant="ghost"
              onClick={() => setIsOpen(false)}
            />
            <Button label="Confirm" variant="primary" />
          </div>
        </template>
      </Modal>
    </>
  );
}
```

```vue [Vue]
<script setup>
import { ref } from 'vue'

const isOpen = ref(false)
</script>

<template>
  <Button label="Open Modal" @click="isOpen = true" />

  <Modal
    title="Confirm Action"
    :open="isOpen"
    @close="isOpen = false"
  >
    <p>Are you sure you want to continue?</p>

    <template #footer>
      <div class="flex justify-end gap-2">
        <Button label="Cancel" variant="ghost" @click="isOpen = false" />
        <Button label="Confirm" variant="primary" />
      </div>
    </template>
  </Modal>
</template>
```

:::
