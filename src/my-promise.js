export function MyPromise(executor) {
    this.state = "pending";
    this.onFulfilledCallbacks = [];
    this.onRejectedCallbacks = [];
    executor(
        //resolve函数
        data => {
            this.state = "resolved";
            this.value = data;
            this.onFulfilledCallbacks.forEach(callback => {
                callback(data);
            });
        },
        //reject函数
        err => {
            this.state = "rejected";
            this.value = err;
            this.onRejectedCallbacks.forEach(callback => {
                callback(err);
            });
        }
    );
}

function wrapCall(value, onSuccess, successCallback, failCallback) {
    try {
        successCallback(onSuccess(value));
    } catch (error) {
        failCallback(error);
    }
}
MyPromise.prototype.then = function(onSuccess, onFail) {
    let successCallback = null;
    let failCallback = null;

    if (this.state === "pending") {
        this.onFulfilledCallbacks.push(res => {
            wrapCall(res, onSuccess, successCallback, failCallback);
        });
        this.onRejectedCallbacks.push(error => {
            if (onFail) {
                wrapCall(error, onFail, successCallback, failCallback);
            }
        });
    }

    return new MyPromise((resolve, reject) => {
        successCallback = data => {
            resolve(data);
        };
        failCallback = error => {
            reject(error);
        };
        if (this.state === "resolved") {
            wrapCall(this.value, onSuccess, successCallback, failCallback);
        }
        if (this.state === "rejected") {
            wrapCall(this.value, onFail, successCallback, failCallback);
        }
    });
};

MyPromise.all = function(tasks = []) {
    return new MyPromise((resolve, reject) => {
        let result = [];
        let successNum = 0;
        let failNum = 0;
        for (let i = 0; i < tasks.length; i++) {
            tasks
                .then(res => {
                    result[i] = res;
                    successNum++;
                    checkResult();
                })
                .catch(err => {
                    result[i] = err;
                    failNum++;
                    checkResult();
                });
        }
        function checkResult() {
            if (successNum + failNum === tasks.length) {
                if (successNum === tasks.length) {
                    resolve(...result);
                } else {
                    reject(...result);
                }
            }
        }
    });
};
