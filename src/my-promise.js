export function MyPromise(executor) {
    this.state = "pending";
    this.onFulfilledCallbacks = [];
    this.onRejectedCallbacks = [];
    executor(
        data => {
            this.state = "resolved";
            this.value = data;
            this.onFulfilledCallbacks.forEach(callback => {
                callback(data);
            });
        },
        err => {
            this.state = "rejected";
            this.value = err;
            this.onRejectedCallbacks.forEach(callback => {
                callback(err);
            });
        }
    );
}

MyPromise.all = function(tasks = []) {
    return new Promise((resolve, reject) => {
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
MyPromise.prototype.then = function(onSuccess, onFail) {
    let callback = null;
    if (this.state === "resolved") {
        let newValue = onSuccess(this.value);
        callback(newValue);
    }
    if (this.state === "pending") {
        this.onFulfilledCallbacks.push(res => {
            let newValue = onSuccess(res);
            callback(newValue);
        });
        this.onRejectedCallbacks.push(error => {
            onFail(error);
        });
    }
    if (this.state === "rejected") {
        onFail(this.value);
    }
    return new Promise((resolve, reject) => {
        callback = data => {
            resolve(data);
        };
    });
};
