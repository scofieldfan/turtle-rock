
export function MyPromise(fun) {

    this.state = "pending";
    this.onFulfilledCallbacks = [];
    this.onRejectedCallbacks = [];
    fun((data) => {
        this.state = "resolved"
        this.onFulfilledCallbacks.forEach((callback) => {
            callback(data);
        })
    }, () => {
        this.state = "rejected"
        this.onRejectedCallbacks.forEach((callback) => {
            callback();
        })
    });

}


MyPromise.prototype.then = function (onSuccess, onFail) {

    if (this.state === "resolved") {
        onSuccess(this.value);
    }
    if (this.state === "pending") {
        this.onFulfilledCallbacks.push(() => {
            onSuccess(this.value)
        });
        this.onRejectedCallbacks.push(() => {
            onFail(this.value)
        });
    }
    if (this.state === "rejected") {
        onFail(this.value);
    }



}

