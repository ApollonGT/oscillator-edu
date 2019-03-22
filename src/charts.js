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

module.exports = function(req, res) {
    let A = parseFloat(req.query.A);
    let w = parseFloat(req.query.w);
    let phi = parseFloat(req.query.phi);

    co(function * () {
        const options = {
            width: 600,
            height: 400,
            showPoint: false,
            axisX: { title: 't (sec)' },
            low: -5,
            high: 5
        };

        let t = [];

        for (i = 0; i < 6.4; i = i + 0.05) {
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
