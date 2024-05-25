# NoteWalker

NoteWalker is a React-based application designed to search, filter, and view medical notes and their associated FHIR resources. This README provides an overview of the project, instructions for setup, and details on how to deploy the application to GitHub Pages.

## Table of Contents

1. [Features](#features)
2. [Installation](#installation)
3. [Running the Application](#running-the-application)
4. [Project Structure](#project-structure)
5. [Components](#components)
6. [Utilities](#utilities)
7. [Testing](#testing)
8. [Deployment](#deployment)
9. [Contributing](#contributing)
10. [License](#license)

## Features

- Search medical notes by keywords.
- Advanced search with complex criteria based on FHIR resources.
- View detailed information for each note, including FHIR resource details.
- Dynamic highlighting of search terms within notes.
- Compact display of FHIR resources with badges for missing fields.

## Installation

To get started with NoteWalker, clone the repository and install the dependencies:

```bash
git clone https://github.com/juegodynamics/notewalker.git
cd notewalker
npm install
```

## Running the Application
To run the application locally, use the following command:

```bash
npm start
```

Open http://localhost:3000 in your browser to view the application.

## Project Structure
The project structure is organized as follows:

```php
src/
  components/        # React components
  data/              # Data files and mock data
  utils/             # Utility functions
  views/             # View components
  App.tsx            # Main application component
  index.tsx          # Entry point for React
  types.ts           # TypeScript type definitions
  enums.ts           # Enumerations used in the application
  ...
public/
  index.html         # HTML template
  ...
```

## Components
### MainView
The MainView component is the landing page of NoteWalker, featuring the search bar, notes grid, and advanced search functionality.

### DetailView
The DetailView component displays detailed information for a selected note, including associated FHIR resources.

### NotesGrid
The NotesGrid component displays notes in a grid format, allowing users to click on a note to view its details.

### AdvancedSearchDialog
The AdvancedSearchDialog component provides an interface for building and executing advanced search criteria.

### NoteCard
The NoteCard component displays a summary of a note, including highlighting search terms.

### Resource Cards
- `PatientCard`
- `ConditionCard`
- `EncounterCard`
- `ProcedureCard`
- `CarePlanCard`
- `OrganizationCard`
- `PractitionerCard`
These components display details for their respective FHIR resource types.