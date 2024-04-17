import React from "react";
import { BrowserRouter } from "react-router-dom";
import RouteList from "./RouteList";
import PixlyApi from "./api";
import NavBar from "./NavBar";

/** Component for entire page.
 *
 * Props: none
 * State: none
 *
 */
const App = () => {
  
  async function handleSave(uploadData) {
    let resp;
    const file = uploadData.file;
    const author = uploadData.author;

    console.log(
      "uploadData:",uploadData,
      "file in app:", file,
      "author in app:", author);

    try {
      resp = await PixlyApi.upload(file, author);
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
