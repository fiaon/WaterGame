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
        anim_head:cc.Node,
        head_img:cc.Sprite,
        pp_zhong:cc.Node,
        pp_chenggong:cc.Node,
        user_head:cc.Sprite,
        user_name:cc.Label,
        user_lvl:cc.Label,
        user_sex:cc.Sprite,
        robot_head:cc.Sprite,
        robot_name:cc.Label,
        robot_lvl:cc.Label,
        robot_sex:cc.Sprite,
        left_user:cc.Node,
        right_user:cc.Node,
        sexImgs:{
            default:[],
            type:cc.SpriteFrame,
        }
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        let self = this;
        this.outpos_1 = cc.v2(this.left_user.x+this.left_user.width, this.left_user.y);

        this.outpos_2 = cc.v2(this.right_user.x-this.right_user.width, this.right_user.y);

        cc.tween(this.anim_head)
            .to(1, { scale: 2.5,opacity: 25.5})
            // .to(2, { opacity: 25.5})
            .call(() => {
            this.anim_head.opacity =255;
            this.anim_head.scale = 1;
            })
            .repeat(3)
            .start();
        if(Global.avatarUrl){
            cc.loader.load({ url: Global.avatarUrl, type: "jpg" }, function (error, res) {
                self.head_img.spriteFrame = new cc.SpriteFrame(res);
            });
        }
        Global.ShuiDiRobot((res)=>{
            if(res.state == 1){
                //给机器人赋值
                Global.robot_imgurl = res.result.imgurl;
                Global.robot_lvl = res.result.lvl;
                
                Global.robot_times = res.result.times.split(",");
                Global.robot_rate = res.result.rate;
                Global.robot_sex = res.result.sex;
                Global.robot_name = res.result.nick;
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
            }
        });
        //保存当前关卡题目
        Global.GetQuestionList((res)=>{
            if(res.state == 1){
                Global.questionList = res.result;
            }
        });
        this.scheduleOnce(function() {
            this.PiPeiChengGong();
        }, 3);
    },
    //显示匹配成功页面
    PiPeiChengGong(){
        this.pp_zhong.active = false;
        this.pp_chenggong.active = true;
        //动画
        this.left_user.runAction(cc.moveTo(1, this.outpos_1));
        this.right_user.runAction(cc.moveTo(1, this.outpos_2));
        //进入游戏
        cc.director.loadScene("Game.fire");
    },
    // update (dt) {},
});
