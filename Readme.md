# Python Mini Projects

A collection of small, self-contained Python projects — each one focused on practicing a specific concept, tool, or library. This repo serves as both a learning log and a portfolio of practical exercises.

## How This Repo Is Organized

Every project lives in its own folder at the root of this repo, and is fully self-contained:

```
Python_Mini_Projects/
├── <ProjectName>/
│   ├── <source files>
│   ├── requirements.txt      # dependencies specific to this project (if any)
│   └── Readme.md              # what the project does, how it works, how to run it
├── <AnotherProject>/
│   └── ...
└── Readme.md                  # this file
```

Each project folder's own `Readme.md` is the source of truth for that project — this file only describes the shared structure and conventions across all of them, so it doesn't need edits every time a new project is added.

## Conventions Used Across Projects

- **One folder per project.** A project may contain multiple variations or versions of an idea (e.g. a basic approach and an improved one) as subfolders within it, each documented in its own `Readme.md`.
- **Each project manages its own dependencies.** If a project needs external packages, it includes its own `requirements.txt`. Install them from inside that project's folder:
  ```bash
  cd <ProjectName>
  pip install -r requirements.txt
  ```
- **Virtual environments are per-project**, not shared across the whole repo, and are excluded from version control via `.gitignore`.
- **Sample inputs/outputs** (images, data files, generated results) are typically included in a project's folder purely to illustrate what the project produces — they're examples, not requirements for the code to run.

## Adding a New Project

1. Create a new folder at the root with a clear, descriptive name.
2. Include a `Readme.md` inside it explaining what it does and how to run it.
3. Add a `requirements.txt` inside it if external packages are needed.
4. Optionally, add a one-line entry for it in the table below.

## Projects

| Preview | Project | Description |
|---|---|---|
| <img src="Image_to_GIF/StaticImageToGIF/Bear.gif" width="120"> | [Image_to_GIF](Image_to_GIF/Readme.md) | Converts a set of static images into an animated GIF, with both a fixed-list and a dynamic file-picker version. |