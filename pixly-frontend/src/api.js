"use strict";

const BASE_URL = 'http://localhost:5001';

class PixlyApi {


  /** POST request to PIXLY API to upload image. */

  static async upload(uploadData) {
    console.log(uploadData, "FILE AND AUTHOR API");
    const url = new URL(`${BASE_URL}/photo`);

    try {
      const resp = await fetch(url, {
        method: 'POST',
        body: uploadData,
      });
      console.log("Success!");
      return resp;
    } catch (error) {
      console.error("Upload failed:", error);
      return null;
    }
  }

  static async getAllPhotos() {
    const url = new URL(`${BASE_URL}/photos`);

    try {
      const resp = await fetch(url);
      const data = resp.json();
      console.log("Success!");

      return data;

    } catch (error) {
      console.error("Upload failed:", error);

      return null;
    }


  }






}




export default PixlyApi;
