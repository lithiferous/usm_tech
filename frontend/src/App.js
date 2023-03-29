import React from "react";
import { ReactiveBase, DataSearch } from "@appbaseio/reactivesearch";

function App() {
  return (
    <div className="main-container">
      <ReactiveBase
        url="http://localhost:9200"
        app="market"
        credentials="elastic:changeme"
        enableAppbase={false}
        theme="rbc-blue"
      >
      <DataSearch
      	componentId="searchbox"
      	dataField={[
      		{
      			"field": "title",
      			"weight": 5
      		},
      		{
      			"field": "title.autosuggest",
      			"weight": 1
      		},
      		{
      			"field": "company",
      			"weight": 5
      		},
      		{
      			"field": "company.autosuggest",
      			"weight": 1
      		},
      		{
      			"field": "location",
      			"weight": 2
      		},
      		{
      			"field": "location.autosuggest",
      			"weight": 1
      		},
      	]}
      	placeholder="Search for a job, company name or location"
        />
      </ReactiveBase>
    </div>
  );
}

export default App;
