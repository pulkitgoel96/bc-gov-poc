import React, { useState, useEffect } from "react";
import axios from "axios";
import { XMLParser } from "fast-xml-parser";
import OpenAI from "openai";

import "./App.css";

interface Document {
  title?: string;
  loc?: string;
  id: string;
  indexId?: string;
  status?: string;
  parent?: string;
}

const openai = new OpenAI({
  apiKey:
    "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",
  dangerouslyAllowBrowser: true,
});

function App() {
  const [searchText, setSearchText] = useState("");
  const [results, setResults] = useState<Document[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalResults, setTotalResults] = useState(0);

  useEffect(() => {
    if (searchText.length > 0) {
      fetchSearchResults(searchText, currentPage);
    }
  }, [currentPage]);

  const fetchAndParseData = async (apiUrl: string) => {
    setLoading(true);
    setError(null);

    try {
      const proxyUrl = "https://thingproxy.freeboard.io/fetch/";

      const response = await axios.get(proxyUrl + apiUrl);
      const xmlData = response.data;

      const parser = new XMLParser();
      const jsonObj = await parser.parse(xmlData);

      return jsonObj;
    } catch (err) {
      console.error("Error fetching or parsing XML:", err);
      setError("Failed to fetch or parse data");
    } finally {
      setLoading(false);
    }
  };

  const handleSearchOnClick = async (e: React.FormEvent) => {
    e.preventDefault();

    await fetchSearchResults(searchText, currentPage);
  };

  const fetchSearchResults = async (
    searchText: string,
    currentPage: number
  ) => {
    const apiUrl = `https://www.bclaws.gov.bc.ca/civix/search/complete/fullsearch?q=${encodeURIComponent(
      searchText
    )}&s=${currentPage * 20}&e=${currentPage * 20 + 20}&nFrag=5&lFrag=100`;

    const jsonResponse = await fetchAndParseData(apiUrl);

    const documents = jsonResponse.results.doc;

    setTotalResults(jsonResponse.results.total);

    const extractedResults: Document[] = [];

    if (documents && Array.isArray(documents)) {
      documents.forEach((doc) => {
        extractedResults.push({
          title: doc.CIVIX_DOCUMENT_TITLE,
          loc: doc.CIVIX_DOCUMENT_LOC,
          id: doc.CIVIX_DOCUMENT_ID,
          indexId: doc.CIVIX_INDEX_ID,
          status: doc.CIVIX_DOCUMENT_STATUS,
          parent: doc.CIVIX_DOCUMENT_PARENT,
        });
      });
    }

    setResults(extractedResults);
  };

  const handleDocumentOnClick = async (docId: string) => {
    const apiUrl = `http://www.bclaws.ca/civix/document/id/complete/statreg/${docId}/xml`;

    const jsonResponse = await fetchAndParseData(apiUrl);

    summarizeDocument(jsonResponse);
  };

  const summarizeDocument = async (text: any) => {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo-16k",
      messages: [
        { role: "user", content: `Summarize the following document: ${text}` },
      ],
      max_tokens: 100,
    });

    console.log(response.choices[0].message.content);
    // return response.data.choices[0].message.content;
  };

  const handlePaginationOnClick = async (direction: "prev" | "next") => {
    if (direction === "prev") {
      setCurrentPage((prev) => Math.max(prev - 1, 0));
    } else {
      setCurrentPage((prev) => prev + 1);
    }
  };

  return (
    <div className="app">
      <h1 className="title">BC GOV Data Summarization POC</h1>

      <div className="search-box">
        <input
          type="text"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          placeholder="Search for documents..."
        />

        <button
          onClick={handleSearchOnClick}
          disabled={searchText.length === 0}
        >
          Search
        </button>
      </div>

      <div className="results-container">
        {loading && <p>Loading...</p>}
        {error && <p>{error}</p>}

        {results.length > 0 && (
          <>
            {results.map((doc) => (
              <div key={doc.id} className="doc-tile">
                <div className="doc-details">
                  <h3 className="doc-title">{doc.title}</h3>
                  <p className="doc-index">{doc.indexId}</p>
                  {doc.status && <p className="doc-status">[{doc.status}]</p>}
                </div>
                <button
                  onClick={() => handleDocumentOnClick(doc.id)}
                  className="doc-action-button"
                >
                  Summarize Document
                </button>
              </div>
            ))}
            <div className="pagination">
              <button
                onClick={() => handlePaginationOnClick("prev")}
                disabled={currentPage === 0}
              >
                Previous
              </button>
              <button
                onClick={() => handlePaginationOnClick("next")}
                disabled={results.length < 20}
              >
                Next
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
