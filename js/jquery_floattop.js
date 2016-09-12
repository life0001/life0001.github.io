/** 
 * created by pwf
 */
;(function($,document,window,undefined){
	function FloatTop(ele,options){
		 var $this=ele,   //导航的class/id
			 pos=options.pos, 
			 iwidth=options.width,
			 _this=this;
		 _this.scrolltop=null;
	 	 _this.isShow=function(pos){
 		 	if($(document).height() >= $(document).height() - $(window).height()){//如果有滚动条
 		 		if(_this.scrolltop <= pos){
 					 $this.css({'position':'initial','padding':'0','top':0}).css('background','');
 				 }else{
 					 if(options.isGap){
 						 _this.scrolltop < 0?$this.css({'position':'initial','padding':'0','top':0}).css('background',''):$this.css({'position':'fixed','padding':options.pad,'top':options.top}).css('background-color',options.bgcolor); 
 					 }else{
 						 $this.css({'position':'fixed'}); 
 					 }				 
 				 }
 				 if(iwidth!=''){
 					 $this.outerWidth(iwidth);	
 				 }
 		 	}else{
 		 		$this.css({'position':'initial','padding':'0','top':0}).css('background','');
 		 	}			 
	 	}	
		 $(window).scroll(function(){
			 _this.scrolltop=document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
			 _this.isShow(pos);
		 });
	 }
	$.fn.floatTop=function(parameter,callback){
		 if(typeof parameter == 'function'){
            callback = parameter;
            parameter = {};
        }else{
            parameter = parameter || {};
            callback = callback || function(){};            
        }
		 var defaults={
			 pos:0,    //滚动条在该位置时停止浮动
			 top:0,  //导航的纵向定位
			 isGap:true,   //是否需要padding
			 pad:'20px 15px 0 15px',  //padding的值
			 width:'',  //设置导航宽度
			 bgcolor:'#fff'  //背景色颜色
		 }
		 var options=$.extend({},defaults,parameter),
		 newfloatTop= new FloatTop(this,options);
	 }
})(jQuery,document,window)