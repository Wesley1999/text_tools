$(function () {
    $.ajax({
        type: 'POST',
        url: "/get",
        success: function (returnData) {
            set(returnData)
        }
    });
});

function copy() {
    copyText(get());
}

function copy_hex() {
    let rgb = $("#picker").css("background-color");
    copyText(rgb.colorHex());
}

function copy_rgb() {
    let rgb = $("#picker").css("background-color");
    rgb = rgb.substring(4);
    rgb = rgb.substring(0, rgb.length-1);
    copyText(rgb);
}

function post() {
    $.ajax({
        type: 'POST',
        url: "/post",
        data: "text="+get(),
        success: function (returnData) {
            toast("ok")
        }
    });
}

function refresh() {
    location.reload();
}

function escape_lt_gt() {
    set(get().replaceAll("<", "&lt;"));
    set(get().replaceAll(">", "&gt;"))
}

function parsing_lt_gt() {
    set(get().replaceAll("&lt;", "<"));
    set(get().replaceAll("&gt;", ">"));
}

function escape_and() {
    set(get().replaceAll("&", "&amp;"));
}

function parsing_and() {
    set(get().replaceAll("&amp;", "&"));
}

// function escape_html() {
//     var temp = document.createElement("div");
//     (temp.textContent != null) ? (temp.textContent = get()) : (temp.innerText = get());
//     var output = temp.innerHTML;
//     temp = null;
//     set(output);
// }
//
// function parsing_html() {
//     var temp = document.createElement("div");
//     temp.innerHTML = get();
//     var output = temp.innerText || temp.textContent;
//     temp = null;
//     set(output);
// }


function aes_encrypt() {
    let cData = encodeURIComponent(get());
    cData = unescape(cData);
    cData = window.btoa(cData);
    set(cData)
}

function aes_decrypt() {
    let cData = window.atob(get());
    cData = escape(cData);
    cData = decodeURIComponent(cData);
    set(cData)
}

// 不能以clear作为函数名
function clear_text() {
    set("");
}

function random_md5() {
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
}

function md5_encrypt() {
    let s = $.md5(get());
    set(s+"\n\n")
    s = s.substring(0,8) + "-" + s.substring(8,12) + "-" + s.substring(12,16) + "-" + s.substring(16,20) + "-" + s.substring(20,32);
    set(get()+s)
}

function current_time_stamp() {
    set(new Date().getTime());
}

function time_stamp_to_time() {
    set(new Date(parseInt(get())).format("yyyy-MM-dd hh:mm:ss"))
}

function time_to_time_stamp() {
    set(new Date(get()).getTime())
}

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
        toast(text)
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

function search_emojis() {
    search_emojis_result = "";
    set(get().trim());
    let originalText = get();
    if (originalText == "" || originalText == "，" || originalText == " ") {
        return;
    }
    for (let i = 1; i < emojis.length; i+=2) {
        if (emojis[i].indexOf(originalText) != -1) {
            search_emojis_result += emojis[i-1]
        }
    }
    set(get()+"\n\n"+search_emojis_result)
    set(get().trim())
}

function copy_emojis() {
    if (search_emojis_result != "") {
        copyText(search_emojis_result);
    }
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
};

// 颜色转换
String.prototype.colorHex = function(){
    var that = this;
    //十六进制颜色值的正则表达式
    var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
    // 如果是rgb颜色表示
    if (/^(rgb|RGB)/.test(that)) {
        var aColor = that.replace(/(?:\(|\)|rgb|RGB)*/g, "").split(",");
        var strHex = "#";
        for (var i=0; i<aColor.length; i++) {
            var hex = Number(aColor[i]).toString(16);
            if (hex.length < 2) {
                hex = '0' + hex;
            }
            strHex += hex;
        }
        if (strHex.length !== 7) {
            strHex = that;
        }
        return strHex;
    } else if (reg.test(that)) {
        var aNum = that.replace(/#/,"").split("");
        if (aNum.length === 6) {
            return that;
        } else if(aNum.length === 3) {
            var numHex = "#";
            for (var i=0; i<aNum.length; i+=1) {
                numHex += (aNum[i] + aNum[i]);
            }
            return numHex;
        }
    }
    return that;
};

function toast(msg, time=2000, parse=false) {
    if (!parse) {
        msg = msg.replaceAll("&", "&amp;");
        msg = msg.replaceAll(">", "&gt;");
        msg = msg.replaceAll("<", "&lt;")
    }
    layer.msg(msg, {
        time: time
        // btn: ['明白了', '知道了', '哦']
    });
}
