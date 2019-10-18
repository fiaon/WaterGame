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
        shouyue_yes:cc.Node,
        shouyue_no:cc.Node,
        shuidi:cc.Label,
        zhijie:cc.Node,
        tips:cc.Prefab,
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

    },
    init(type,num){
        if(type ==1 ){
            if(CC_WECHATGAME){
                //数据存在托管数据上
                var arr = new Array();
                let keepcount = (Global.keepcount +1).toString();
                let cjlvl = Global.cjlvl.toString();
                arr.push({ key: "keepcount", value:keepcount});
                arr.push({ key: "cjlvl", value:cjlvl});
        
                wx.setUserCloudStorage({
                    KVDataList: arr,
                    success: function (res) {
                        console.log("-------存储成功-----：");
                        console.log(res);
                    },
                    fail: function (res) {
                        console.error(res);
                    },
                    complete(res) {
                    }
                });
            }
            this.shouyue_yes.active = true;
            this.num = num;
            this.shuidi.string = "X"+num;
            //延迟2s显示直接领取
            this.scheduleOnce(function() {
                this.zhijie.active = true;
            }, 2);

        }else{
            this.shouyue_no.active = true;
        }
    },
    //播放视频领取奖励
    BtnVideo(){
        Global.showAdVedio(this.Success.bind(this), this.Failed.bind(this));
    },
    Success(){
        this.num = this.num*2;
        Global.ScoreChange(this.num,2);
        let tip = cc.instantiate(this.tips);
        let src = tip.getComponent(require("TipShow"));
        if (src) {
            src.label.string =  this.num;
        }
        this.node.addChild(tip);
    },
    Failed(){
        Global.ShowTip(this.node, "观看完视频才会有奖励哦");
    },
    ZhiJieBtn(){
        Global.ScoreChange(this.num,2);
        this.node.destroy();
        cc.find("Canvas").getComponent("Start").UpdateUserInfo();
    },
    CloseBtn(){
        this.node.destroy();
        cc.find("Canvas").getComponent("Start").UpdateUserInfo();
    }
    // update (dt) {},
});
