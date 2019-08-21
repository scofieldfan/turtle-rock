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
    }
}
export {
    request
}