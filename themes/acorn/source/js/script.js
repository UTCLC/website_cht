document.onscroll = function() {
  var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
  var headerShadow = document.getElementById("header");
  if (scrollTop > 10)
  // headerShadow.classList.add("header-fixed"); //增加
  // headerShadow.classList.remove("header-fixed"); //去除
  headerShadow.classList.replace("header-absolute","header-fixed"); //替換
  else
  headerShadow.classList.replace("header-fixed","header-absolute"); //替換
}

feather.replace()

var tesObj = document.getElementsByName("carousel");
	//設定 value 值為 0 選中
	for(var i=0; i < tesObj.length; i++){
		if (tesObj[i].value=="0"){
			tesObj[i].checked = true;
			break;
			}
	}
