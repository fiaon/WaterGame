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
       lab_num:cc.Label,
       tanchuan:cc.Node,
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

    },
    init(num){
        this.num = num;
        this.lab_num.string = "X"+this.num;
    },
    ZhijieBtn(){
        this.tanchuan.active = true;
    },
    CloseBtn(){
        Global.ScoreChange(this.num,2);
        this.node.destroy();
        //TODO 调用刷新方法刷新主页水滴数据
    },
    //双倍按钮
    VideoBtn(){
        Global.showAdVedio(this.Success.bind(this), this.Failed.bind(this));
    },
    Success(){
        this.num = this.num*2;
        Global.ScoreChange(this.num,2);
        this.node.destroy();
        //TODO 调用刷新方法刷新主页水滴数据
    },
    Failed(){
        Global.ShowTip(this.node, "观看完视频才会有奖励哦");
    },
    // update (dt) {},
});
