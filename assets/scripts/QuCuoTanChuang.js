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
        PiPeiView:{
            default:null,
            type:cc.Prefab,
        },
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        
    },
    //匹配页面
    onClickPiPei(){
        this.node.destroy();
        let pipei = cc.instantiate(this.PiPeiView);
        if(pipei){
            this.node.parent.addChild(pipei);
        }
    },
    VideoBtn(){
        Global.showAdVedio(this.Success.bind(this), this.Failed.bind(this));
    },
    Success(){
        
    },
    Failed(){
        Global.ShowTip(this.node, "观看完视频才会有去错卡哦");
    },
    // update (dt) {},
});
