(function () {
    var $num = $('.counterLeft .num'),
        $procedure = $('.procedure'),
        $result = $('.result'),
        isRepeat = true,
        numArry = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, '.'];

    // 输出随机数字
    (function() {
        for (var i = 0, len = $num.length; i < len; i++) {
            var index = Math.floor(Math.random() * numArry.length);
            $num.eq(i).text(numArry[index]);
            numArry.splice(index, 1);
        }
    })();

    // 鼠标点击事件
    $('.counterContent').on('click', 'a', function () {
        var txt = $(this).text();
        switch (txt) {
            case 'C':
                $procedure.text(0);
                break;
            case 'AC':
                $procedure.text(0);
                $result.text('');
                break;
            case '=':
                try {
                    $result.text(eval($procedure.text()));
                } catch (err) {
                    console.log(err);
                }
                break;
            case '←':
                if ($procedure.text().length > 0) {
                    if ($procedure.text().length != 1) {
                        $procedure.text($procedure.text().substr(0, $procedure.text().length - 1));
                    } else {
                        $procedure.text(0);
                    }
                }
                isRepeat = true;
                break;
            default :
                if (txt == '+' || txt == '-' || txt == '*' || txt == '/') {
                    if (!isRepeat) break;
                    $procedure.text() == 0 && $procedure.text('');
                    $procedure.text($procedure.text() + txt);
                    isRepeat = false;
                } else {
                    $procedure.text() == 0 && $procedure.text('');
                    $procedure.text($procedure.text() + txt);
                    isRepeat = true;
                }
        }
    });
})();
