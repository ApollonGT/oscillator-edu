const co = require('co');
const generate = require('node-chartist');

let x_fun = function(A, w, phi, t) {
    return A*Math.sin(w*t + phi);
}

let v_fun = function(A, w, phi, t) {
    return w*A*Math.cos(w*t + phi);
}

let a_fun = function(A, w, phi, t) {
    return -w*w*A*Math.sin(w*t + phi);
}

module.exports = function(res, data) {
    let A = 1;
    let w = 1;
    let phi = 0;

    co(function * () {
        const options = {
            width: 800,
            height: 600,
            showPoint: false,
            axisX: { title: 't (sec)' }
        };

        let t = [];

        for (i = 0; i < 6.4; i = i + 0.1) {
            t.push(i);
        }

        let x = [];
        let v = [];
        let a = [];
        let labels = [];

        t.forEach((i) => {
            x.push(x_fun(A, w, phi, i));
            v.push(v_fun(A, w, phi, i));
            a.push(a_fun(A, w, phi, i));
            if (i == 0) {
                labels.push('0');
            } else if (i > 3.1 && i < 3.2) {
                labels.push('pi');
            } else if (i > 6.2 && i < 6.3) {
                labels.push('2pi');
            } else {
                labels.push('');
            }
        })

        const line = yield generate('line', options, {
            labels: labels,
            series: [
                {name: 'x', value: x},
                {name: 'v', value: v},
                {name: 'a', value: a}
            ]
        });
        res.send(line);
    });
}
