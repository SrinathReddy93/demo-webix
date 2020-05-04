export function getUserData(url, cb){
  getJSON(url, data => cb(JSON.parse(data)));
}

function getJSON(url, callback) {
    let xhr = new XMLHttpRequest();
    xhr.onload = function () { 
      callback(this.responseText) 
    };
    xhr.open('GET', url, true);
    xhr.send();
}
