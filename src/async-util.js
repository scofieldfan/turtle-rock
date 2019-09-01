function series(tasks, callback) {
    const result = [];
    for (let i = 0; i < tasks.length; i++) {
        tasks[i]((context, ret) => {
            result.push(ret);
        });
    }
    callback(result);
}
function sleep(time) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve();
        }, time);
    });
}

function retryAjax(url, num = 1) {
    if (num <= 0) {
        return Promise.reject(err);
    } else {
        return fetch(url)
            .then(res => {
                return res;
            })
            .catch(err => {
                return retryAjax(url, num - 1);
            });
    }
}

function myRequest(url, method, params) {
    return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest();
        xhr.open(method, url);
        xhr.onreadystatechange = () => {
            if (xhr.readyState != 4) {
                return;
            }
            if (xhr.state === 200) {
                resolve(xhr.response);
            }
        };
        xhr.addEventListener("error", e => {
            reject(error);
        });
        xhr.send(params);
    });
}
function cacheRequest(url, method = "get", params = {}) {
    let key = url + method + JSON.stringify(params);
    let cache = {};

    function send() {
        if (cache[key]) {
            return Promise.resolve(cache[key]);
        }
        let request = new Request(url);
        let init = {
            method: method
        };
        return fetch(request, init)
            .then(res => {
                cache[key] = res;
                return res;
            })
            .catch(error => {
                cache[key] = error;
                return error;
            });
    }
    return send;
}
function sendParallel(urls = [], num = 2) {
    let size = Math.min(urls.length, num);
    for (let i = 0; i < size; i++) {
        let url = urls.shift();
        num--;
        fetch(url)
            .then(res => {
                sendParallel(urls, num + 1);
            })
            .catch(error => {
                sendParallel(urls, num + 1);
            });
    }
}

const asyncUtil = {
    series,
    retryAjax,
    myRequest,
    cacheRequest,
    sendParallel,
    sleep
};

export { asyncUtil, retryAjax };
