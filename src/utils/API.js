class API {
  static post(url,formdata) {
    var headers = {
      'Content-Type': 'application/json',
    };
    console.log('data which are going');
    console.log(JSON.stringify(formdata));
    return new Promise(function(resolve, reject) {
       return fetch(url,{
       method: 'POST',
       headers: headers,
       body: JSON.stringify(formdata),
    })
      .then((response) => {
            return {responseCode:response.status,responseBody:response.json()}
          })
      .then((responseJson) => {
        resolve(responseJson.responseBody);
      })
      .catch((error) => {
        reject(error)
      })
    })
  }
}
export default API;
