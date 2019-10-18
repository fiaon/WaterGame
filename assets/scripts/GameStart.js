// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        question:{
            default:[],
            type:cc.Node,
        },
        question_imgs:{
            default:[],
            type:cc.SpriteFrame,
        },
        subject:{
            default:null,
            type:cc.Label,
        },
        Label_time:{
            default:null,
            type:cc.Label,
        },
        img_time:{
            default:null,
            type:cc.Sprite,
        },
        user_head:cc.Sprite,
        user_name:cc.Label,
        user_lvl:cc.Label,
        user_sex:cc.Sprite,
        robot_head:cc.Sprite,
        robot_name:cc.Label,
        robot_lvl:cc.Label,
        robot_sex:cc.Sprite,
        sexImgs:{
            default:[],
            type:cc.SpriteFrame,
        },
        user_score:cc.Label,
        robot_score:cc.Label,
        robot_rightOrerror:cc.Sprite,
        right_Img:{
            default:[],
            type:cc.SpriteFrame,
        },
        double_img:cc.Node,
        gameOver_view:{
            default:null,
            type:cc.Prefab,
        }
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        let self = this;
        this.curid = 0;         //当前的问题id 一共5题
        this.score_1 = 0;       //玩家积分
        this.score_2 = 0;       //机器人积分
        this.double =1;
        // this.subject.string = Global.questionList[this.curid].Subject;
        // this.subtime = Date.now();
        // this.question[0].getComponent("TimuPrefab").timu_label.string = Global.questionList[this.curid].A.trim();
        // this.question[1].getComponent("TimuPrefab").timu_label.string = Global.questionList[this.curid].B.trim();
        // this.question[2].getComponent("TimuPrefab").timu_label.string = Global.questionList[this.curid].C.trim();
        // this.question[3].getComponent("TimuPrefab").timu_label.string = Global.questionList[this.curid].D.trim();
        // this.curValues = Global.questionList[this.curid].Values.trim();
        this.ShowCurTimu();

        cc.loader.load({ url: Global.robot_imgurl, type: "jpg" }, function (error, res) {
            self.robot_head.spriteFrame = new cc.SpriteFrame(res);
        });
        this.robot_lvl.string = "LV"+Global.robot_lvl;
        this.robot_name.string = Global.robot_name;
        if(Global.robot_sex!=2){
            this.robot_sex.spriteFrame = this.sexImgs[0];
        }else{
            this.robot_sex.spriteFrame = this.sexImgs[1];
        }
        //给玩家赋值
        if(Global.avatarUrl){
            cc.loader.load({ url: Global.avatarUrl, type: "jpg" }, function (error, res) {
                self.user_head.spriteFrame = new cc.SpriteFrame(res);
            });
        }
        this.user_lvl.string = "LV"+Global.cjlvl;
        this.user_name.string = Global.name;
        if(Global.sex!=2){
            this.user_sex.spriteFrame = this.sexImgs[0];
        }else{
            this.user_sex.spriteFrame = this.sexImgs[1];
        }

        
    },
    ShowCurTimu(){
        if(this.curid >4){
            let gameover = cc.instantiate(this.gameOver_view);
            if(gameover){
                gameover.getComponent("GameOverView").init(this.score_1,this.score_2);
                this.node.addChild(gameover);
            }
            return;
        }
        if(this.curid == 4){
            this.double_img.active = true;
            this.double = 2;
        }
        this.robot_rightOrerror.node.active = false;
        for(let i=0;i<this.question.length;i++){
            this.question[i].getComponent("TimuPrefab").timu_img.spriteFrame = this.question_imgs[2];
            this.question[i].getComponent("TimuPrefab").img_yes.active = false;
            this.question[i].getComponent("TimuPrefab").img_no.active = false;
        }
        this.curtime = 10;      //当前问题的倒计时
        this.isclick = false;   //是否点击
        this.robot_isclick = false;

        this.subject.string = Global.questionList[this.curid].Subject;
        this.subtime = Date.now();
        this.question[0].getComponent("TimuPrefab").timu_label.string = Global.questionList[this.curid].A.trim();
        this.question[1].getComponent("TimuPrefab").timu_label.string = Global.questionList[this.curid].B.trim();
        this.question[2].getComponent("TimuPrefab").timu_label.string = Global.questionList[this.curid].C.trim();
        this.question[3].getComponent("TimuPrefab").timu_label.string = Global.questionList[this.curid].D.trim();
        this.curValues = Global.questionList[this.curid].Values.trim();

        this.robot_ran = (Math.random()*(parseInt(Global.robot_times[1])-parseInt(Global.robot_times[0]))+parseInt(Global.robot_times[0]));
        let robotdata = Math.floor(this.robot_ran);
        this.scheduleOnce(function() {
            this.robot_isclick = true;
            this.robot_rightOrerror.node.active = true;
            let rate = Math.random()*100;
            if(rate <= Global.robot_rate){
                this.robot_rightOrerror.spriteFrame = this.right_Img[0];
                let score = (10000 - Math.floor(this.robot_ran*1000))*this.double;
                this.score_2 += score;
                this.robot_score.string = this.score_2;
            }else{
                this.robot_rightOrerror.spriteFrame = this.right_Img[1];
                this.score_2 += 0;
                this.robot_score.string = this.score_2;
            }
        }, robotdata);
        this.schedule(this.doCountdownTime,1);
    },
    //倒计时
    doCountdownTime(){
        //每秒更新显示信息
        if (this.curtime > 0 ) {
            this.curtime -= 1;
            this.Label_time.string = "0"+this.curtime;
            this.img_time.fillRange = this.curtime/10;
            this.countDownShow(this.curtime);
        }
    },
    countDownShow(temp){
        if(temp<=0){
            this.unschedule(this.doCountdownTime);
            if(!this.isclick){
                this.score_1 += 0;
                this.user_score.string = this.score_1;
            }
            //下一题
            this.curid ++;
            this.ShowCurTimu();
        }
    },

    onCliCKTimu:function(event, customEventData){
        if(!this.isclick){
            let daan = this.question[customEventData].getComponent("TimuPrefab").timu_label.string;
            if(daan == this.curValues){
                this.question[customEventData].getComponent("TimuPrefab").timu_img.spriteFrame = this.question_imgs[0];
                this.question[customEventData].getComponent("TimuPrefab").img_yes.active = true;
                let clicktime = Date.now();
                let score = (10000-(clicktime-this.subtime))*this.double;
                this.score_1 += score;
                this.user_score.string = this.score_1;
            }else{
                this.question[customEventData].getComponent("TimuPrefab").timu_img.spriteFrame = this.question_imgs[1];
                this.question[customEventData].getComponent("TimuPrefab").img_no.active = true;
                this.score_1 += 0;
                this.user_score.string = this.score_1;
            }
            this.isclick = true;
        }
    },

    // update (dt) {
    //     if(this.curid >4){
    //         return;
    //     }
    //     if(this.robot_isclick && this.isclick){
    //         // this.scheduleOnce(function() {
    //             this.curid ++;
    //             this.ShowCurTimu();
    //         // },1);
    //     }
    // },
});
