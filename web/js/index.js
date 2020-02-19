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

$("#copy_hex").click(function () {
    let rgb = $("#picker").css("background-color");
    copyText(rgb.colorHex());
});

$("#copy_rgb").click(function () {
    let rgb = $("#picker").css("background-color");
    rgb = rgb.substring(4);
    rgb = rgb.substring(0, rgb.length-1);
    copyText(rgb);
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

// 加密
function compressData(data){
    let cData;
    cData= encodeURIComponent(data);
    cData= unescape(cData);
    cData= window.btoa(cData);
    return cData;
}
// 解密
function decompressData(data){
    let cData;
    cData= window.atob(data);
    cData= escape(cData);
    cData= decodeURIComponent(cData);
    return cData;
}

$("#search_emojis").click(function () {
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
});

$("#copy_emojis").click(function () {
    copyText(search_emojis_result)
    alert(search_emojis_result)
});

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
