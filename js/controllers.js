angular.module('PersonalIncomeTax', []).controller('PersonalIncomeTaxController', ['$scope', '$location', '$anchorScroll','$sce',
		function($scope, $location, $anchorScroll,$sce){
	         $scope.pit={
					mingxis:(function(){
	         		var mingxis = [];
	         		mingxis[0] = {
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
	         	gongjijin:0,
				 desc:"您不用缴纳个税",
				 level:0,
				 isShow:false,
				 changejishu:function(){
					 this.jishu=this.shuiqian;
				 },
				 showPart2:function(){
					 // the element you wish to scroll to.
					 if ($location.hash() !== 'part3') {
						 $location.hash('part3');
						 $anchorScroll();
					 }else{
						 // call $anchorScroll() explicitly,
						 // since $location.hash hasn't changed
						 $anchorScroll();
					 }
				 },
	         	getTax: function(){
	         		//计算个税
	         		this.gongjijin = this.jishu * this.mingxis[0].gerenRate / 100;
	         		var yingnashui = this.shuiqian - this.gongjijin - 3500;
					if(yingnashui<0){
						this.geshui=0;
					}else if(0 < yingnashui && yingnashui <= 1500){
						this.level=1;
	         			this.geshui = yingnashui * 3 / 100;
	         		}
	         		else if(1500 < yingnashui && yingnashui <= 4500){
						this.level=2;
	         			this.geshui = yingnashui * 10 /100 -105;
	         		}
	         		else if(4500 < yingnashui && yingnashui <= 9000){
						this.level=3;
	         			this.geshui = yingnashui * 20 / 100 - 555;
	         		}
	         		else if (9000 < yingnashui && yingnashui <= 35000){
						this.level=4;
	         			this.geshui = yingnashui * 25 / 100 - 1005;
	         		}
	         		else if(35000 < yingnashui && yingnashui <= 55000){
						this.level=5;
	         			this.geshui = yingnashui * 30 / 100 - 2755;
	         		}
	         		else if(55000 < yingnashui && yingnashui <= 80000){
						this.level=6;
	         			this.geshui = yingnashui * 35 / 100 - 5505;
	         		}
	         		else if(yingnashui > 80000){
						this.level=7;
	         			this.geshui = yingnashui * 45 / 100 - 13505;
	         		}
	         		//计算税后
	         		this.shuihou = this.shuiqian - this.gongjijin- this.geshui;
	         		//个人、单位缴纳
	         		this.geren = this.gongjijin;
	         		this.danwei = this.shuiqian * (this.mingxis[0].danweiRate) /100;
					this.zongji=this.gongjijin+this.geshui;
					this.isShow=true;
					//angular.element("body").scrollTop= angular.element("#part2").offset().top;
					//angular.element(document.querySelectorAll("#part2"))[0].scrollTop = 0;
					//angular.element(document.querySelectorAll("body")).animate({scrollTop: angular.element(document.querySelectorAll("#part2")).offset().top}, "slow");
					//var part2 = document.getElementById("part2");
					//part2.top=0;
					// the element you wish to scroll to.
					if (this.level>0){
						this.desc="您属于第"+this.level+"等级。计算公式如下：<br>";
						switch(this.level)
						{
							case 1:
								this.desc=this.desc+"税前工资-五险一金-（税前工资-五险一金）*3%；<br>具体计算："+this.shuiqian+"-"+this.gongjijin+"-("+this.shuiqian+"-"+this.gongjijin+")"+"*3%="+this.shuihou;
								break;
							case 2:
								this.desc=this.desc+"税前工资-五险一金-（税前工资-五险一金）*10%+105；<br>具体计算："+this.shuiqian+"-"+this.gongjijin+"-("+this.shuiqian+"-"+this.gongjijin+")"+"*10%+105="+this.shuihou;
								break;
							case 3:
								this.desc=this.desc+"税前工资-五险一金-（税前工资-五险一金）*20%+555；<br>具体计算："+this.shuiqian+"-"+this.gongjijin+"-("+this.shuiqian+"-"+this.gongjijin+")"+"*20%+555="+this.shuihou;
								break;
							case 4:
								this.desc=this.desc+"税前工资-五险一金-（税前工资-五险一金）*25%+1005；<br>具体计算："+this.shuiqian+"-"+this.gongjijin+"-("+this.shuiqian+"-"+this.gongjijin+")"+"*25%+1005="+this.shuihou;
								break;
							case 5:
								this.desc=this.desc+"税前工资-五险一金-（税前工资-五险一金）*30%+2755；<br>具体计算："+this.shuiqian+"-"+this.gongjijin+"-("+this.shuiqian+"-"+this.gongjijin+")"+"*30%+2755="+this.shuihou;
								break;
							case 6:
								this.desc=this.desc+"税前工资-五险一金-（税前工资-五险一金）*35%+5055；<br>具体计算："+this.shuiqian+"-"+this.gongjijin+"-("+this.shuiqian+"-"+this.gongjijin+")"+"*35%+5055="+this.shuihou;
								break;
							case 7:
								this.desc=this.desc+"税前工资-五险一金-（税前工资-五险一金）*45%+13505；<br>具体计算："+this.shuiqian+"-"+this.gongjijin+"-("+this.shuiqian+"-"+this.gongjijin+")"+"*45%+13505="+this.shuihou;
								break;
						}
					}
					$scope.desc=$sce.trustAsHtml(this.desc);
					if ($location.hash() !== 'part3') {
						$location.hash('part3');
					}else{
						// call $anchorScroll() explicitly,
						// since $location.hash hasn't changed
						$anchorScroll();
					}
					// call $anchorScroll()
					//$anchorScroll();
				}
	         };
	    }]);