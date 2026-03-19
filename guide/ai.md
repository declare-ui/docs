# AI & MCP Integration

DeclareUI's structured YAML format is ideal for AI generation. Because components are described declaratively, AI assistants can produce accurate, valid component definitions from natural language descriptions.

## Using DeclareUI with AI assistants

Any AI assistant that can write YAML can create DeclareUI components. The structured schema means the AI has clear constraints — prop types, template structure, class patterns — which leads to more reliable output than generating raw framework code.

### Example conversation

> **You:** Create a DeclareUI component for a pricing card with a title, price, feature list, and a CTA button. Use a highlighted variant for the recommended plan.

> **AI:** Here's your component:

```yaml
name: PricingCard
description: A pricing tier card with features and CTA

props:
  title:
    type: string
    required: true
  price:
    type: string
    required: true
  period:
    type: string
    default: "/month"
  features:
    type: array
    items:
      type: string
  highlighted:
    type: boolean
    default: false
  ctaLabel:
    type: string
    default: "Get Started"

template:
  tag: div
  classes:
    base: "rounded-2xl p-8 border"
    conditional:
      - when: "$props.highlighted"
        class: "border-cyan-500 bg-cyan-950/30 ring-2 ring-cyan-500/20"
      - when: "!$props.highlighted"
        class: "border-gray-700 bg-gray-900"
  children:
    - tag: h3
      classes:
        base: "text-lg font-semibold text-white"
      children:
        - expr: "$props.title"
    - tag: div
      classes:
        base: "mt-4 flex items-baseline gap-1"
      children:
        - tag: span
          classes:
            base: "text-4xl font-bold text-white"
          children:
            - expr: "$props.price"
        - tag: span
          classes:
            base: "text-gray-400"
          children:
            - expr: "$props.period"
    - tag: ul
      classes:
        base: "mt-6 space-y-3"
      children:
        - each: "$props.features"
          as: feature
          template:
            tag: li
            classes:
              base: "flex items-center gap-2 text-gray-300"
            children:
              - tag: span
                classes:
                  base: "text-cyan-400"
                children:
                  - text: "✓"
              - expr: "$feature"
    - tag: button
      classes:
        base: "mt-8 w-full rounded-lg py-2.5 font-medium transition-colors"
        conditional:
          - when: "$props.highlighted"
            class: "bg-cyan-500 text-white hover:bg-cyan-600"
          - when: "!$props.highlighted"
            class: "bg-gray-800 text-gray-300 hover:bg-gray-700"
      children:
        - expr: "$props.ctaLabel"
```

## MCP Server setup

::: warning Coming soon
The DeclareUI MCP server is under active development and will be available in the next release. The setup below describes the planned integration.
:::

The MCP (Model Context Protocol) server gives AI assistants like Claude direct access to DeclareUI operations — creating, validating, and building components without leaving the conversation.

### Claude Desktop

Add to your Claude Desktop configuration (`claude_desktop_config.json`):

```json
{
  "mcpServers": {
    "declareui": {
      "command": "npx",
      "args": ["-y", "@declareui/mcp-server"],
      "env": {
        "DECLAREUI_PROJECT": "/path/to/your/project"
      }
    }
  }
}
```

### Claude Code

Add to your project's `.mcp.json`:

```json
{
  "mcpServers": {
    "declareui": {
      "command": "npx",
      "args": ["-y", "@declareui/mcp-server"]
    }
  }
}
```

### Available MCP tools (planned)

| Tool | Description |
|:-----|:------------|
| `declareui_create` | Create a new component from a description |
| `declareui_validate` | Validate a `.ui.yaml` file against the schema |
| `declareui_build` | Build components to target frameworks |
| `declareui_list` | List all components in the project |
| `declareui_schema` | Return the full DeclareUI YAML schema |

## Prompts that work well

Here are patterns that produce good DeclareUI components with AI:

### Be specific about structure

> "Create a DeclareUI card component with a header slot, body with a title and description, and a footer with action buttons. Use gray-900 background with subtle border."

### Specify variants upfront

> "Create a DeclareUI badge component with variants: default (gray), success (green), warning (yellow), error (red), info (blue). Each should have matching bg and text colors."

### Describe interactions

> "Create a DeclareUI accordion component with open/close state. Clicking the header toggles the content visibility. Include a rotate animation on the chevron icon."

### Reference existing patterns

> "Create a DeclareUI component like the Button example in the docs, but for a link. It should support the same variants and sizes but render as an anchor tag."

## Workflow: natural language to production code

```
You describe it          AI writes YAML          DeclareUI compiles
─────────────── ──────▸ ──────────────── ──────▸ ──────────────────
"A toggle with           name: Toggle            React component
 on/off state            state:                  Vue component
 and a label"              isOn: ...             Svelte component
                         template: ...           Web Component
```

1. **Describe** what you need in natural language
2. **Review** the generated YAML — it's readable and easy to verify
3. **Build** with `declareui build` to get framework code
4. **Iterate** by asking the AI to adjust the YAML

The YAML layer acts as a **review checkpoint** — you can verify the component structure before any framework code is generated, catching issues early in a format that's easy to read.

## Next steps

- Try the [examples](/examples/button) to see the YAML patterns AI assistants generate
- Read the [schema reference](/reference/schema) to understand what's valid
- Explore the [CLI reference](/reference/cli) for build options
