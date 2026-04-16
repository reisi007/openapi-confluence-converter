import { RepomixConfig } from 'repomix';

const config: RepomixConfig = {
  output: {
    filePath: "repomix-output.md",
    style: "markdown",
  },
  ignore: {
    useGitignore: true,
    customPatterns: [
      "output.html",
      "pnpm-workspace.yaml",
    ],
  },
};

export default config;