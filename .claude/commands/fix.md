---
name: fix
description: Run typechecking and linting, then spawn parallel agents to fix all issues
---

# Project Code Quality Check

This command runs all linting and typechecking tools for this project, collects errors, groups them by domain, and spawns parallel agents to fix them.

## Step 1: Run Linting and Typechecking

Run the quality check commands for this Next.js/TypeScript project:

```bash
npm run type-check
npm run lint
npm run format
```

## Step 2: Collect and Parse Errors

Parse the output from the linting and typechecking commands. Group errors by domain:

- **Type errors**: Issues from TypeScript compiler (tsc)
- **Lint errors**: Issues from ESLint
- **Format errors**: Issues from Prettier

Create a list of all files with issues and the specific problems in each file.

## Step 3: Spawn Parallel Agents

For each domain that has issues, spawn an agent in parallel using the Task tool.

**IMPORTANT**: Use a SINGLE response with MULTIPLE Task tool calls to run agents in parallel.

Example structure:

```
For type errors: Spawn "typescript-fixer" agent
For lint errors: Spawn "eslint-fixer" agent
For format errors: Spawn "prettier-fixer" agent
```

Each agent should:

1. Receive the list of files and specific errors in their domain
2. Fix all errors in their domain
3. Run the relevant check command to verify fixes
4. Report completion

## Step 4: Verify All Fixes

After all agents complete, run the full check again to ensure all issues are resolved:

```bash
npm run type-check && npm run lint && npm run format
```

If any issues remain, report them to the user with details on what still needs manual intervention.
