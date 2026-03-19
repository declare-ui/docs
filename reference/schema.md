# YAML Schema Reference

Complete reference for the DeclareUI `.ui.yaml` component format.

## Top-level structure

```yaml
name: string              # Required — PascalCase component name
description: string       # Optional — component description

props: PropMap            # Input properties
state: StateMap           # Internal reactive state
template: TemplateNode    # Required — DOM structure
events: EventMap          # Custom events
slots: SlotMap            # Content slots
lifecycle: LifecycleMap   # Lifecycle hooks
```

## Props

Define input properties the component accepts.

```yaml
props:
  propName:
    type: string | number | boolean | array | object
    required: boolean        # Default: false
    default: any             # Default value
    description: string      # Documentation
    enum: any[]              # Allowed values (for string/number)
    items:                   # For array type
      type: string           # Type of array items
```

### Prop types

| Type | TypeScript | Default | Example |
|:-----|:-----------|:--------|:--------|
| `string` | `string` | `""` | `"hello"` |
| `number` | `number` | `0` | `42` |
| `boolean` | `boolean` | `false` | `true` |
| `array` | `T[]` | `[]` | `["a", "b"]` |
| `object` | `Record<string, unknown>` | `{}` | `{ key: "value" }` |

### Examples

```yaml
props:
  # Simple required string
  label:
    type: string
    required: true

  # Enum with default
  size:
    type: string
    default: "md"
    enum: [sm, md, lg, xl]

  # Boolean flag
  disabled:
    type: boolean
    default: false

  # Typed array
  items:
    type: array
    items:
      type: string

  # Number with description
  maxLength:
    type: number
    default: 100
    description: "Maximum character count"
```

## State

Internal reactive state managed by the component.

```yaml
state:
  stateName:
    type: string | number | boolean | array | object
    default: any             # Required — initial value
    description: string      # Documentation
```

### Example

```yaml
state:
  isOpen:
    type: boolean
    default: false
  selectedIndex:
    type: number
    default: -1
  searchQuery:
    type: string
    default: ""
  items:
    type: array
    default: []
```

## Template

The DOM tree structure of the component.

### TemplateNode

```yaml
template:
  tag: string              # HTML tag name
  attrs: AttrMap           # HTML attributes
  classes: ClassDef        # Tailwind class definitions
  on: EventHandlerMap      # DOM event handlers
  children: ChildNode[]    # Child nodes
  if: string               # Conditional rendering expression
  each: string             # List rendering expression
  as: string               # Iterator variable name (with each)
  ref: string              # Element reference name
```

### Tag

Any valid HTML tag:

```yaml
tag: div
tag: button
tag: input
tag: span
tag: ul
tag: svg
```

### Attrs

Static and dynamic HTML attributes:

```yaml
attrs:
  # Static attributes
  type: button
  role: alert
  aria-live: polite
  id: "my-element"

  # Dynamic attributes (expressions)
  disabled: "$props.disabled"
  placeholder: "$props.placeholder"
  value: "$state.inputValue"
  aria-expanded: "$state.isOpen"
```

### Classes

DeclareUI's class system supports base classes, variants, and conditionals:

```yaml
classes:
  # Always applied
  base: "px-4 py-2 rounded-md font-medium"

  # Applied based on prop values (like a switch statement)
  variants:
    propName:
      value1: "class-for-value1"
      value2: "class-for-value2"

  # Applied when conditions are true
  conditional:
    - when: "expression"
      class: "classes-when-true"
    - when: "expression"
      class: "classes-when-true"
```

#### Variants

Map prop values to class strings:

```yaml
classes:
  base: "inline-flex items-center font-medium"
  variants:
    size:
      sm: "text-xs px-2 py-0.5"
      md: "text-sm px-3 py-1"
      lg: "text-base px-4 py-1.5"
    color:
      gray: "bg-gray-100 text-gray-700"
      red: "bg-red-100 text-red-700"
      green: "bg-green-100 text-green-700"
```

#### Conditionals

Apply classes based on expressions:

