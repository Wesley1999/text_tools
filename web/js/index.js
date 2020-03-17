$(function () {
    load();
    Colorpicker.create({
        bindClass:'picker',
        change: function(elem,hex){
            // console.log(elem,hex)
            // elem.style.backgroundColor = hex;
            $("#text").css("color", hex);
            $("#picker").attr("fill", hex);
        }
    })
});

function copy() {
    copyText(get());
}

function copy_hex() {
    let rgb = $("#picker").css("fill");
    copyText(rgb.colorHex());
}

function copy_rgb() {
    let rgb = $("#picker").css("fill");
    rgb = rgb.substring(4);
    rgb = rgb.substring(0, rgb.length-1);
    copyText(rgb);
}

function post() {
    $.ajax({
        type: 'POST',
        url: "/post",
        data: "text="+encodeURIComponent(get()),
        success: function (returnData) {
            toast("ok")
        },
        error: function () {
            toast("error");
        }
    });
}

function load(async=true) {
    $.ajax({
        type: 'POST',
        url: "/get",
        async: async,
        success: function (returnData) {
            set(returnData);
            text_change();
        },
        error: function () {
            toast("加载失败")
        }
    });
    laydate.render({
        elem: '#timer', //指定元素
        type: "datetime",
        done: function(value){
            set(value);
        }
    });
}

function refresh() {
    let originalContent = get();
    load(false);
    if (get() === originalContent) {
        toast("不需要刷新");
    }
}

function escape_lt_gt() {
    let originalContent = get();
    set(get().replaceAll("<", "&lt;"));
    set(get().replaceAll(">", "&gt;"));
    if (get() === originalContent) {
        toast("不需要转义");
    }
}

function parsing_lt_gt() {
    let originalContent = get();
    set(get().replaceAll("&lt;", "<"));
    set(get().replaceAll("&gt;", ">"));
    if (get() === originalContent) {
        toast("不需要解析");
    }
}

function escape_and() {
    let originalContent = get();
    set(get().replaceAll("&", "&amp;"));
    if (get() === originalContent) {
        toast("不需要转义");
    }
}

function parsing_and() {
    let originalContent = get();
    set(get().replaceAll("&amp;", "&"));
    if (get() === originalContent) {
        toast("不需要解析");
    }
}

function show_more(target) {
    if ($("#hide").css("height") === "0px") {
        $(target).text("收起");
        $("#hide").css("display", "block");
        $("#hide").animate({height:$("#hide").prop('scrollHeight') + "px"}, 200);
    } else {
        $("#hide").animate({height:"0"}, 200);
        setTimeout(function () {
            $("#hide").css("display", "none")
        }, 150);
        $(target).text("展开");
    }
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
    try {
        cData = decodeURIComponent(cData);
    } catch (e) {
        toast("无法继续解密");
        return;
    }
    set(cData);
}

// 不能以clear作为函数名
function clear_text() {
    if (get() === "") {
        toast("已经是空的了！")
    }
    set("");
}

function random_md5() {
    set();
    for (let i = 0; i < 10; i++) {
        let s = $.md5(Math.random().toString());
        if ($("#md5_minus").text() === "-") {
            s = s.substring(0,8) + "-" + s.substring(8,12) + "-" + s.substring(12,16) + "-" + s.substring(16,20) + "-" + s.substring(20,32);
        }
        set(get()+s+"\n");
    }
    // for (let i = 0; i < 5; i++) {
    //     let s = $.md5(Math.random().toString());
    //     set(get()+"\n"+s);
    // }
}

function md5_encrypt() {
    let s = $.md5(get() + $("#md5_salt").val());
    if ($("#md5_minus").text() === "-") {
        s = s.substring(0, 8) + "-" + s.substring(8, 12) + "-" + s.substring(12, 16) + "-" + s.substring(16, 20) + "-" + s.substring(20, 32);
    }
    set(s)
}

function md5_minus_click() {
    if ($("#md5_minus").text() === "-") {
        $("#md5_minus").text("");
        toast("无连字符");
    } else {
        $("#md5_minus").text("-")
        toast("有连字符");
    }
}

function current_time_stamp() {
    set(new Date().getTime());
}

function time_stamp_to_time() {
    let timeStamp = parseInt(get());
    if (Number.isNaN(timeStamp) || timeStamp >= 1970 && timeStamp <= 3000) {
        toast("时间戳有误");
        return;
    }
    set(new Date(timeStamp).format("yyyy-MM-dd hh:mm:ss"));
}

function time_to_time_stamp() {
    let timeStamp = new Date(get()).getTime();
    if (Number.isNaN(timeStamp)) {
        toast("时间有误");
        return;
    }
    set(timeStamp)
}

function copyText(text) {
    let flag = false;
    let textarea = document.createElement("input");
    textarea.style.position = 'fixed';
    textarea.style.top = (document.documentElement.clientWidth / 2) + "px";
    textarea.style.left = (document.documentElement.clientHeight / 2) + "px";
    let currentFocus = document.activeElement;
    document.body.appendChild(textarea);
    textarea.value = text;
    textarea.focus();
    if (textarea.setSelectionRange) {
        textarea.setSelectionRange(0, textarea.value.length);
    } else {
        textarea.select();
    }
    try {
        flag = document.execCommand("copy");
    } catch (eo) {}
    document.body.removeChild(textarea);
    currentFocus.focus();
    toast(text + "\n已复制到剪切板");
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
    set(get()+"\n\n"+search_emojis_result);
    set(get().trim())
    if (search_emojis_result === "") {
        toast("搜索结果为空");
    }
}

function copy_emojis() {
    if (typeof search_emojis_result === "undefined" || search_emojis_result === "") {
        toast("请先搜索");
    } else {
        copyText(search_emojis_result);
    }
}

function translate1() {
    let originalContent = get();
    $.getJSON("https://api.66mz8.com/api/fanyi.php?info="+get(), function(json){
        set(json.fanyi)
        if (get() === originalContent) {
            toast("无法翻译");
        }
    });
}

function randomSentence() {
    let originalContent = get();
    $.getJSON("https://v1.hitokoto.cn/", function(json){
        set(json.hitokoto + "\n\n——" +json.from)
        if (get() === originalContent) {
            randomSentence();
        }
    });
}

function text_change() {
    let words = wordsCount(get());
    $("#timer").val(get());
    $("#wordsCount").text("字数："+words);
}

function font_size_change() {
    let fontSize = parseInt($("#font_size").val());
    if (fontSize >= 12 && fontSize <= 100) {
        $("#text").css("font-size", fontSize+"px");
    } else if (fontSize >= 1 && fontSize <= 11) {
        $("#text").css("font-size", "20px");
    } else {
        $("#text").css("font-size", "20px");
        toast("请输入12到100之间的数");
    }

}

String.prototype.replaceAll = function(s1, s2){
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
    msg = msg.replaceAll("\n", "<br>");
    layer.msg(msg, {
        time: time
        // btn: ['明白了', '知道了', '哦']
    });
}

//用word方式计算正文字数
function wordsCount(str){
    let sLen = 0;
    try{
        //先将回车换行符做特殊处理
        str = str.replace(/(\r\n+|\s+|　+)/g,"龘");
        //处理英文字符数字，连续字母、数字、英文符号视为一个单词
        str = str.replace(/[\x00-\xff]/g,"m");
        //合并字符m，连续字母、数字、英文符号视为一个单词
        str = str.replace(/m+/g,"*");
        //去掉回车换行符
        str = str.replace(/龘+/g,"");
        //返回字数
        sLen = str.length;
    }catch(e){

    }
    return sLen;
}
