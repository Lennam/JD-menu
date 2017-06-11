$(document).ready(function () {
    var sub = $('#sub');

    var activeRow;
    var activeMenu;
    var timer;
    var mouseInSub = false;

    sub.on('mouseenter', function (e) {
        mouseInSub = true;
    })
    .on('mouseleave', function (e) {
        mouseInSub = false;
    })

    var mouseXYZ = [];
    var movePosition = function (e) {
        mouseXYZ.push({
            x: e.pageX,
            y: e.pageY
        });

        if (mouseXYZ.length > 3) {
            mouseXYZ.shift();
        };
    }

    $('#menu')
        .on('mouseenter', function (e) {
            // sub.removeClass('none');

            $(document).bind('mousemove', movePosition);
        })
        
        .on('mouseleave', function(e) {
            sub.addClass('none');

            if (activeRow) {
                activeRow.removeClass('active');
                activeRow = null;
            }
            if (activeMenu) {
                activeMenu.addClass('none');
                activeMenu = null;
            }
            $(document).unbind('mouseleave', movePosition);
        })
        .on('mouseenter', 'li', function (e) {
            sub.removeClass('none')
            if (!activeRow) {
                activeRow = $(e.target).addClass('active');
                activeRow.addClass('active');
                activeMenu = $('#' + activeRow.data('id'));
                activeMenu.removeClass('none');
                return;
            };

            if (timer) {
                clearTimeout(timer);
            };

            var nowMouseXYZ = mouseXYZ[mouseXYZ.length - 1];
            var lastMouseXYZ = mouseXYZ[mouseXYZ.length - 2];

            if (needTimer(sub, lastMouseXYZ, nowMouseXYZ)) {
                timer = setTimeout(function () {
                    if (mouseInSub) {
                        return;
                    }
                    activeRow.removeClass('active');
                    activeMenu.addClass('none');

                    activeRow = $(e.target);
                    activeRow.addClass('active');
                    activeMenu = $('#' + activeRow.data('id'));
                    activeMenu.removeClass('none');
                    timer = null;
                 }, 300);
            }else {
                var prevActiveRow = activeRow;
                var prevActiveMenu = activeMenu;

                activeRow = $(e.target);
                activeMenu = $('#' + activeRow.data('id'));

                prevActiveRow.removeClass('active');
                prevActiveMenu.addClass('none');

                activeRow.addClass('active');
                activeMenu.removeClass('none');
            };

        });
});