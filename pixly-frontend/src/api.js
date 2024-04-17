"use strict";

const BASE_URL = 'http:localhost:5001';


class PixlyApi {

  static async request(endpoint, data = {}, method = "GET") {
    const url = new URL(`${BASE_URL}/${endpoint}`);

    // const resp = await fetch(`${BASE_URL}/photo`, {
    //   method: "POST",
    //   mode: 'cors',
    //   body: formData
    // });
    const options = {
      method: method,
      mode: 'no-cors',
      headers: {}
    };

    url.search = (method === "GET")
      ? new URLSearchParams(data).toString()
      : "";

    // set to undefined since the body property cannot exist on a GET method
    if (method !== 'GET' && data.file) {
      const formData = new FormData();

      formData.append('file', data.file);
      formData.append('author', data.author);
      options.body = formData;
    } else if (method !== 'GET') {
      options.headers['Content-Type'] = 'application/json';
      options.body = JSON.stringify(data);
    }

    // const body = (method !== "GET")
    //   ? JSON.stringify(formData)
    //   : undefined;

    const resp = await fetch(url, options);

    if (!resp.ok) {
      console.error("API Error:", resp.statusText, resp.status);
      const message = (await resp.json()).error.message;
      throw Array.isArray(message) ? message : [message];
    }

    return await resp.json();
  }



  /** POST request to PIXLY API to upload image. */

  static async upload(file, author) {
    try {
      return await this.request('photo', { file, author }, 'POST');
    } catch (error) {
      console.error("Upload failed:", error);
      return null;
    }
  }
}


export default PixlyApi;
