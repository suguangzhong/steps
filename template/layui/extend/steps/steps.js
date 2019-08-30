layui.define(['jquery'], function(exports) {
	"use strict";
	var $ = layui.$;
	$.fn.step = function(options) {
		var opts = $.extend({}, $.fn.step.defaults, options);
		
		var headerList = opts.header;
		var size = headerList.length;

		if(size < opts.initStep) {
			opts.initStep = size;
		}
		
		var curPage = opts.initStep;
		
		this.find(".step-header").show();
		
		var str = "<ul>"
		for(var i=0; i<size; i++){
			if(i < curPage-1){
				str += "<li class='step-title-item step-title-done'><span class='step-icon'>" + (i+1) + "</span><p class='step-title'>" + headerList[i] + "</p></li>";
			}else if(i == curPage-1){
				str += "<li class='step-title-item step-title-current'><span class='step-icon'>" + (i+1) + "</span><p class='step-title'>" + headerList[i] + "</p></li>";
			}else{
				str += "<li class='step-title-item'><span class='step-icon'>" + (i+1) + "</span><p class='step-title'>" + headerList[i] + "</p></li>";
			}
		}
		str += "</ul>"
		this.find('.step-header').append(str);
        
        this.find(".my-step-content .step-list").eq(curPage-1).show().siblings().hide();
        
		this.find(".step-header ul li").css({
			"width": 100 / size + "%"
		});
		
		this.nextStep = function() {
			if(curPage >= size) {
				return false;
			}
			var next_step_num = curPage == 0 ? 2 : curPage + 1 == size ? size : curPage + 1;
			return this.goStep(next_step_num);
		};

		this.preStep = function() {
			if(curPage <= 1) {
				return false;
			}
			var pre_step_num = curPage == 1 ? 1 : curPage - 1;
			return this.goStep(pre_step_num);
		};

		this.goStep = function(page) {
			if(page == undefined || isNaN(page) || page < 0) {
				if(window.console && window.console.error) {
					console.error('the method goStep has a error,page:' + page);
				}
				return false;
			}
			curPage = parseInt(page);

            for(var i=0; i<size; i++){
            	if(i < page-1){
            		$('.step-header').find('ul li').eq(i).addClass('step-title-done').removeClass('step-title-current');
            	}else if(i == page-1){
            		$('.step-header').find('ul li').eq(i).addClass('step-title-current').removeClass('step-title-done');
            	}else{
            		$('.step-header').find('ul li').eq(i).removeClass('step-title-done step-title-current');
            	}
            }
            $('.my-step-content').find('.step-list').eq(page-1).show().siblings().hide();
            $(document).resize();
			return true;
		};
		return this;
	};
	$.fn.step.defaults = {
		initStep: 1,
		header: ['步骤一','步骤二','步骤三','步骤四','步骤五','步骤六']
	};

	exports('steps', $);
});