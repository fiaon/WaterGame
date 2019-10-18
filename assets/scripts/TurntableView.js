/**
 * 抽奖界面
 */

cc.Class({
    extends: cc.Component,

    properties: {
        //转盘
        ZhuanPan: {
            default: null,
            type: cc.Node
        },
        //奖励界面
        JiangLiPrefab: {
            default: null,
            type: cc.Prefab
        },
        //遮罩
        img_zhezhao: {
            default: null,
            type: cc.Node
        },
        img_haisheng:cc.Node,
        tanchuan:cc.Node,
        goldnum:cc.Label,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        // 上线前注释console.log("刚进来的时候打印==", Global.whetherShowLucky);

        //奖励列表的数字
        this.Arr_AwardList = [2, 50, 400, 0, 3, 200, 1, 100];
        this.txt_ChouJiangCount = this.img_haisheng.getChildByName("txt_ChouJiangCount");
        this.txt_ChouJiangCount_label = this.txt_ChouJiangCount.getComponent(cc.Label);

        if (Global.cjcount <= 0) {
            this.img_haisheng.active = false;
        } else {
            this.img_haisheng.active = true;
        }
        this.goldnum.string = "x"+Global.gold;
    },

    start() {


        // this.coinNum = Global.GameCoinNum;
        Global.GetZhuanPanLog();
        this.txt_ChouJiangCount_label.string = Global.cjcount;

        this.img_zhezhao.active = false;
        this.img_zhezhao.parent = this.node.parent;
        this.img_zhezhao.zIndex = 1;

    },

    // update (dt) {},

    /**
     * 点击关闭界面按钮
     */
    onClickComeback() {
        // 阿拉丁埋点
        // 上线前注释console.log("点击关闭界面按钮", Global.whetherShowLucky, Global.onAddLuckyCount);
        cc.director.loadScene("start.fire");
    },

    /**
     * 金币抽奖方法
     */
    onClickCoin() {
        if(Global.cjcount>0){
            Global.UserCJ((res)=>{
                this.img_zhezhao.active = true;
                this.onRequestChouJiang();
                Global.cjcount--;
                if(Global.cjcount<=0){
                    this.img_haisheng.active = false;
                }else{
                    this.txt_ChouJiangCount_label.string = Global.cjcount;
                }
            })
        }else{
            if (Global.gold >= 500) {
                this.img_zhezhao.active = true;
                this.onRequestChouJiang();
                // Global.ScoreChange(-500,1,(res)=>{
                //     Global.gold -= 500;
                //     this.goldnum.string = "x"+Global.gold;
                // });
            } else {
                //提示弹窗
                this.tanchuan.active = true;
            }
        }
    },
    CloseTanChuang(){
        this.tanchuan.active = false;
    },
    //邀请按钮
    shareBtn(){
        if (CC_WECHATGAME) {
            wx.aldShareAppMessage({
                title: '看一看自己每天该喝多少水',
                imageUrl: Global.shareimg,
                query: "introuid=" + Global.Introuid,
            });
        }

    },
    /**
     * 请求抽奖接口的操作
     */
    onRequestChouJiang: function () {

        Global.RunZhuanPan((res) => {      //获取到接口返回值
            if(res.state ==1){
                this.index = res.result -1;
                this.DrawALotteryOrRaffle(res.result - 1);
            }
        });
    },

    /**
     * 抽奖方法(前端表现)
     */
    DrawALotteryOrRaffle: function (num) {
        //多旋转的角度
        this.rotationNum = (num) * (360 / 8) + (360 / 8 / 2);
        //左右的效果角度
        // this.random_1 = Math.floor(Math.random() * 40 - 22);
        this.random_1 = 0;


        var action = this.DialRotateAction();
        this.ZhuanPan.runAction(action);
        var self = this;
        // this.scheduleOnce(function () {
        //     var action_1 = cc.sequence(
        //         cc.rotateBy(0.2, 0),
        //         cc.rotateBy(1.5, self.random_1 / -1),
        //     ).easing(cc.easeInOut(3.0));
        //     self.ZhuanPan.runAction(action_1);
        // }, 6.0);
        this.scheduleOnce(function () {
            self.img_zhezhao.active = false;
            //调用弹窗
            var jiangliPrefab = cc.instantiate(self.JiangLiPrefab);
            switch (num) {
                case 0:
                case 4:
                case 6:
                    
                    jiangliPrefab.getComponent("HuoDeTanChuang").init(2, self.Arr_AwardList[self.index]);
                    break;
                case 1:
                case 2:
                case 5:
                case 7:
                    jiangliPrefab.getComponent("HuoDeTanChuang").init(1, self.Arr_AwardList[self.index]);

                    break;
                default:
                    break;
            }
            self.node.parent.addChild(jiangliPrefab, 200);
            // self.img_zhezhao.active = false;
            if (self.ZhuanPan.rotation != 0) {
                self.ZhuanPan.rotation = 0;
            }
        }, 8.0);

        //暂时是自动初始化
        // this.scheduleOnce(function () {
        //     if (self.ZhuanPan.rotation != 0) {
        //         self.ZhuanPan.rotation = 0;
        //     }
        // }, 10.0);
    },

    /**
     * 转盘转动方法
     */
    DialRotateAction: function () {
        var self = this;
        var action = cc.sequence(
            cc.rotateBy(5.0, 360 * 5),
            cc.rotateBy(1.0, self.rotationNum + self.random_1),
        ).easing(cc.easeInOut(3.0));
        return action;
    },
});
