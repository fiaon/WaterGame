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
        other:cc.Node,
        btn_lingqu:cc.Node,
        shuidi:cc.Label,
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        this.ran = Math.floor(Math.random()*10 +10);
        if(Global.luckts ==0){
            this.other.active = false;
            this.btn_lingqu.active = true;
            this.shuidi.string = "x" + this.ran*10;
        }else{
            this.shuidi.string = "x" + this.ran;
        }
    },
    //播放视频领取奖励
    BtnVideo(){
        Global.showAdVedio(this.Success.bind(this), this.Failed.bind(this));
    },
    Success(){
        this.other.active = false;
        this.btn_lingqu.active = true;
        this.shuidi.string = "x" + this.ran*10;

    },
    Failed(){
        Global.ShowTip(this.node, "观看完视频才会有奖励哦");
    },
    CloseBtn(){
        this.node.destroy();
    },
    LingQuBtn(){
        this.ran = this.ran*10;
        Global.GetLuckTS(this.ran,(res)=>{
            this.node.destroy();
        })
    }
    // update (dt) {},
});
