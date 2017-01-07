// ==UserScript==
// @name         深信院抢课插件
// @homepage     http://bbs.sxisa.com #### http://deboy.cn
// @version      3.0
// @description  深圳信息职业技术学院-chorme抢课插件
// @author       hancel.lin & Deboy
// @match        http://10.16.40.56/*
// @grant        none
// ==/UserScript==


/***
 *修复不能打勾和提交
 * @author 陈健乐
 * @type {string}
 */




var user = "学号";
var pwd = "密码";
parent.frames.length = 1;
var number = [180,91];//需要选课的课号列表 优先级从左到右 不限数目 用英文符号的逗号隔开
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

function __doPostBack(eventTarget, eventArgument) {
    var theform;
    if (window.navigator.appName.toLowerCase().indexOf("microsoft") > -1) {
        theform = document.Form1;
    }
    else {
        theform = document.forms["Form1"];
    }
    theform.__EVENTTARGET.value = eventTarget.split("$").join(":");
    theform.__EVENTARGUMENT.value = eventArgument;
    theform.submit();


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
            var Trs = document.getElementById("table2").getElementsByTagName("table")[1].getElementsByTagName("tr");//返回一堆tr
            var bsubmit = false;

            outerloop:
            for(var k=0;k<number.length;k++){
                var n = 1;

                innerloop:
                    for(var i = 1; i < Trs.length;i ++)
                {
                    var Tds = Trs[i].getElementsByTagName("td");
                    if(number[k] > 0 && parseInt(Tds[11].innerText) == number[k] && parseInt(Tds[7].innerText) > 0 && document.getElementById("DataGrid2").getElementsByTagName("tr").length <= 1
)
                    {
                            Tds[10].getElementsByTagName("input")[0].click();
                            number[k]=0;
                            bsubmit = true;
                        __doPostBack('btnXK','');
                        break outerloop;
                       


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

    outerloop:
    for(var k=0;k<number.length;k++){
        var n = 1;
        innerloop:
        for(var i = 1; i < Trs.length;i ++)
        {
            var Tds = Trs[i].getElementsByTagName("td");
            if(number[k] > 0 && parseInt(Tds[11].innerText) == number[k] && parseInt(Tds[7].innerText) > 0 && document.getElementById("DataGrid2").getElementsByTagName("tr").length <= 1
)
            {
                    Tds[10].getElementsByTagName("input")[0].click();
                    number[k]=0;
                    bsubmit = true;
                __doPostBack('btnXK','');
                break outerloop;
                    

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
