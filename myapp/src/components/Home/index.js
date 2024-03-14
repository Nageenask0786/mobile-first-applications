import { useState, useEffect } from "react";

import { TailSpin } from "react-loader-spinner";

import Header from "../Header";

import "./index.css";

const apiStatusConstants = {
  initial: "INITIAL",
  success: "SUCCESS",
  inProgress: "IN_PROGRESS",
  failure: "FAILURE",
};

const Home = () => {
  const [jokes, setJokes] = useState([]);
  const [apiStatus, setApiStatus] = useState(apiStatusConstants.initial);
  useEffect(() => {
    const fetchJokes = async () => {
      try {
        setApiStatus(apiStatusConstants.inProgress);
        const apiUrl = `https://v2.jokeapi.dev/joke/Any?amount=10`;
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
  }, []);

  console.log(jokes);

  const renderSuccessView = () => (
   
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
    
  );

  const renderLoadingView = () => (
    <>
      <TailSpin
        visible={true}
        height="50"
        width="40"
        color="#0000FF"
        radius={2}
      />
    </>
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
      <Header />
      <div className="home-container d-flex justify-content-center align-items-center">
        {renderFinalHomeView()}
      </div>
    </div>
  );
};

export default Home;
