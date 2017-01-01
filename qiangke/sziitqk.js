// ==UserScript==
// @name         深信院抢课插件
// @homepage     http://bbs.sxisa.com #### http://deboy.cn
// @version      3.0
// @description  深圳信息职业技术学院-chorme抢课插件
// @author       hancel.lin & Deboy
// @match        http://10.16.40.56/*
// @grant        none
// ==/UserScript==

var user = "学号";
var pwd = "密码";
parent.frames.length = 1;
var number = [1,2,103,104,123,124];//需要选课的课号列表 优先级从左到右 不限数目 用逗号隔开
var doc = document.createElement("iframe");
doc.id = "flash";
doc.style.display = "none";
if(user == "学号" || pwd == "密码")
{
    alert("你忘记改学号密码了~看看使用说明吧~");
    window.opener=null;
    window.open('','_self');
    window.close();
}
var old_alert = alert;
alert = function(){};
window.onload=function(){};
doc.onload = function(){
    alert = old_alert;
    var locc = doc.contentWindow.location;
    var docc = doc.contentDocument;
    setTimeout(function(){
        if(locc.href.indexOf("zdy.htm") > 0 && docc.referrer == "") locc = "http://10.16.40.56/default2.aspx";
        else if(locc.href.indexOf("zdy.htm") > 0 && (locc.href.indexOf("default2.aspx") > 0 || locc.href.indexOf("xsmainfs"))) 
            history.go(-1);
        if(locc.href.indexOf("10.16.40.56/default2.aspx") > 0 || locc.href == "http://10.16.40.56/"){
            docc.getElementById("yh").value = user;
            docc.getElementById("kl").value = pwd;
            docc.getElementById("RadioButtonList1_0").click();
            docc.getElementById("CheckBox1").checked = true;
            docc.getElementById("Button1").click();
        }
        else if(locc.href.indexOf("http://10.16.40.56/xsmainfs.aspx?xh=") >= 0)
        {
            location = "http://10.16.40.56/xsxk.aspx?xh=" + user + "&lb=1";
        }
        else if(locc.href.indexOf("zdy.htm") >= 0 && locc.href.indexOf("xsxk.aspx") > 0)
        {
            location = "http://10.16.40.56/xsxk.aspx?xh=" + user + "&lb=1";
        }
        else if(locc.href == "http://10.16.40.56/xsxk.aspx?xh=" + user + "&lb=1")
        {
            var Trs = document.getElementById("table2").getElementsByTagName("table")[1].getElementsByTagName("tr");
            var bsubmit = false;
            for(var k=0;k<number.length;k++){
                var n = 1;
                for(var i = 1; i < Trs.length;i += 18)
                {
                    var Tds = Trs[1].getElementsByTagName("td");
                    if(number[k] > 0 && parseInt(Tds[11].innerText) == number[k] && parseInt(Tds[7].innerText) > 0)
                    {
                            Tds[10].getElementsByTagName("input")[0].click();
                            number[k]=0;
                            bsubmit = true;
                            document.getElementById("Button1").click();
                    }
                    n++;
                }
            }

            if(!bsubmit){
                alert("哎呀，你要选的课程名额全都没有啦，赶紧修改课号列表哦！");
                return false;
            }
        }
    }, 500);
};
if(location.href.indexOf("zdy.htm") > 0 && document.referrer == "") location = "http://10.16.40.56/default3.aspx";
if(location.href == "http://10.16.40.56/xsxk.aspx?xh=" + user + "&lb=1")
{
    var Trs = document.getElementById("table2").getElementsByTagName("table")[1].getElementsByTagName("tr");
    var bsubmit = false;
    for(var k=0;k<number.length;k++){
        var n = 1;
        for(var i = 1; i < Trs.length;i += 18)
        {
            var Tds = Trs[1].getElementsByTagName("td");
            if(number[k] > 0 && parseInt(Tds[11].innerText) == number[k] && parseInt(Tds[7].innerText) > 0)
            {
                    Tds[10].getElementsByTagName("input")[0].click();
                    number[k]=0;
                    bsubmit = true;
                    document.getElementById("Button1").click();
            }
            n++;
        }
    }

    if(!bsubmit){
        old_alert("哎呀，你要选的课程名额全都没有啦，赶紧修改课号列表哦！");
    }
}
if(location.href.indexOf("default3.aspx") > 0 || location.href == "http://10.16.40.56/")
{
    console.log("开始后台刷新！");
    document.write("开始抢课！后台刷新中...");
    document.body.appendChild(doc);
    doc.src = "http://10.16.40.56/default2.aspx";
}
