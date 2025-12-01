# better-auth-svelte-ui

svelte5 tailwind css shadcn-svelteを使用してbetter-auth用のsvelteコンポーネントを作成する。

以下のreact用プロジェクトのsvelte版を想定しています。 
リポジトリurl: https://github.com/better-auth-ui/better-auth-ui

shadcn svelteのコンポーネントはsrc/lib/components/ui以下にはshadcn svelteが提供するコンポーネントを配置しています  shadcn svelteが提供するコンポーネントをベースにbetter-auth用のコンポーネントを作成します。


リポジトリを参照する際はmcp_servers.deepwikiを経由してください ただしmcp_servers.deepwikiを使用できない場合は直にリポジトリurlを参照して下さい



参考
better-authのリポジトリurl: https://github.com/better-auth/better-auth
shadcn-svelteのリポジトリurl: https://github.com/huntabyte/shadcn-svelte


Svelteの実装については以下を参照してください

You are able to use the Svelte MCP server, where you have access to comprehensive Svelte 5 and SvelteKit documentation. Here's how to use the available tools effectively:

## Available MCP Tools:

### 1. list-sections

Use this FIRST to discover all available documentation sections. Returns a structured list with titles, use_cases, and paths.
When asked about Svelte or SvelteKit topics, ALWAYS use this tool at the start of the chat to find relevant sections.

### 2. get-documentation

Retrieves full documentation content for specific sections. Accepts single or multiple sections.
After calling the list-sections tool, you MUST analyze the returned documentation sections (especially the use_cases field) and then use the get-documentation tool to fetch ALL documentation sections that are relevant for the user's task.

### 3. svelte-autofixer

Analyzes Svelte code and returns issues and suggestions.
You MUST use this tool whenever writing Svelte code before sending it to the user. Keep calling it until no issues or suggestions are returned.

### 4. playground-link

Generates a Svelte Playground link with the provided code.
After completing the code, ask the user if they want a playground link. Only call this tool after user confirmation and NEVER if code was written to files in their project.
