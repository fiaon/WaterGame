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
        GuanZhuView:{
            default:null,
            type:cc.Prefab,
        },
        AddUpView:{
            default:null,
            type:cc.Prefab,
        },
        MSGView:{
            default:null,
            type:cc.Prefab,
        },
        PiPeiView:{
            default:null,
            type:cc.Prefab,
        },
        PrizeView:{
            default:null,
            type:cc.Prefab,
        },
        QuCuoView:{
            default:null,
            type:cc.Prefab,
        },
        SignView:{
            default:null,
            type:cc.Prefab,
        },
        tips_prefab:{
            default:null,
            type:cc.Prefab,
        },
        tips2_prefab:{
            default:null,
            type:cc.Prefab,
        },
        luckTanChuang_prefab:{
            default:null,
            type:cc.Prefab,
        },
        prefab_tip:{
            default:null,
            type:cc.Prefab,
        },
        lab_name:cc.Label,
        lab_shuidi:cc.Label,
        lab_cjlvl:cc.Label,
        lab_cjname:cc.Label,
        shouyue_prefab:cc.Prefab,
        head_img:cc.Node,
        cj_img:cc.Node,
        name_img:cc.Node,
        head_mask:cc.Node,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.Arr_ShouQuanBtn = [];
    },

    start () {
        Global.prefab_tip = this.prefab_tip;
        if (CC_WECHATGAME) {
            Global.ShuiDiPlaneCheck((res)=>{
                if(res.state == 1){
                    if(res.result.fail.id){
                        let shouyue = cc.instantiate(this.shouyue_prefab);
                        shouyue.getComponent("ShouYue").init(2);
                        this.node.addChild(shouyue);
                    }else if(res.result.success.time){
                        let shouyue = cc.instantiate(this.shouyue_prefab);
                        shouyue.getComponent("ShouYue").init(1,res.result.success.shuidi);
                        this.node.addChild(shouyue);
                    }else{
                        this.UpdateUserInfo();
                    }
                }
            });
            
            let system = wx.getSystemInfoSync();
            if (system != null) {
                // 上线前注释console.log(system);
                this.ScreenWidth = system.windowWidth;
                this.ScreenHeight = system.windowHeight;
            }
            var self = this;
            var rt_1 = this.head_img.getBoundingBoxToWorld();
            var rt_2 = this.cj_img.getBoundingBoxToWorld();
            var rt_3 = this.name_img.getBoundingBoxToWorld();
            var ratio = this.ScreenWidth / 750;
            var detal = this.ScreenHeight / ratio - 1334;

            wx.getSetting({
                success: function (res) {
                    var authSetting = res.authSetting;
                    if (authSetting['scope.userInfo'] === false || authSetting['scope.userInfo'] == null){
                        var button = wx.createUserInfoButton({
                            type: 'text',
                            text: '',
                            style: {
                                left: rt_1.x * ratio,
                                top: (1334 - rt_1.y + detal) * ratio - rt_1.height * ratio,
                                width: rt_1.width * ratio,
                                height: rt_1.height * ratio,
                                lineHeight: 40,
                                backgroundColor: '#00ff0000',
                                color: '#00ffffff',
                                textAlign: 'center',
                                fontSize: 16,
                                borderRadius: 4
                            }
                        });
                        self.Arr_ShouQuanBtn.push(button);
                        button.onTap(res => {
                            // button.hide();
                            wx.getUserInfo({
                                opendIdList: ['selfOpenId'],
                                success: res => {
                                    // 上线前注释console.log("success+", res);
                                    var data = res.userInfo;
                                    let avatarUrl = data.avatarUrl;
                                    Global.avatarUrl = avatarUrl;
                                    Global.sex = data.gender;
                                    Global.res = res;
                                    self.head_mask.active = true;
                                    cc.loader.load({ url: Global.avatarUrl, type: "jpg" }, function (error, res) {
                                        // 上线前注释console.log("load png ", error);
                                        let framesprite = new cc.SpriteFrame(res);
                                        self.head_mask.getChildByName("sprite").getComponent(cc.Sprite).spriteFrame = framesprite;
                                    });
                                    Global.UserAuthPost(res, Global.sessionId);
                                },
                                fail: res => {
                                    wx.showModal({
                                        title: "提示",
                                        content: "需要您授权才能显示头像",
                                        showCancel: false,
                                        cancelText: "取消",
                                        confirmText: "确认",
                                        success: function (e) {
                                            wx.openSetting({
                                                success: function (res) {
                                                    if (res.authSetting["scope.userInfo"] === true) {
                                                        wx.getUserInfo({
                                                            opendIdList: ['selfOpenId'],
                                                            success: res => {
                                                                button.hide();
                                                                var data = res.userInfo;
                                                                Global.avatarUrl = data.avatarUrl;
                                                                Global.sex = data.gender;
                                                                Global.res = res;
                                                                self.head_mask.active = true;
                                                                cc.loader.load({ url: Global.avatarUrl, type: "jpg" }, function (error, res) {
                                                                    // 上线前注释console.log("load png ", error);
                                                                    let framesprite = new cc.SpriteFrame(res);
                                                                    self.head_mask.getChildByName("sprite").getComponent(cc.Sprite).spriteFrame = framesprite;
                                                                });
                                                                Global.UserAuthPost(res, Global.sessionId);
                
                                                            },
                                                        });
                                                    }
                                                },
                                            })
                                        }
                                    });
                                },
                            });
                        })
                        var button_1 = wx.createUserInfoButton({
                            type: 'text',
                            text: '',
                            style: {
                                left: rt_2.x * ratio,
                                top: (1334 - rt_2.y + detal) * ratio - rt_2.height * ratio,
                                width: rt_2.width * ratio,
                                height: rt_2.height * ratio,
                                lineHeight: 40,
                                backgroundColor: '#00ff0000',
                                color: '#00ffffff',
                                textAlign: 'center',
                                fontSize: 16,
                                borderRadius: 4
                            }
                        });
                        self.Arr_ShouQuanBtn.push(button_1);
                        button_1.onTap(res => {
                            button_1.hide();
                            wx.getUserInfo({
                                opendIdList: ['selfOpenId'],
                                success: res => {
                                    // 上线前注释console.log("success+", res);
                                    var data = res.userInfo;
                                    let avatarUrl = data.avatarUrl;
                                    Global.avatarUrl = avatarUrl;
                                    Global.sex = data.gender;
                                    Global.res = res;
                                    self.head_mask.active = true;
                                    cc.loader.load({ url: Global.avatarUrl, type: "jpg" }, function (error, res) {
                                        // 上线前注释console.log("load png ", error);
                                        let framesprite = new cc.SpriteFrame(res);
                                        self.head_mask.getChildByName("sprite").getComponent(cc.Sprite).spriteFrame = framesprite;
                                    });
                                    Global.UserAuthPost(res, Global.sessionId,(res)=>{
                                        let sign = cc.instantiate(self.SignView);
                                        if(sign){
                                            self.node.addChild(sign);
                                        }
                                    });
                                },
                                fail: res => {
                                    button_1.hide();
                                },
                            });
                        })
                        var button_2 = wx.createUserInfoButton({
                            type: 'text',
                            text: '',
                            style: {
                                left: rt_3.x * ratio,
                                top: (1334 - rt_3.y + detal) * ratio - rt_3.height * ratio,
                                width: rt_3.width * ratio,
                                height: rt_3.height * ratio,
                                lineHeight: 40,
                                backgroundColor: '#00ff0000',
                                color: '#00ffffff',
                                textAlign: 'center',
                                fontSize: 16,
                                borderRadius: 4
                            }
                        });
                        self.Arr_ShouQuanBtn.push(button_2);
                        button_2.onTap(res => {
                            // button_2.hide();
                            wx.getUserInfo({
                                opendIdList: ['selfOpenId'],
                                success: res => {
                                    // 上线前注释console.log("success+", res);
                                    var data = res.userInfo;
                                    let avatarUrl = data.avatarUrl;
                                    Global.avatarUrl = avatarUrl;
                                    Global.sex = data.gender;
                                    Global.res = res;
                                    self.head_mask.active = true;
                                    cc.loader.load({ url: Global.avatarUrl, type: "jpg" }, function (error, res) {
                                        // 上线前注释console.log("load png ", error);
                                        let framesprite = new cc.SpriteFrame(res);
                                        self.head_mask.getChildByName("sprite").getComponent(cc.Sprite).spriteFrame = framesprite;
                                    });
                                    Global.UserAuthPost(res, Global.sessionId);
                                },
                                fail: res => {
                                    wx.showModal({
                                        title: "提示",
                                        content: "需要您授权才能显示昵称",
                                        showCancel: false,
                                        cancelText: "取消",
                                        confirmText: "确认",
                                        success: function (e) {
                                            wx.openSetting({
                                                success: function (res) {
                                                    if (res.authSetting["scope.userInfo"] === true) {
                                                        wx.getUserInfo({
                                                            opendIdList: ['selfOpenId'],
                                                            success: res => {
                                                                button.hide();
                                                                var data = res.userInfo;
                                                                Global.avatarUrl = data.avatarUrl;
                                                                Global.sex = data.gender;
                                                                Global.res = res;
                                                                self.head_mask.active = true;
                                                                cc.loader.load({ url: Global.avatarUrl, type: "jpg" }, function (error, res) {
                                                                    // 上线前注释console.log("load png ", error);
                                                                    let framesprite = new cc.SpriteFrame(res);
                                                                    self.head_mask.getChildByName("sprite").getComponent(cc.Sprite).spriteFrame = framesprite;
                                                                });
                                                                Global.UserAuthPost(res, Global.sessionId);
                
                                                            },
                                                        });
                                                    }
                                                },
                                            })
                                        }
                                    });
                                },
                            });
                        })
                    }else{
                        wx.getUserInfo({
                            opendIdList: ['selfOpenId'],
                            success: res => {
                                // 上线前注释console.log("resssss=", res);
                                var data = res.userInfo;
                                let avatarUrl = data.avatarUrl;
                                Global.avatarUrl = avatarUrl;
                                Global.sex = data.gender;
                                self.head_mask.active = true;
                                cc.loader.load({ url: Global.avatarUrl, type: "jpg" }, function (error, res) {
                                    // 上线前注释console.log("load png ", error);
                                    let framesprite = new cc.SpriteFrame(res);
                                    self.head_mask.getChildByName("sprite").getComponent(cc.Sprite).spriteFrame = framesprite;
                                });
                                Global.res = res;

                                Global.UserAuthPost(res, Global.sessionId);
                            },
                        });
                    }
                }
            });
        }
    },
    UpdateUserInfo(){
        var self = this;
        Global.GetUserInfo((res)=>{
            if(res.state == 1){
                Global.name = res.result.nick;
                Global.shuidi = res.result.shuidi;
                Global.luckts = res.result.luckts;
                Global.logindays = res.result.logindays;
                Global.gold = res.result.gold;
                Global.addtimes = res.result.addtimes;
                Global.keepcount = res.result.keepcount;
                Global.isgz = res.result.isgz;
                Global.usercj = res.result.usercj;
                Global.istodayfirster = res.result.istodayfirster;
                Global.cjlvl = res.result.cjlvl;
                Global.cjname = res.result.cjname;
                Global.cjcount = res.result.cjcount;
                if(Global.name && Global.name != ""){
                    if(Global.name.length >5){
                        Global.name =  Global.name.substr(0,5)+"...";
                    }
                    this.lab_name.string = Global.name;
                }
                if(Global.luckts >10){
                    cc.find("leftview/Btn_reward",this.node).active = false;
                }
                if(Global.shuidi >= 10000){
                    let num = Global.shuidi/10000
                    this.lab_shuidi.string = Math.floor(num*10)/100 +"w";
                }else{
                    this.lab_shuidi.string = Global.shuidi;
                }
                //当天首次登陆 且这次登陆可以升级
                if(Global.usercj.addshuidi){
                    let addup = cc.instantiate(this.AddUpView);
                    addup.getComponent("AddUpView").init(1,Global.usercj);
                    this.node.addChild(addup);
                }else{
                    //第一次登陆但是不能升级
                    if(Global.istodayfirster){
                        let addup = cc.instantiate(this.AddUpView);
                        addup.getComponent("AddUpView").init(2,Global.logindays);
                        this.node.addChild(addup);
                    }else{
                        let addup = cc.instantiate(this.AddUpView);
                        addup.getComponent("AddUpView").init(3);
                        this.node.addChild(addup);
                    }
                }
                this.lab_cjlvl.string = Global.cjlvl;
                this.lab_cjname.string = Global.cjname;
            }
        });
    },
    //点击饮水计划
    onClickPlan(){
        cc.director.loadScene("PlanScene.fire");
    },
    //点击排行榜
    onClickRank(){
        cc.director.loadScene("rank.fire");
    },
    onClickGameBtn(){
        //判断水滴值 （门票）
        if(Global.shuidi >1000){
            //TODO 调用消耗接口
            let qucuo = cc.instantiate(this.QuCuoView);
            if(qucuo){
                this.node.addChild(qucuo);
            }
        }else{
            Global.ShowTip(this.node,"水滴余额不足，请参与计划获取");
        }
    },
    onClickGuanZhu(){
        let guanzhu = cc.instantiate(this.GuanZhuView);
        if(guanzhu){
            this.node.addChild(guanzhu);
        }
    },
    //点击游戏说明
    onClickMsg(){
        let msg = cc.instantiate(this.MSGView);
        if(msg){
            this.node.addChild(msg);
        }
    },
    //我的奖品
    onClickPrize(){
        let prize = cc.instantiate(this.PrizeView);
        if(prize){
            this.node.addChild(prize);
        }
    },
    //签到
    onClickSign(){
        let self = this;
        wx.getSetting({
            success: function (res) {
                var authSetting = res.authSetting;
                if (authSetting['scope.userInfo'] === true) {
                    if (Global.UserAuthPostCount > 0) {
                        let sign = cc.instantiate(self.SignView);
                        if(sign){
                            self.node.addChild(sign);
                        }
                    } else {
                        wx.getUserInfo({
                            success(res){
                                Global.UserAuthPost(res, Global.sessionId,(res)=>{
                                    let sign = cc.instantiate(self.SignView);
                                    if(sign){
                                        self.node.addChild(sign);
                                    }
                                });
                            }
                        });
                    }
                } else {
                    wx.showModal({
                        title: "提示",
                        content: "需要您授权才能打开成就列表",
                        showCancel: false,
                        cancelText: "取消",
                        confirmText: "确认",
                        success: function (e) {
                            wx.openSetting({
                                success: function (res) {
                                    if (res.authSetting["scope.userInfo"] === true) {
                                        wx.getUserInfo({
                                            opendIdList: ['selfOpenId'],
                                            success: res => {
                                                // 上线前注释
                                                console.log("reshahaha=", res);
                                                var data = res.userInfo;
                                                Global.avatarUrl = data.avatarUrl;
                                                Global.sex = data.gender;
                                                Global.res = res;
                                                self.head_mask.active = true;
                                                cc.loader.load({ url: Global.avatarUrl, type: "jpg" }, function (error, res) {
                                                    // 上线前注释console.log("load png ", error);
                                                    let framesprite = new cc.SpriteFrame(res);
                                                    self.head_mask.getChildByName("sprite").getComponent(cc.Sprite).spriteFrame = framesprite;
                                                });
                                                Global.UserAuthPost(res, Global.sessionId);

                                            },
                                        });
                                    }
                                },
                                fail: function (res) {
                                    
                                }
                            })
                        }
                    });
                }
            }
        });
        
    },
    //分享
    ShaerApp(){
        Global.ShareApp();
    },
    //幸运天使
    LuckyAngelBtn(){
        if(Global.luckts <=10){
            let lucky = cc.instantiate(this.luckTanChuang_prefab);
            if(lucky){
                this.node.addChild(lucky);
                cc.find("leftview/Btn_reward",this.node).active = false;
            }
        }
    },
    update (dt) {
        if (Global.UserAuthPostCount != 0) {
            for (let i = 0; i < this.Arr_ShouQuanBtn.length; i++) {
                this.Arr_ShouQuanBtn[i].hide();
            }
        }
    },
});
