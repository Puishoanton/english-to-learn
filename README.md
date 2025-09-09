# English Learning App

## Overview
The **English Learning App** is a modern web-based tool designed to help users master English vocabulary.

## Features
- **Custom Word Decks**: Create and edit decks of flashcards, each containing a word, its translation, and contextual examples for both to enhance memorization.
- **Learn Words Mode**: Test your knowledge with a quiz-based feature that uses spaced repetition to optimize learning, tracking progress in a database.

## Technologies
- **Backend**:
  - C# and .NET 9.0 for robust server-side logic.
  - Entity Framework Core for interaction with a PostgreSQL database.
- **Frontend**:
  - Angular 20 for an intuitive, responsive, and user-friendly interface.
- **Authentication**:
  - Google OAuth for secure and seamless user login.
- **Architecture**:
  - REST API for efficient communication between the frontend and backend, ensuring scalability and maintainability.

## Task Management
- A Kanban board in Notion organizes tasks by status ("To Do," "In Progress," "Done"), providing a clear overview of project progress.
- Tasks include details, deadlines, and notes to streamline development.
- Example board: [Notion Kanban Board](https://www.notion.so/a2088e1ba35a4ea4bc3ef98240232a2a?v=db36645641584def8804c76c6ba095f7) (for reference only).

## CI/CD:
- GitHub Actions to automate CI/CD processes.

## Commit and branch naming checking
- Husky to check commits and ensure branch naming conforms to standards before pushing to the repository.
