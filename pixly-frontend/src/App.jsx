import React from "react";
import { BrowserRouter } from "react-router-dom";
import RouteList from "./RouteList";
import PixlyApi from "./api";
import NavBar from "./NavBar";
import Photo from "./Photo";

/** Component for entire page.
 *
 * Props: none
 * State: none
 *
 */
const App = () => {
  async function handleSave(uploadData) {
    let resp;

    console.log("uploadData:", uploadData);

    try {
      resp = await PixlyApi.upload(uploadData);
    } catch (err) {
      console.log(err);
    }
    console.log("resp in app", resp);
    return resp;
  }

  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />
        <RouteList handleSave={handleSave} />
      </BrowserRouter>
    </div>
  );
};

export default App;
