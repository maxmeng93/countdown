// 倒计时
var countDown = function (userOptions) {

    var countDown = {};
    
    var options = {
        digitImages: 6,
        digitWidth: 67 * 2,
        digitHeight: 90 * 2,
        time: 0, // 毫秒
        startTime: '00:00:0',
        timerEnd: function () {} // 
    };

    var digits = $('.cntDigit'), // 倒计时数字元素
        timer = null;

    // 设置时间
    countDown.setTime = function (time) {
        countDown.reset();
        options.time = time;
        countDown.createDigits();
    };

    // 根据 startTime 绘制数字
    countDown.createDigits = function (stop) {
        var current = 0;
        options.startTime = transform(options.time).replace(/:/g, '');
        for (var i = 0; i < options.startTime.length; i++) {
            current = parseInt(options.startTime[i]);
            
            if (stop) {
                margin(i, '-9900');
            } else {
                margin(i, -current * options.digitHeight * options.digitImages);
            }

        }
    };

    // 设置数字图片的位置
    var margin = function(i, val) {
        if (val !== undefined) {
            digits.eq(i).css({
                'backgroundPosition': '0 ' + val + 'px'
            });
        }
    };

    // 时间转换
    var transform = function (time) {
        var ms = parseInt(time % 1000);
        var s = parseInt((time / 1000) % 60);
        var m = parseInt(time / 1000 / 60);
        // console.log(add0(m, 2) + ':' + add0(s, 2) + ':' + add0(ms, 3));
        return add0(m, 2) + ':' + add0(s, 2) + ':' + add0(ms, 3);
    };

    // 数字前补0
    var add0 = function (num, i) {
        var str = Array(i + 1).join('0');
        return (str + num).slice(-i);
    };

    // 开始倒计时
    countDown.start = function () {
        if (timer) return;
        if (options.time <= 0) {
            clearInterval(timer);
            return;
        }
        timer = setInterval(function() {
            if (options.time <= 0) {
                clearInterval(timer);
                timer = null;
                myCountDown.createDigits(true);
                return;
            }
            options.time = options.time - 100;
            myCountDown.createDigits();
        }, 100);
    };

    // 停止
    countDown.stop = function () {
        clearInterval(timer);
        timer = null;
    };

    // 重置
    countDown.reset = function () {
        options.time = 0;
        clearInterval(timer);
        myCountDown.createDigits();
        timer = null;
    };

    return countDown;
};