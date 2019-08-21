const array = {

    flush(num = []) {
        for (let i = 0; i < num.length; i++) {
            let index = Math.floor(Math.random() * (num.length - 1));
            let temp = num[i];
            num[i] = num[index];
            num[index] = temp;
        }
    }


}
export {
    array
};
