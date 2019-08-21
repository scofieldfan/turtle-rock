const request = {
    sendSeqRequest(requests = []) {
        let result = [];
        function print(ary) {
            for (let i = 0; i < ary.length; i++) {
                if (!ary[i]) {
                    return;
                }
                if (!ary[i].isPrint) {
                    ary[i].data.isPrint = true;
                    console.log(ary[i].data);
                }
            }
        }
        requests.forEach((url, i) => {
            fetch(url).then((res) => {
                result[i].data = res;
                result[i].isPrint = false;
                print(result);
            }).catch((err) => {
                result[i].data = err;
                result[i].isPrint = false;
                print(result);
            })


        })

    },
    retryAjax(url, retryTimes = 1) {
        function helper(url, times, err) {

            let num = times;
            console.log("call helper,:", num);
            if (num <= 0) {
                return Promise.reject(err);
            } else {
                return fetch(url).then((res) => {
                    return res;
                }).catch((err) => {
                    return helper(url, num - 1, err);
                })
            }
        }
        return helper(url, retryTimes);
    },
    request(url, method, params) {
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
            }
            xhr.addEventListener('error', e => {
                reject(error);
            });
            xhr.send(params);

        })
    },
    cacheRequest(url, method = "get", params = {}) {
        let key = url + method + JSON.stringify(params);
        let cache = {};

        function send() {
            if (cache[key]) {
                return Promise.resolve(cache[key]);
            }
            let request = new Request(url);
            let init = {
                method: method
            }
            return fetch(request, init).then((res) => {
                cache[key] = res;
                return res;
            }).catch((error) => {
                cache[key] = error;
                return error;
            })
        }
        return send;
    },
    sendParallel(urls = [], max = 1) {

        function helper(requests, num) {
            let size = Math.min(requests.length, num);
            for (let i = 0; i < size; i++) {
                let url = requests.shift();
                num--;
                fetch(url).then((res) => {
                    sendParallel(requests, num + 1);
                }).catch((error) => {
                    sendParallel(requests, num + 1);
                })
            }
        }
        helper(urls, max);

    }
}
export {
    request
}