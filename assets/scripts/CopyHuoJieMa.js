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
        
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

    },
    /**
     * 复制获奖码
     */
    onClickCopyPrizeCode: function () {
        wx.setClipboardData({
            data: "zuishuaiyouxikefu",
            success: function (res) {
                wx.getClipboardData({
                    success: function (res) {
                        // 上线前注释console.log("复制成功==111===>：", res.data);
                    },
                    fail: function (res) {
                        // 上线前注释console.log("复制失败==111===>：", res.data);
                    },
                    complete: function (res) {
                        // 上线前注释console.log("复制完成==111===>：", res.data);
                    }
                });
            },
            fail: function (res) {
                // 上线前注释console.log("复制失败==222===>：", res.data);
            },
            complete: function (res) {
                // 上线前注释console.log("复制失败==222===>：", res.data);
            },
        });
    },
    CloseBtn(){
        this.node.destroy()
    },
    // update (dt) {},
});
