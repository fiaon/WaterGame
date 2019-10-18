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
        icon_img:{
            default:null,
            type:cc.Sprite,
        },
        lab_lvl:cc.Label,
        lab_name:cc.Label,
        btn_lingqu:cc.Node,
        cjid:0,
        img_sprite:{
            default:[],
            type:cc.SpriteFrame,
        }
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

    },
    init(data){
        this.cjid = data.id;
        this.lab_lvl.string = "LV." + data.lvl;
        this.lab_name.string = data.name;
        this.gaivevalue = data.gaivevalue;
        //一行的是否解锁
        if(data.img !=0){
            this.icon_img.spriteFrame = this.img_sprite[data.img-1];
            //如果没有解锁变暗
            if(!data.issign){
                this.icon_img.node.color = new cc.color(106,106,106);
            }
        }
        if(!data.isvideo&&data.issign){
            this.btn_lingqu.active = true;
        }
    },
    //播放视频领取奖励
    BtnVideo(){
        Global.showAdVedio(this.Success.bind(this), this.Failed.bind(this));
    },
    Success(){
        Global.GetAchievementVideo(this.cjid,(res)=>{

        });
    },
    Failed(){
        Global.ShowTip(this.node, "观看完视频才会有奖励哦");
    },
    // update (dt) {},
});
