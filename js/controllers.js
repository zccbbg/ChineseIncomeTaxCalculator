angular.module('PersonalIncomeTax', []).controller('PersonalIncomeTaxController', 
		function($scope) {
	         $scope.pit={
					mingxis:(function(){
	         		var mingxis = [];
	         		mingxis[0] = {
	         			name:'缴纳五险一金比例',
	         			gerenRate: 18.5,
	         			danweiRate: 28
	         		};
	         		return mingxis;
	         	})(),
	         	shuiqian:10000,
				 jishu:10000,
	         	shuihou:0,
	         	geshui:0,
	         	geren:0,
	         	danwei:0,
				zongji:0,
	         	history:[],
	         	gongjijin:0,
				 changejishu:function(){
					 this.jishu=this.shuiqian;
				 },
	         	getTax: function(){
	         		//计算个税
	         		this.gongjijin = this.jishu * this.mingxis[0].gerenRate / 100;
	         		var yingnashui = this.shuiqian - this.gongjijin - 3500;
	         		if(0 < yingnashui && yingnashui <= 1500){
	         			this.geshui = yingnashui * 3 / 100;
	         		}
	         		else if(1500 < yingnashui && yingnashui <= 4500){
	         			this.geshui = yingnashui * 10 /100 -105;
	         		}
	         		else if(4500 < yingnashui && yingnashui <= 9000){
	         			this.geshui = yingnashui * 20 / 100 - 555;
	         		}
	         		else if (9000 < yingnashui && yingnashui <= 35000){
	         			this.geshui = yingnashui * 25 / 100 - 1005;
	         		}
	         		else if(35000 < yingnashui && yingnashui <= 55000){
	         			this.geshui = yingnashui * 30 / 100 - 2755;
	         		}
	         		else if(55000 < yingnashui && yingnashui <= 80000){
	         			this.geshui = yingnashui * 35 / 100 - 5505;
	         		}
	         		else if(yingnashui > 80000){
	         			this.geshui = yingnashui * 45 / 100 - 13505;
	         		}
	         		//计算税后
	         		this.shuihou = this.shuiqian - this.gongjijin- this.geshui;
	         		//个人、单位缴纳
	         		this.geren = this.gongjijin;
	         		this.danwei = this.shuiqian * (this.mingxis[0].danweiRate) /100;
					this.zongji=this.gongjijin+this.geshui;
	         		//历史
	         		if(this.history.length === 0){
	         			this.history[0] = this.shuiqian;
	         		}
	         		else{
	         			this.history.unshift(this.shuiqian);
	         			if(this.history.length > 10){
	         				this.history.length = 10;
	         			}
	         		}
	         	}
	         };
	    });