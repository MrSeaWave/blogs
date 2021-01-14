---
title: 友人帐
date: 2021-01-14 10:05:47
---

<script type="text/javascript">
function changeFrameHeight(){
    const ifm= document.getElementById("blogFriend"); 
    ifm.height=ifm.contentWindow.document.body.scrollHeight;
};
window.onresize=function(){  
 changeFrameHeight();
}
</script>
<iframe 
id="blogFriend"
src="https://mrseawave.github.io/blog-friends/index.html" 
width="100%"
style="overflow:visible;"
height="100px" 
onload="changeFrameHeight()"
></iframe>
