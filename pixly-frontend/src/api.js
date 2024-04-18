"use strict";

const BASE_URL = 'http://localhost:5001';

/** PixlyAPI class functionality to talk to API  */
class PixlyApi {


  /** POST request to PIXLY API to upload image. */

  static async upload(uploadData) {
    const url = new URL(`${BASE_URL}/photo`);

    try {
      const resp = await fetch(url, {
        method: 'POST',
        body: uploadData,
      });

      return resp;

    } catch (error) {

      return null;
    }
  }

  /** GET request to PIXLY API to get all images. */
  static async getAllPhotos() {
    const url = new URL(`${BASE_URL}/photos`);

    try {
      const resp = await fetch(url);
      const data = resp.json();

      return data;

    } catch (error) {

      return null;
    }

  }


}




export default PixlyApi;
