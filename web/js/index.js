$(function () {
    $.ajax({
        type: 'POST',
        url: "/get",
        success: function (returnData) {
            set(returnData)
        }
    });
});

$("#copy").click(function () {
    copyText(get());
});

$("#post").click(function () {
    $.ajax({
        type: 'POST',
        url: "/post",
        data: "text="+get(),
        success: function (returnData) {
            alert("ok")
        }
    });
});

$("#escape_lt_gt").click(function () {
    set(get().replaceAll("<", "&lt;"));
    set(get().replaceAll(">", "&gt;"))
});

$("#parsing_lt_gt").click(function () {
    set(get().replaceAll("&lt;", "<"));
    set(get().replaceAll("&gt;", ">"))
});

$("#escape_and").click(function () {
    set(get().replaceAll("&", "&amp;"));
});

$("#parsing_and").click(function () {
    set(get().replaceAll("&amp;", "&"));
});

$("#compress").click(function () {
    set(compressData(get()))
});

$("#decompress").click(function () {
    set(decompressData(get()))
});

$("#clear").click(function () {
    set();
});

$("#random_md5").click(function () {
    set();
    for (let i = 0; i < 5; i++) {
        let s = $.md5(Math.random().toString());
        s = s.substring(0,8) + "-" + s.substring(8,12) + "-" + s.substring(12,16) + "-" + s.substring(16,20) + "-" + s.substring(20,32);
        set(get()+s+"\n");
    }
    for (let i = 0; i < 5; i++) {
        let s = $.md5(Math.random().toString());
        set(get()+"\n"+s);
    }
});

$("#time_stamp").click(function () {
    set(new Date().getTime());
});

$("#time_stamp_to_time").click(function () {
    set(new Date(parseInt(get())).format("yyyy-MM-dd hh:mm:ss"))
});

$("#time_to_time_stamp").click(function () {
    set(new Date(get()).getTime())
});

function copyText(text) {
    var textarea = document.createElement("input");//创建input对象
    var currentFocus = document.activeElement;//当前获得焦点的元素
    document.body.appendChild(textarea);//添加元素
    textarea.value = text;
    textarea.focus();
    if (textarea.setSelectionRange)
        textarea.setSelectionRange(0, textarea.value.length);//获取光标起始位置到结束位置
    else
        textarea.select();
    try {
        var flag = document.execCommand("copy");//执行复制
    } catch (eo) {
        var flag = false;
    }
    document.body.removeChild(textarea);//删除元素
    currentFocus.focus();
    return flag;
}

function get() {
    return $("#text").val();
}

function set(text) {
    $("#text").val(text);
}

// 压缩
function compressData(data){
    var cData;
    cData= encodeURIComponent(data);
    cData= unescape(cData);
    cData= window.btoa(cData);
    return cData;
}
// 解压
function decompressData(data){
    var cData;
    cData= window.atob(data);
    cData= escape(cData);
    cData= decodeURIComponent(cData);
    return cData;
}

String.prototype.replaceAll = function(s1,s2){
    return this.replace(new RegExp(s1,"gm"),s2);
};

Date.prototype.format = function (fmt) {
    var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}