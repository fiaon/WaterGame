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
        title_img:cc.Sprite,
        title_imgs:{
            default:[],
            type:cc.SpriteFrame,
        },
        user_head:cc.Sprite,
        user_name:cc.Label,
        user_score:cc.Label,
        user_sex:cc.Sprite,
        robot_head:cc.Sprite,
        robot_name:cc.Label,
        robot_score:cc.Label,
        robot_sex:cc.Sprite,
        sexImgs:{
            default:[],
            type:cc.SpriteFrame,
        },
        goldnum:cc.Label,
        crown:{
            default:[],
            type:cc.Node,
        },
        Turntable_prefab:cc.Prefab,
        tips_prefab:cc.Prefab,
        gold_img:cc.SpriteFrame,
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

    },
    init(score_1,score_2){
        this.num = 0;
        let self = this;
        cc.loader.load({ url: Global.robot_imgurl, type: "jpg" }, function (error, res) {
            self.robot_head.spriteFrame = new cc.SpriteFrame(res);
        });
        this.robot_score.string = score_2 +"分";
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
        this.user_score.string = score_1+"分";
        this.user_name.string = Global.name;
        if(Global.sex!=2){
            this.user_sex.spriteFrame = this.sexImgs[0];
        }else{
            this.user_sex.spriteFrame = this.sexImgs[1];
        }
        if(score_1 >score_2){
            this.num =400;
            this.goldnum.string = "x"+this.num;
            this.crown[0].active = true;
        }else if(score_1 <score_2){
            this.num =100;
            this.goldnum.string = "x"+this.num;
            this.crown[1].active = true;
            this.title_img.node.x =0;
            this.title_img.spriteFrame = this.title_imgs[0];
        }else{
            this.num =250;
            this.goldnum.string = "x"+this.num;
            this.title_img.node.x =0;
            this.title_img.spriteFrame = this.title_imgs[1];
        }
    },
    VideoBtn(){
        Global.showAdVedio(this.Success.bind(this), this.Failed.bind(this));
    },
    Success(){
        this.num = this.num*2;
        let tip = cc.instantiate(this.tips_prefab);
        if(tip){
            tip.getComponent(require("TipShow")).img_icon.spriteFrame = this.gold_img;
            tip.getComponent(require("TipShow")).label.string = "x"+ this.num;
        }
        Global.ScoreChange(this.num,1);
    },
    Failed(){
        Global.ShowTip(this.node, "观看完视频才会有双倍奖励哦");
    },
    ZhiJieBtn(){
        Global.ScoreChange(this.num,1,(res)=>{
            if(res.state == 1){
                this.node.destroy();
                let turntable = cc.instantiate(this.Turntable_prefab);
                if(turntable){
                    this.node.parent.addChild(turntable);
                }
            }

        });
    }
    // update (dt) {},
});
