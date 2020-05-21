# Development Practices

## Development workflow

1. Follow [README.md](https://github.com/HackPlan/UUI) instructions for setting up the dev environment.
2.
3. Create a local contributing branch off the latest `master` and switch to it.
    * Use the naming scheme `<initials>/<short-kebab-case-description>` (example: sc/masked-textfield). This reduces potential conflicts and signifies a responsible party for the branch so that it can be deleted when stale.
    * If starting a collaborative or long-lived feature branch, We use a format like `feature/[short-name]` for new feature and `fix/[short-name]` for bug fix.
4. Run `yarn storybook` in the root project directory to start storybook dev app at `http://localhost:6006`.
5. Write some code, do some changes.
6. Update related documentation.
7. Ensure your code is **tested** and **linted**.
    * Linting is best handled by your editor for real-time feedback. Run yarn lint to be 100% safe.
    * Some TypeScript lint errors can often be automatically fixed by ESLint. Run lint fixes with `yarn lint --fix`.
8. Commit your code with a descriptive message.
    * If your change resolves an existing issue (usually, it should) include "Fixes #123" on a newline, where 123 is the issue number.
9. Push your contributing branch to your fork of the UUI repo.
    * If the `master` branch in local is out of dated, pull the latest changes and rebase your contributing branch to latest `master`.
10. Submit a Pull Request on Github.
    * fill out the description template.
    * If your change is visual (most UUI features are), include a screenshot or GIF demonstrating the change.
11. Get approval from the Blueprint team.
    * When addressing feedback, push additional commits instead of overwriting or squashing.
    * Be descriptive in your commit messages: prefer "fix style nits" to "address CR feedback" because the former provides context at a glance.
    * Our build bot and lint bot will run automatically on the PR.
    * Before merging, make the branch is based on latest `master`, you may need `git push --force-with-lease`.
12. Merged it! ✨
