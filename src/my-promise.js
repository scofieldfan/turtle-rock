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
