const asyncUtil = {
    series(tasks, callback) {
        const result = [];
        for (let i = 0; i < tasks.length; i++) {
            tasks[i]((context, ret) => {
                result.push(ret);
            });
        }
        callback(null, result);
    }
};

export { asyncUtil };
