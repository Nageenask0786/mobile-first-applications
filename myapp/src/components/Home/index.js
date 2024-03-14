import { useState, useEffect } from "react";

import { TailSpin } from "react-loader-spinner";

import Header from "../Header";

import "./index.css";
import Filters from "../Filters";

const apiStatusConstants = {
  initial: "INITIAL",
  success: "SUCCESS",
  inProgress: "IN_PROGRESS",
  failure: "FAILURE",
};

const Home = () => {
  const [jokes, setJokes] = useState([]);
  const [apiStatus, setApiStatus] = useState(apiStatusConstants.initial);
  const [language,setLanguage] = useState("en")
  const [searchInput,setSearchText] = useState("")
  const [category,setCategory] = useState("Any")
  const changeCategory = (value) => {
    setCategory(value)
  }
  const getSearchText = (value) => {
    setSearchText(value)
  }
  const changeLanguage = (value) => {
    setLanguage(value)
  }
  useEffect(() => {
    const fetchJokes = async () => {
      try {
        setApiStatus(apiStatusConstants.inProgress);
        const apiUrl = `https://v2.jokeapi.dev/joke/${category}?amount=10&lang=${language}&contains=${searchInput}`;
        const response = await fetch(apiUrl);
        if (response.ok) {
          const data = await response.json();
          const { jokes } = data;
          const formattedJokes = jokes.map((eachJoke) => {
            if (eachJoke.joke !== undefined) {
              return {
                id: eachJoke.id,
                joke: eachJoke.joke,
              };
            } else {
              return {
                id: eachJoke.id,
                joke: `${eachJoke.setup} ${eachJoke.delivery}`,
              };
            }
          });
          setJokes(formattedJokes);
          setApiStatus(apiStatusConstants.success);
        } else {
          setApiStatus(apiStatusConstants.failure);
        }
      } catch (e) {
        console.log(`Error while fectching jokes${e}`);
        setApiStatus(apiStatusConstants.failure);
      }
    };
    fetchJokes();
  }, [language,searchInput,category]);

  console.log(jokes);

  const renderSuccessView = () => (
    <div className="home-container d-flex flex-column justify-content-center align-items-center">
<Filters language = {language} changeLanguage = {changeLanguage} category = {category} changeCategory = {changeCategory}/>

      <table>
        <thead>
          <tr>
            <th>S.No</th>
            <th>Joke</th>
          </tr>
        </thead>
        <tbody>
          {jokes.map((each) => (
            <tr key={each.id}>
              <td>{each.id}</td>
              <td>{each.joke || (each.setup && each.delivery)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    
  );

  const renderLoadingView = () => (
    <div className="home-container d-flex justify-content-center align-items-center">
      <TailSpin
        visible={true}
        height="50"
        width="40"
        color="#0000FF"
        radius={2}
      />
    </div>
  );

  const renderFailureView = () => <>FAilure</>;
  const renderFinalHomeView = () => {
    switch (apiStatus) {
      case apiStatusConstants.success:
        return renderSuccessView();
      case apiStatusConstants.inProgress:
        return renderLoadingView();
      case apiStatusConstants.failure:
        return renderFailureView();
      default:
        return null;
    }
  };

  return (
    <div className="home-route bg-white vh-100">
      <Header searchInput={searchInput} getSearchText = {getSearchText}/>
      <>
        {renderFinalHomeView()}
      </>
    </div>
  );
};

export default Home;
