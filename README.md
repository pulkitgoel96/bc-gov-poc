# BC Laws Search Tool - PoC Web App

## Project Overview

This project is a Proof of Concept (PoC) web application for the AG/CTO initiative. The app allows users to search for BC Provincial legislation and related materials using the BC Laws API. Additionally, the app can retrieve legislative documents and send them to an LLM (Large Language Model) API to generate a summary. The app is built using **React (TypeScript)** and is hosted on **GitHub Pages**.

## Table of Contents

- [BC Laws Search Tool - PoC Web App](#bc-laws-search-tool---poc-web-app)
  - [Project Overview](#project-overview)
  - [Table of Contents](#table-of-contents)
  - [Features](#features)
  - [Technologies](#technologies)
  - [Getting Started](#getting-started)
  - [Running Locally](#running-locally)
  - [Deploying to GitHub Pages](#deploying-to-github-pages)
  - [Design Assumptions](#design-assumptions)
  - [Test Plan](#test-plan)
  - [Cloud Migration Plan](#cloud-migration-plan)
  - [Deployment Pipeline](#deployment-pipeline)
  - [Software Stack Recommendations](#software-stack-recommendations)
  - [Feature Improvements for Production](#feature-improvements-for-production)
  - [Demo Approach](#demo-approach)

## Features

- **Search BC Legislation**: Users can search for legislative documents using keywords.
- **Summarize Documents**: After retrieving a document, it can be summarized using a language model API (e.g., OpenAI).
- **Hosted on GitHub Pages**: The app is deployed and available on GitHub Pages.

## Technologies

- **Frontend**: React (TypeScript)
- **Backend**: Integration with BC Laws API and LLM API for document summaries
- **Deployment**: GitHub Pages
- **Tooling**: gh-pages for deployment automation

## Getting Started

To set up and run this project locally, follow these steps:

1.**Clone the repository**:

   ```bash
   git clone https://github.com/<your-github-username>/<your-repo-name>.git
   cd <your-repo-name>
   ```

2.**Install dependencies**:

   ```bash
   npm install
   ```

3.**Run the development server**:

   ```bash
   npm start
   ```

   The app will run on `http://localhost:3000`.

## Running Locally

Once the project is set up, you can run the app locally in development mode:

```bash
npm start
```

- Open `http://localhost:3000` to view it in the browser.
- The page will reload if you make edits to the source files.

## Deploying to GitHub Pages

To deploy this app to GitHub Pages:

1. Install the `gh-pages` package:

   ```bash
   npm install gh-pages --save-dev
   ```

2. Update `package.json`:
   - Add `"homepage": "https://<your-github-username>.github.io/<your-repo-name>/"`.
   - Add deploy scripts:

     ```json
     "scripts": {
       "predeploy": "npm run build",
       "deploy": "gh-pages -d build"
     }
     ```

3. Deploy the app:

   ```bash
   npm run deploy
   ```

Your app will be available at `https://<your-github-username>.github.io/<your-repo-name>/`.

## Design Assumptions

1. **UI Simplicity**: The frontend is simple and functional to focus on the core functionality—searching and summarizing BC laws.
2. **BC Laws API**: Assumes that the BC Laws API provides public access without requiring authentication.
3. **LLM Integration**: Assumes access to an LLM API (such as OpenAI) for summarizing retrieved documents.
4. **Search Relevance**: Assumes that the search API will return results with adequate relevance for keywords.

## Test Plan

1. **Search Functionality**: Test the search input by querying multiple topics (e.g., "dogs", "environment") and ensure relevant results are returned.
2. **Document Summarization**: Verify that the retrieved document can be summarized by the LLM API.
3. **Error Handling**:
   - Handle cases where no search results are found.
   - Handle errors from both the BC Laws API and the LLM API.
4. **Cross-Browser Testing**: Test the app on Chrome, Firefox, and Safari.
5. **Responsiveness**: Ensure the UI works on both desktop and mobile.

## Cloud Migration Plan

To migrate this application to a major cloud service provider, such as AWS or Azure:

1. **Frontend**:
   - Host the frontend on a static website hosting service like **AWS S3** or **Azure Blob Storage**.
2. **Backend**:
   - Implement an API gateway (AWS API Gateway or Azure API Management) to securely call the BC Laws API and LLM API.
3. **CI/CD Pipeline**:
   - Use **AWS CodePipeline** or **Azure DevOps** to automate deployment and scaling of the application.
4. **Security**:
   - Add security layers like authentication (e.g., API keys) and encryption (SSL).

## Deployment Pipeline

1. **Local Development**: Develop and test locally using `npm start`.
2. **Build Process**:
   - Run `npm run build` to create a production-ready version of the app.
3. **Deployment**:
   - For GitHub Pages, run `npm run deploy` to push the built app to the `gh-pages` branch.
4. **CI/CD Integration**: In a production environment, integrate with a CI/CD pipeline (e.g., GitHub Actions, Travis CI, AWS CodePipeline) for automated testing and deployment.

## Software Stack Recommendations

1. **Frontend Framework**: React (with TypeScript for type safety).
2. **State Management**: Consider using **Redux** for more complex state management in production.
3. **Backend**: Optionally, introduce a Node.js/Express server for better handling of API calls and routing.
4. **Styling**: Use **Material-UI** or **Tailwind CSS** to enhance the UI for production use.
5. **API Gateway**: Use a server-side API gateway for secure and efficient handling of requests to external APIs.

## Feature Improvements for Production

1. **Authentication**: Add user authentication for restricted document access or advanced features.
2. **Caching**: Implement caching for faster search results (e.g., with Redis or browser local storage).
3. **Advanced Search Filters**: Allow users to filter results by specific document types (e.g., statutes, regulations).
4. **Error Handling & Logging**: Add robust error handling and logging (e.g., with Sentry or a custom logging service).
5. **UI Enhancements**: Improve the UI for better user experience, including accessibility improvements.

## Demo Approach

For the demo, I plan to:

- Share my screen and walk through the live version of the app hosted on GitHub Pages.
- Demonstrate the search functionality by querying various topics.
- Show the summarization feature using the LLM API for one of the retrieved documents.