```yaml
classes:
  base: "px-4 py-2"
  conditional:
    - when: "$props.disabled"
      class: "opacity-50 cursor-not-allowed pointer-events-none"
    - when: "$props.fullWidth"
      class: "w-full"
    - when: "$state.isActive"
      class: "ring-2 ring-cyan-500"
```

### Event handlers

Bind DOM events to expressions:

```yaml
on:
  click: "$emit('click', { value: $props.label })"
  input: "$state.query = $event.target.value"
  keydown.enter: "$emit('submit')"
  focus: "$state.isFocused = true"
  blur: "$state.isFocused = false"
  mouseover: "$state.isHovered = true"
  mouseleave: "$state.isHovered = false"
```

### Children

Child nodes can be elements, text, expressions, or slots:

```yaml
children:
  # Element node
  - tag: span
    children:
      - text: "Hello"

  # Expression (dynamic value)
  - expr: "$props.label"

  # Static text
  - text: "Some static text"

  # Slot
  - slot: default

  # Conditional child
  - tag: span
    if: "$props.showIcon"
    children:
      - text: "★"
```

### Conditional rendering

```yaml
# Render only when condition is true
- tag: div
  if: "$state.isOpen"
  children:
    - expr: "$props.content"

# Conditional with else (use two nodes)
- tag: span
  if: "$state.isLoading"
  children:
    - text: "Loading..."
- tag: span
  if: "!$state.isLoading"
  children:
    - expr: "$props.content"
```

### List rendering

```yaml
- tag: ul
  children:
    - each: "$props.items"
      as: item
      template:
        tag: li
        classes:
          base: "py-2 border-b border-gray-100"
        children:
          - expr: "$item"
```

With index:

```yaml
- each: "$props.items"
  as: item
  index: i
  template:
    tag: li
    children:
      - expr: "`${$i + 1}. ${$item}`"
```

## Events

Custom events the component can emit:

```yaml
events:
  eventName:
    description: string          # Documentation
    payload:                     # Event data shape
      type: object
      properties:
        propertyName:
          type: string | number | boolean
```

### Example

```yaml
events:
  change:
    description: "Emitted when the value changes"
    payload:
      type: object
      properties:
        value:
          type: string
        previousValue:
          type: string

  submit:
    description: "Emitted on form submission"
    payload:
      type: object
      properties:
        data:
          type: object
```

## Slots

Content insertion points for composition:

```yaml
slots:
  slotName:
    description: string          # Documentation
    fallback: TemplateNode       # Default content (optional)
```

### Example

```yaml
slots:
  default:
    description: "Main content"
  header:
    description: "Header content"
    fallback:
      tag: h2
      classes:
        base: "text-lg font-bold"
      children:
        - text: "Default Title"
  footer:
    description: "Footer actions"
```

Use slots in templates:

```yaml
template:
  tag: div
  children:
    - slot: header
    - slot: default
    - slot: footer
```

## Lifecycle

Hook into component lifecycle events:

```yaml
lifecycle:
  mount: "expression"            # After component mounts
  unmount: "expression"          # Before component unmounts
  update: "expression"           # After component updates
```

### Example

```yaml
lifecycle:
  mount: "console.log('Component mounted')"
  unmount: "cleanup()"
```

## Expression syntax

Expressions are JavaScript-like strings evaluated in the component context.

### References

| Prefix | Description | Example |
|:-------|:------------|:--------|
| `$props` | Prop values | `$props.label` |
| `$state` | State values | `$state.isOpen` |
| `$emit` | Event emitter | `$emit('click', data)` |
| `$event` | DOM event object | `$event.target.value` |
| `$refs` | Element references | `$refs.input.focus()` |

### Operators

```yaml
# Comparison
"$props.count > 0"
"$props.status === 'active'"
"$props.value !== ''"

# Logical
"$props.show && !$props.disabled"
"$props.a || $props.b"

# Ternary
"$props.active ? 'Active' : 'Inactive'"

# Template literals
"`Hello, ${$props.name}!`"

# Arithmetic
"$state.count + 1"
"$props.total * 0.1"

# Assignment (in handlers)
"$state.count = $state.count + 1"
"$state.isOpen = !$state.isOpen"
```

### Nullish handling

```yaml
"$props.label ?? 'Default'"
"$props.items?.length ?? 0"
```
