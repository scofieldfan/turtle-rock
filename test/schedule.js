
import { Schedule } from '../lib/turtle.js';
import test from 'ava';
let createTask = (time, name) => {
    return () => {
        let start = new Date().toLocaleString();
        console.log(`Job ${name} start at ${start}`);
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                let end = new Date().toLocaleString();
                console.log(`Job ${name} done!! ${end}`);
                resolve();
            }, time);
        })
    }
};

test('bar', t => {
    let shedule = new Schedule();
    shedule.addTask(createTask(1000, "1"));
    shedule.addTask(createTask(8000, "2"));
    shedule.addTask(createTask(3000, "3"));
    shedule.addTask(createTask(6000, "4"));
    let start = new Date().toLocaleString();
    console.log(`start at ${start}`);
    t.pass();
});