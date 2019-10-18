// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        content: {
            default: null,
            type: cc.Node,
        },

        jumpappPrefab: {
            default: null,
            type: cc.Prefab
        },

        btn: {
            default: null,
            type: cc.Sprite
        },
        bg:{
            default:null,
            type:cc.Node,
        }
    },

    // LIFE-CYCLE CALLBACKS:
    onLoad() {

    },

    start() {
        this.hide = true;
        
        //this.btn.getComponent(cc.Animation).play('btnclip');
        this.node.zIndex = cc.macro.MAX_ZINDEX;
        this.jumpArr_1 = [0,1,2,3,4,5,6,7,8];
        this.jumpArr_2 = [0,1,2,3,4,5,9,10,11];
    },

    JumpCallBack() {
        if (Global.jumpappObject == null)
            return;
        this.content.removeAllChildren();
        let jumarr = [];
        if(this.hide){
            this.jumpArr_1.sort(function(){ return 0.5 - Math.random() });
            jumarr = this.jumpArr_1;
        }else{
            this.jumpArr_2.sort(function(){ return 0.5 - Math.random() });
            jumarr = this.jumpArr_2;
        }
        console.log("jumarr",jumarr);
        for (let i = 0; i < jumarr.length; i++) {
            let app = cc.instantiate(this.jumpappPrefab);
            if (app) {
                let src = app.getComponent(require("JumpAppScript"));
                if (src) {
                    src.index = jumarr[i];
                }
                src.sprite.spriteFrame = Global.jumpappObject[jumarr[i]].sprite;
                if (src.labelGame) {
                    src.labelGame.string = Global.jumpappObject[jumarr[i]].name;
                }
                this.content.addChild(app);
            }
        }
        this.hide = !this.hide;
    },

    onButtonClick(event) {
       
        this.JumpCallBack();

        this.startTime = Date.now();

        this.bg.active =true;
        //this.btn.node.parent.active = false;
        this.btn.node.active = false;
    },
    btnclose(){
        this.bg.active =false;
        //this.btn.node.parent.active = true;
        this.btn.node.active = true;

        // wx.aldSendEvent("游戏首页_收藏夹页面停留时间",{
        //     "耗时" : (Date.now()-this.startTime)/1000
        // });
    },
    // update (dt) {},
});
