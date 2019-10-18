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
        hongbao_view:cc.Node,
        gold_view:cc.Node,
        lab_hongbao:cc.Label,
        lab_gold:cc.Label,
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

    },
    init(type,num){
        //type 1:金币 2：红包
        if(type ==1){
            this.gold_view.active = true;
            this.lab_gold.string = "X"+num;
            Global.ScoreChange(num,1,(res)=>{
                Global.gold += num;
            });
        }else{
            this.hongbao_view.active = true;
            this.lab_hongbao.string = "X"+num+"元";
        }
    },
    CloseBtn(){
        this.node.destroy();
        cc.find("Canvas/TurntableView").getComponent("TurntableView").goldnum.string = "x"+Global.gold;
    },
    // update (dt) {},
});
