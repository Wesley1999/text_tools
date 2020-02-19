str = '';
$.ajax({
    url: 'http://localhost:63342/text_transfer/web/new/3.html',
    type: "POST",
    // dataType: "html",
    success: function (returnData) {
        let array = new Array();
        $("body").append(returnData);
        $(".thumbnail").each(function (){
            let emoji = $(this).attr("data-clipboard-text");
            let title = $(this).children().next().attr("title");
            array.push(emoji);
            array.push(title);
        });
        // alert(array);
        // console.log(array)
        $(array).each(function () {
            str += '"'+this+'",';
        });
        $.ajax({
            url: 'http://localhost:63342/text_transfer/web/new/4.html',
            type: "POST",
            // dataType: "html",
            success: function (returnData) {
                let array = new Array();
                $("body").append(returnData);
                $(".thumbnail").each(function (){
                    let emoji = $(this).attr("data-clipboard-text");
                    let title = $(this).children().next().attr("title");
                    array.push(emoji);
                    array.push(title);
                });
                // alert(array);
                // console.log(array)
                $(array).each(function () {
                    str += '"'+this+'",';
                });
                $.ajax({
                    url: 'http://localhost:63342/text_transfer/web/new/5.html',
                    type: "POST",
                    // dataType: "html",
                    success: function (returnData) {
                        let array = new Array();
                        $("body").append(returnData);
                        $(".thumbnail").each(function (){
                            let emoji = $(this).attr("data-clipboard-text");
                            let title = $(this).children().next().attr("title");
                            array.push(emoji);
                            array.push(title);
                        });
                        // alert(array);
                        // console.log(array)
                        $(array).each(function () {
                            str += '"'+this+'",';
                        });
                        $.ajax({
                            url: 'http://localhost:63342/text_transfer/web/new/6.html',
                            type: "POST",
                            // dataType: "html",
                            success: function (returnData) {
                                let array = new Array();
                                $("body").append(returnData);
                                $(".thumbnail").each(function (){
                                    let emoji = $(this).attr("data-clipboard-text");
                                    let title = $(this).children().next().attr("title");
                                    array.push(emoji);
                                    array.push(title);
                                });
                                // alert(array);
                                // console.log(array)
                                $(array).each(function () {
                                    str += '"'+this+'",';
                                });
                                $.ajax({
                                    url: 'http://localhost:63342/text_transfer/web/new/7.html',
                                    type: "POST",
                                    // dataType: "html",
                                    success: function (returnData) {
                                        let array = new Array();
                                        $("body").append(returnData);
                                        $(".thumbnail").each(function (){
                                            let emoji = $(this).attr("data-clipboard-text");
                                            let title = $(this).children().next().attr("title");
                                            array.push(emoji);
                                            array.push(title);
                                        });
                                        // alert(array);
                                        // console.log(array)
                                        $(array).each(function () {
                                            str += '"'+this+'",';
                                        });
                                        $.ajax({
                                            url: 'http://localhost:63342/text_transfer/web/new/8.html',
                                            type: "POST",
                                            // dataType: "html",
                                            success: function (returnData) {
                                                let array = new Array();
                                                $("body").append(returnData);
                                                $(".thumbnail").each(function (){
                                                    let emoji = $(this).attr("data-clipboard-text");
                                                    let title = $(this).children().next().attr("title");
                                                    array.push(emoji);
                                                    array.push(title);
                                                });
                                                // alert(array);
                                                // console.log(array)
                                                $(array).each(function () {
                                                    str += '"'+this+'",';
                                                });
                                                $.ajax({
                                                    url: 'http://localhost:63342/text_transfer/web/new/9.html',
                                                    type: "POST",
                                                    // dataType: "html",
                                                    success: function (returnData) {
                                                        let array = new Array();
                                                        $("body").append(returnData);
                                                        $(".thumbnail").each(function (){
                                                            let emoji = $(this).attr("data-clipboard-text");
                                                            let title = $(this).children().next().attr("title");
                                                            array.push(emoji);
                                                            array.push(title);
                                                        });
                                                        // alert(array);
                                                        // console.log(array)
                                                        $(array).each(function () {
                                                            str += '"'+this+'",';
                                                        });
                                                        alert(str)
                                                        console.log(str)
                                                        alert(str)
                                                    },
                                                    error: function () {
                                                    }
                                                });
                                            },
                                            error: function () {
                                            }
                                        });
                                    },
                                    error: function () {
                                    }
                                });
                            },
                            error: function () {
                            }
                        });
                    },
                    error: function () {
                    }
                });
            },
            error: function () {
            }
        });
    },
    error: function () {
    }
});


