var dice = (function () {
    // create a k-sided die (values from 1—k)
    function roll_die(k) {
        function fn () {
            return Math.floor(Math.random() * k) + 1;
        }
        fn.range = { low: 1, high: k };
        return fn;
    }

    // roll n k-sided dice
    function roll_n_dice(n, die){
        function fn () {
            var sum = 0;
            for (var i = 0; i < n; i += 1) {
                sum += die();
            }
            return sum;
        }
        fn.range = { low: die.range.low * n, high: die.range.high * n };
        return fn;
    }

    function roll_normalized(roller) {
        var span = roller.range.high - roller.range.low;
        return function () {
            return (roller() - roller.range.low) / span;
        }
    }

    return {
        make_d: roll_die,
        make_set: roll_n_dice,
        normalize: roll_normalized
    };
}());

var d6 = dice.make_d(6);
var roll_3d6 = dice.make_set(3, d6);
var roll_3d6_normal = dice.normalize(roll_3d6);
