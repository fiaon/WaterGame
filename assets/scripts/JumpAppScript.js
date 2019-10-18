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
        sprite: {
            default: null,
            type: cc.Sprite,
        },

        labelGame: {
            default: null,
            type: cc.Label,
        },
        index:0,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        //this.index = 0;
    },

    start() {
        this.node.on("touchend", this.TouchEnd, this);
    },

    TouchEnd(event) {
        event.stopPropagation();
        // 上线前注释console.log("this.index == ", this.index);
        // var curScene = cc.director.getScene().name;
        // if(curScene == "start"){
        //     if(this.node.parent.name == "content"){
        //          // 阿拉丁埋点
        //          wx.aldSendEvent('游戏推广',{'页面' : '游戏首页_收藏夹'});
        //     }else{
        //         // 阿拉丁埋点
        //         wx.aldSendEvent('游戏推广',{'页面' : '游戏首页_滚动列表'});
        //     }
        // }else if(curScene == "select"){
        //     if(this.node.parent.name == "content"){
        //         // 阿拉丁埋点
        //         wx.aldSendEvent('游戏推广',{'页面' : '关卡页面_收藏夹'});
        //     }else{
        //         // 阿拉丁埋点
        //         wx.aldSendEvent('游戏推广',{'页面' : '关卡页面_滚动列表'});
        //     }
        // }else{
        //     if(this.node.parent.parent.name == "miji"){
        //         // 阿拉丁埋点
        //         wx.aldSendEvent('游戏推广',{'页面' : '游戏秘籍_游戏列表'});
        //     }else if(this.node.parent.parent.parent.name == "miji"){
        //         wx.aldSendEvent('游戏推广',{'页面' : '游戏秘籍_滚动列表'});
        //     }else if(this.node.parent.parent.parent.name == "img_task_bg"){
        //         wx.aldSendEvent('游戏推广',{'页面' : '游戏任务_滚动列表'});
        //     }else if(this.node.parent.parent.parent.name == "img_boxJiangli_bg"){
        //         wx.aldSendEvent('游戏推广',{'页面' : '游戏宝箱_滚动列表'});
        //     }else if(this.node.parent.parent.parent.name == "shibai"){
        //         wx.aldSendEvent('游戏推广',{'页面' : '游戏失败_滚动列表'});
        //     }else if(this.node.parent.parent.parent.name == "win_dlg"){
        //         wx.aldSendEvent('游戏推广',{'页面' : '游戏成功_滚动列表'});
        //     }
            
        //     else{
        //         if(this.node.parent.name == "content"){
        //             // 阿拉丁埋点
        //             wx.aldSendEvent('游戏推广',{'页面' : '游戏进行_收藏夹'});
        //         }
        //     }
        // }
        
        if (CC_WECHATGAME) {
            this.appId = Global.jumpappObject[this.index].apid;
            let slef = this;
            wx.navigateToMiniProgram({
                appId: slef.appId,
                path: Global.jumpappObject[this.index].path,
                success: function (res) {
                    // 上线前注释
                    console.log("跳转成功：",slef.appId);
                    Global.AddUserOper(2,slef.appId);
                },
                fail: function (res) {
                    // 上线前注释console.log(res);
                },
            });
        }
    }

    // update (dt) {},
});
