window.Global = {
    name:null,
    avatarUrl:null,
    sex:0,
    prefab_tip: null,       //提示
    questionList :null,     //答题数组
    shuidi:null,            //水滴值
    gold:null,              //金币 转盘抽奖用
    isgz:null,              //是否关注
    logindays:null,         //连续登陆天数
    luckts:null,            //每日福利次数
    addtimes:null,          //当然可添加的计划 0不可加
    usercj:null,            //触发登陆成就事件 addshuidi:添加的水滴 lvl:成就等级 name:成就名字 id:成就id
    keepcount:null,         //守约次数
    isopencount:0,          //开关数量
    istodayfirster:null,    //是否首次登录
    cjlvl:null,             //成就等级 没有就是 0 整型
    cjname:null,            //成就名字 没有就是 空 字符串类型
    UserAuthPostCount:0,            //授权次数  
    qucuocard:0,            //去错卡
    robot_times:0,          //机器人答题时间区间
    robot_rate:0,           //机器人答题正确率
    robot_name:null,        //机器人姓名
    robot_lvl:null,         //机器人等级
    robot_sex:null,         //机器人性别
    robot_imgurl:null,      //机器人头像
    cjcount:null,           //用户免费抽奖次数
    
    
    startTime:null,                         //页面停留时长
    Time_Last: 0,                           //切后台时间
    Time_After: 0,                          //切回前台时间
    Time_Cha: 0,                            //前后端切换时间差
    ShiWanWhetherSuccess: false,            //是否跳转试玩成功
    shareimg: null,
    banner: null,
    res:null,

    jumpappObject: null,

    jumpinfo_callback: null,

    appid: "wxa0aea5300e796ff4",
    appSecret: "445a742e3b2ed6088baf766859d9fd79",
    //linkUrl: "https://wx.zaohegame.com/",             //域名
    linkUrl: "http://wx.zaohegame.com:8099/",           //测试域名
    sessionId: null,                                    //sessionid
    app_data:null,                                      //第三方进游戏存储数据
    Introuid: 0,                                        //用来辨别邀请任务的id
    PrizeListData: [],           //奖品列表
    
    

    url_UserLoginV2: "game/UserLoginV2",
    url_UserAuthV2: "game/UserAuthV2", 
    url_GetUserInfo:"xsd/GetUserInfo",                      //获取玩家信息
    url_GetAchievementList:"xsd/GetAchievementList",        //成就列表(签到列表)
    url_GetAchievementVideo:"xsd/GetAchievementVideo",
    url_GetQuestionList:"xsd/GetQuestionList",              //题目
    url_GetLuckTS:"xsd/GetLuckTS",                          //每日领取福利
    url_ScoreChange:"xsd/ScoreChange",                      //数值改变接口
    url_SetGZ:"xsd/SetGZ",                                  //关注有礼
    url_ShuiDiPlaneList:"xsd/ShuiDiPlaneList",              //饮水计划
    url_ShuiDiPlaneSetOpen:"xsd/ShuiDiPlaneSetOpen",        //设置开关
    url_ShuiDiPlaneSetTime:"xsd/ShuiDiPlaneSetTime",        //修改时间
    url_ShuiDiPlaneLog:"xsd/ShuiDiPlaneLog",                //守约纪录
    url_ShuiDiPlaneCheck:"xsd/ShuiDiPlaneCheck",            //是否守约
    url_ShuiDiPlaneLookVideo:"xsd/ShuiDiPlaneLookVideo",    //守约看视频奖励
    url_ShuiDiRobot:"xsd/ShuiDiRobot",                      //获取机器人接口
    url_RunZhuanPan: "game/RunZhuanPan",                    //接口地址
    url_GetZhuanPanLog: "game/GetZhuanPanLog",              //接口地址
    url_UserCJ:"xsd/UserCJ",                                //用户消耗免费抽奖次数接口

    UserCJ(callback) {
        let parme = {
            sessionId: this.sessionId,
        };
        this.Post(this.url_UserCJ,parme,callback);
    },
    /**
     * 抽奖结果列表
     */
    GetZhuanPanLog() {
        let parme = {
            sessionId: this.sessionId,
            appid: this.appid,
        };
        this.Post(this.url_GetZhuanPanLog, parme, (res) => {
            this.PrizeListData = res.result;
            // 上线前注释console.log("this.PrizeListData == ", this.PrizeListData);
        });
    },

    /**
     * 抽奖
     */
    RunZhuanPan(callback) {
        let parme = {
            sessionId: this.sessionId,
            appid: this.appid,
        };
        this.Post(this.url_RunZhuanPan, parme,callback);
    },

    //获取机器人
    ShuiDiRobot(callback){
        let parme = {
            sessionid:this.sessionId,
        }
        this.Post(this.url_ShuiDiRobot,parme,callback);
    },
    
    //成就看视频接口
    GetAchievementVideo(id,callback){
        let parme = {
            sessionid:this.sessionId,
            id:id,
        }
        this.Post(this.url_GetAchievementVideo,parme,callback);
    },
    //守约看视频奖励
    ShuiDiPlaneLookVideo(id,callback){
        let parme = {
            sessionid:this.sessionId,
            id:id,
        }
        this.Post(this.url_ShuiDiPlaneLookVideo,parme,callback);
    },
    //是否守约
    /*
        回调参数
        time    时间
        id      守约id
        isopen  开关
        shuidi  奖励水滴值
    */
    ShuiDiPlaneCheck(callback){
        let parme = {
            sessionid:this.sessionId,
        }
        this.Post(this.url_ShuiDiPlaneCheck,parme,callback);
    },
    //守约纪录
    ShuiDiPlaneLog(callback){
        let parme = {
            sessionid:this.sessionId,
        }
        this.Post(this.url_ShuiDiPlaneLog,parme,callback);
    },
    //修改饮水计划时间
    ShuiDiPlaneSetTime(id,time,callback){
        let parme = {
            sessionid:this.sessionId,
            id:id,
            time:time,
        }
        this.Post(this.url_ShuiDiPlaneSetTime,parme,callback);
    },
    //设置饮水计划的开关
    ShuiDiPlaneSetOpen(id,isopen,callback){
        let parme = {
            sessionid:this.sessionId,
            id:id,
            isopen:isopen,
        }
        this.Post(this.url_ShuiDiPlaneSetOpen,parme,callback);
    },
    //饮水计划
    ShuiDiPlaneList(callback){
        let parme = {
            sessionid:this.sessionId,
        }
        this.Post(this.url_ShuiDiPlaneList,parme,callback);
    },
    //关注有礼
    SetGZ(callback){
        let parme = {
            sessionid:this.sessionId,
        }
        this.Post(this.url_SetGZ,parme,callback);
    },
    //数值变动接口
    ScoreChange(num,type,callback){
        let parme = {
            sessionid:this.sessionId,
            num:num,                    //可正可负
            type:type,                  //1 金币 2水滴
        }
        this.Post(this.url_ScoreChange,parme,callback);
    },
    //领取每日福利
    GetLuckTS(num,callback){
        let parme = {
            sessionid:this.sessionId,
            num:num,                    //水滴数
        }
        this.Post(this.url_GetLuckTS,parme,callback);
    },
    //获取游戏题目
    GetQuestionList(callback){
        let parme = {
            sessionid:this.sessionId,
        }
        this.Post(this.url_GetQuestionList,parme,callback);
    },
    //成就列表
    GetAchievementList(callback){
        let parme = {
            sessionid:this.sessionId,
        }
        this.Post(this.url_GetAchievementList,parme,callback);
        //回调 参数信息
        //gaivevalue    给与奖励的值
        //issign        是否达到
        //lvl           成就等级
        //days          需要天数
        //isvideo       是否已经看视频
    },
    //获取用户信息
    GetUserInfo(callback){
        let parme = {
            sessionid:this.sessionId,
        }
        this.Post(this.url_GetUserInfo,parme,callback);
    },
    addListener: function () {
        var that = this;
        if (CC_WECHATGAME) {
            // 上线前注释console.log("前后台切换--");
            wx.onHide(res => {
                // 上线前注释console.log("小程序切换到了后台", res);
                that.Time_Cha = 0;
                that.Time_Last = new Date().getTime();
                
                if (that.Time_Last != null && that.Time_After != null) {
                    that.Time_Cha = (that.Time_After - that.Time_Last) / 1000;
                    // console.log("that.Time_Cha == ", that.Time_Cha);
                    if (that.Time_Cha >= 20) {
                        that.Time_Last = 0;
                        that.Time_After = 0;
                    } else {

                    }
                }
            });
            // wx.onShow(this.onGameHide.bind(this));
            wx.onShow(res => {
                // 上线前注释console.log("小程序重新回到了前台", res);
                that.Time_After = new Date().getTime();
                // 上线前注释console.log("当前时间 =回到前台= ", (new Date()).getTime(), new Date().getMinutes(), new Date().getSeconds());
                if (res.query.test) {
                    that.test = res.query.test;
                    that.ShareID = res.query.id;
                    
                }
                if (that.Time_Last != null && that.Time_After != null) {
                    that.Time_Cha = (that.Time_After - that.Time_Last) / 1000;
                    // console.log("that.Time_Cha == ", that.Time_Cha);
                    if (that.Time_Cha >= 20) {
                        that.Time_Last = 0;
                        that.Time_After = 0;
                    } else {
                        that.ShiWanWhetherSuccess = false;
                        that.Time_Cha = 0;
                    }
                }
            });
        } else {
            // 上线前注释console.log("前后台切换--==");
        }
    },
    /**
     * 登陆接口
     * @param {*} parme 参数
     */
    UserLogin(parme,callback) {
        let self = this;
        // 上线前注释console.log("parme =登录= ", parme);
        this.Post(this.url_UserLoginV2, parme, (res) => {
            if(res.state == 1){
                self.sessionId = res.result.sessionid;
                if(callback){
                    callback(res);
                }
            }
            //Global.ShouQuan();
        });
    },
     /**
     * 授权接口
     * @param {*} res 参数
     * @param {*} sessionId sessionId
     */
    UserAuthPost(res, sessionId, callback) {
        Global.UserAuthPostCount++;
        this.sessionId = sessionId;
        this.rawData = res.rawData;
        this.compareSignature = res.signature;
        this.encryptedData = res.encryptedData;
        this.iv = res.iv;
        let parme ={};
        if(Global.app_data){
            parme = {
                appid: this.appid,
                sessionId: this.sessionId,
                rawData: this.rawData,
                compareSignature: this.compareSignature,
                encryptedData: this.encryptedData,
                iv: this.iv,
                appdata:Global.app_data,
            };
        }else{
            parme = {
                appid: this.appid,
                sessionId: this.sessionId,
                rawData: this.rawData,
                compareSignature: this.compareSignature,
                encryptedData: this.encryptedData,
                iv: this.iv,
                appdata:"",
            };
        }
        this.Post(this.url_UserAuthV2, parme, (res) => {
            if (res.resultcode == 500) {
                // this.UserAuthPost(this.res, this.sessionId, callback);
                console.log("需要重新授权");
            } else {
                this.Introuid = res.result.uid;
                console.log("用户人ID == ", this.Introuid);
            }
        });
    },
    ShouQuan(){
        if (CC_WECHATGAME) {
            let exportJson = {};
            let sysInfo = wx.getSystemInfoSync();
            //获取微信界面大小
            let width = sysInfo.screenWidth;
            let height = sysInfo.screenHeight;
            window.wx.getSetting({
                success (res) {
                    console.log(res.authSetting);
                    if (res.authSetting["scope.userInfo"]) {
                        console.log("用户已授权");
                        window.wx.getUserInfo({
                            success(res){
                                console.log(res);
                                Global.UserAuthPost(res, Global.sessionId, () => {});
                                exportJson.userInfo = res.userInfo;
                                //此时可进行登录操作
                                Global.name = res.userInfo.nickName; //用户昵称
                                Global.avatarUrl = res.userInfo.avatarUrl; //用户头像图片 url
                                Global.sex = res.userInfo.gender;   //用户性别
                            }
                        });
                    }else {
                        console.log("用户未授权");
                        let button = window.wx.createUserInfoButton({
                            type: 'text',
                            text: '',
                            style: {
                                left: 0,
                                top: 0,
                                width: width,
                                height: height,
                                backgroundColor: '#00000000',//最后两位为透明度
                                color: '#ffffff',
                                fontSize: 20,
                                textAlign: "center",
                                lineHeight: height,
                            }
                        });
                        button.onTap((res) => {
                            if (res.userInfo) {
                                console.log("用户授权:", res);
                                Global.UserAuthPost(res, Global.sessionId, () => {});
                                exportJson.userInfo = res.userInfo;
                                //此时可进行登录操作
                                Global.name = res.userInfo.nickName; //用户昵称
                                Global.avatarUrl = res.userInfo.avatarUrl; //用户头像图片 url
                                Global.sex = res.userInfo.gender;   //用户性别
                                button.destroy();
                            }else {
                                console.log("用户拒绝授权:", res);
                            }
                        });
                    }
                }
            })
        }
    },
    Getinfo() {
        var self = this;
        this.Get("https://wx.zaohegame.com/game/shareimg?appid=wx4fb5b2de70ef1649", (obj) => {
            if (obj.state == 1) {
                this.shareimg = obj.result;
            }
        });
    },

    GetJumpInfo(callback) { 
        this.Get("https://wx.zaohegame.com/game/jumpapp?appid=wxfa819a83fa221978", (obj) => {
            if (obj.state == 1) {
                this.jumpappObject = obj.result;
                var self = this;
                var count = 0;
                for (let i = 0; i < this.jumpappObject.length; i++) {
                    cc.loader.load({ url: this.jumpappObject[i].img, type: "png" }, function (err, res) {
                        self.jumpappObject[i].sprite = null;
                        if (err == null) {
                            let spriteFrame = new cc.SpriteFrame(res);
                            self.jumpappObject[i].sprite = spriteFrame;
                            count++;
                            if (count == self.jumpappObject.length) {
                                if (self.jumpinfo_callback) {
                                    self.jumpinfo_callback();
                                }
                                if (callback) {
                                    callback();
                                }
                            }
                        }
                        else {
                            // 上线前注释console.log(i, err);
                        }
                    });
                    if(this.jumpappObject[i].img2 !=""){
                        cc.loader.load({ url: this.jumpappObject[i].img2, type: "jpg" }, function (err, res) {
                            self.jumpappObject[i].lunbo = null;
                            if (err == null) {
                                let spriteFrame = new cc.SpriteFrame(res);
                                self.jumpappObject[i].lunbo  = spriteFrame;
                                
                            }
                            else {
                                console.log(i, err);
                            }
                        });
                    }else{
                        self.jumpappObject[i].lunbo = null;
                    }
                }
                
            }
        });
    },
    Get(url, callback) {
        var self = this;
        if (CC_WECHATGAME) {
            wx.request({
                url: url,
                success: function (res) {
                    callback(res.data);
                    // 上线前注释
                    console.log(res.data);
                }
            });
        }
        else {
            var xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4) {
                    if (xhr.status >= 200 && xhr.status < 400) {
                        var response = xhr.responseText;
                        if (response) {
                            var responseJson = JSON.parse(response);
                            callback(responseJson);
                        } else {
                            // 上线前注释console.log("返回数据不存在")
                            callback(null);
                        }
                    } else {
                        // 上线前注释console.log("请求失败")
                        callback(null);
                    }
                }
            };
            xhr.open("GET", url, true);
            xhr.send();
        }
    },
    ShareApp(callback) {
        if (CC_WECHATGAME) {
            // 上线前注释console.log(this.shareimg);
            wx.shareAppMessage({
                title: '被这游戏分分钟虐的怀疑人生，我就问问：还有谁？',
                imageUrl: this.shareimg,
                success(res) {
                    // 上线前注释console.log("yes");
                },
                fail(res) {
                    // 上线前注释console.log("failed");
                },
                complete(res) {
                    // 上线前注释console.log("complete");
                }
            });
            if (callback) {
                callback();
            }
        }
    },
    /**
     * Post请求接口
     * @param {*} url 链接 
     * @param {*} parme 参数（json形势）
     * @param {*} callback 回调方法
     */
    Post(url, parme, callback) {
        var self = this;
        if (CC_WECHATGAME) {
            wx.request({
                url: self.linkUrl + url,
                method: 'post',
                data: parme,
                header: {
                    'content-type': 'application/x-www-form-urlencoded'//'application/json' // 默认值
                },
                success(res) {
                    if (callback) {
                        callback(res.data);
                    }
                    // 上线前注释
                    console.log("请求成功" + url, res.data);
                },
                failed(res) {
                    // 上线前注释
                    console.log("请求失败" + url, res.data);
                },
                complete(res) {
                    // 上线前注释console.log("请求完成" + url, res.data);
                },
            });
        } else {
            var xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4) {
                    if (xhr.status >= 200 && xhr.status < 400) {
                        var response = xhr.responseText;
                        if (response) {
                            var responseJson = JSON.parse(response);
                            callback(responseJson);
                        } else {
                            // 上线前注释console.log("返回数据不存在")
                            callback(null);
                        }
                    } else {
                        // 上线前注释console.log("请求失败")
                        callback(null);
                    }
                }
            };
            xhr.open("POST", url, true);
            xhr.send();
        }
    },
    showAdVedio(success, failed) {
        if (CC_WECHATGAME) {
            if(wx.createRewardedVideoAd){
                let videoAd = wx.createRewardedVideoAd({
                    adUnitId: 'adunit-3dd2f672a153d93a'
                })
    
                videoAd.load()
                    .then(() => videoAd.show())
                    .catch(err => console.log(err.errMsg));
                videoAd.offClose();
                videoAd.onClose(res => {
                    //强行暂停音乐 如果不暂停，调用resumeMusic是无效的，因为是微信让声音消失了
                    cc.audioEngine.pauseMusic();
                    //恢复音乐播放，比如调用
                    cc.audioEngine.resumeMusic();
                    if (res && res.isEnded || res === undefined) {
                        // self.UserInfo.AddGold(addvalue);
                        if (success)
                            success();
                    }
                    else {
                        if (failed)
                            failed();
                    }
                });
                videoAd.onError((err) => {
                    // 上线前注释
                    console.log("失败处理",err);
    
                });
            }
        }
    },

    showBannerTime: 0,
    showBanner: function () {
        if (this.banner == null) {
            if (CC_WECHATGAME) {
                let system = wx.getSystemInfoSync();
                if (system != null) {
                    this.ScreenWidth = system.windowWidth;
                    this.realWidth = this.ScreenWidth;
                    if (this.ScreenWidth - 20 < 300) {

                    } else {
                        this.realWidth = this.ScreenWidth - 20;
                    }
                    this.ScreenHeight = system.windowHeight;
                }

                if (system.system.search("iOS") != -1) {
                    this.ios = 1;
                    // 上线前注释console.log("Ios");
                }
                else {
                    this.ios = -1;
                }
                let bannerAd = wx.createBannerAd({
                    adUnitId: 'adunit-e4a48fdb20684eec',
                    style: {
                        // left: 0,
                        left: (this.ScreenWidth - this.realWidth) / 2,
                        top: this.ScreenHeight - 90,
                        width: this.realWidth,
                    }
                })

                bannerAd.onResize(res => {

                    if (bannerAd.style.realHeight > 120) {
                        // bannerAd.style.top = this.ScreenHeight - 120;
                        bannerAd.style.top = this.ScreenHeight - 120 - this.ScreenHeight * 0.02;
                        // 上线前注释console.log("123", bannerAd.style.top);
                    }
                    else {
                        bannerAd.style.top = this.ScreenHeight - bannerAd.style.realHeight - 5;
                        // 上线前注释console.log("12344", bannerAd.style.top);
                    }
                })
                this.banner = bannerAd;
                bannerAd.show()
                var self = this;
                bannerAd.onError(() => {
                    self.banner.hide();
                });
            }
            return;
        }

        this.showBannerTime++;
        if (this.showBannerTime >= 3) {
            if (CC_WECHATGAME) {
                let system = wx.getSystemInfoSync();
                if (system != null) {
                    this.ScreenWidth = system.windowWidth;
                    this.realWidth = this.ScreenWidth;
                    if (this.ScreenWidth - 20 < 300) {

                    } else {
                        this.realWidth = this.ScreenWidth - 20;
                    }
                    this.ScreenHeight = system.windowHeight;
                }

                this.showBannerTime = 0;
                this.banner.destroy();
                let bannerAd = wx.createBannerAd({
                    adUnitId: 'adunit-e4a48fdb20684eec',
                    style: {
                        // left: 0,
                        left: (this.ScreenWidth - this.realWidth) / 2,
                        top: this.ScreenHeight - 90,
                        width: this.realWidth,
                    }
                })

                bannerAd.onResize(res => {
                    // 上线前注释console.log(res.width, res.height);

                    if (bannerAd.style.realHeight > 120) {
                        // bannerAd.style.top = this.ScreenHeight - 120;
                        bannerAd.style.top = this.ScreenHeight - 120 - this.ScreenHeight * 0.02;
                        // 上线前注释console.log("123123", bannerAd.style.top);
                    } else {
                        bannerAd.style.top = this.ScreenHeight - bannerAd.style.realHeight - 5;
                        // 上线前注释console.log("12341234", bannerAd.style.top);
                    }
                })

                bannerAd.show();
                this.banner = bannerAd;
                var self = this;
                bannerAd.onError(() => {
                    self.banner.hide();
                });

            }
        }
        else {
            this.banner.show();
        }
    },
    /**
     * 添加提示语
     * @param {*} node 
     * @param {*} msg 
     */
    ShowTip(node, msg) {
        let tip = cc.instantiate(this.prefab_tip);
        // 上线前注释console.log("tip == ", tip);
        if (tip) {
            if (node.getChildByName("tips")) {

            } else {
                node.addChild(tip);
                let src = tip.getComponent(require("TipShow"));
                if (src) {
                    src.label.string = msg;
                }
            }
        }
    },
}