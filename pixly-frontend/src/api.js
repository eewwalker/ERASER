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
  static async getAllPhotos(q) {
    const url = new URL(`${BASE_URL}/photos`);

    if (q === null || q === undefined) {
      const resp = await fetch(url);
      const data = resp.json();
      return data;

    } else {

      try {
        url.searchParams.append('q', q);
        const resp = await fetch(url);
        const data = resp.json();
        return data;
      } catch (error) {

        return null;
      }
    }

  }

  /** POST request to edit photo to black&white or change rgb values */
  static async editPhoto({ imgId, rgbVals, convert_bw }) {
    const url = new URL(`${BASE_URL}/edit-photo/${imgId}`);

    try {
      const resp = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ rgb: rgbVals, convert_bw }),
      });

      if (!resp.ok) {
        throw new Error('Failed to edit photo');
      }
      return resp;

    } catch (error) {
      console.error("Error editing photo:", error);
      return null;
    }
  }

}

export default PixlyApi;
