window.Global = {
    ios: 1,
    appid:"wx039e71b55cba9869",
    Introuid:0,
    sessionId:null,

    prefab_icon: null,
    prefab_gongxi: null,
    prefab_errortip: null,
    prefab_miji: null,
    prefab_shibai: null,
    prefab_guanggao: null,

    clip_right: null,
    clip_wrong: null,
    clip_tap: null,
    shareimg: null,
    banner: null,

    jumpappObject: null,

    jumpinfo_callback: null,

    //linkUrl:"https://wx.zaohegame.com/",
    linkUrl:"http://wx.zaohegame.com:8099/",//测试地址
    url_UserLogin: "game/UserLogin",
    url_UserAuth: "game/UserAuth",

    UserLogin(parme){
        let self = this;
        this.Post(self.url_UserLogin,parme,(res)=>{
            self.sessionId = res.result.sessionid;
            Global.ShouQuan();
        });
    },
    Post(url,parme,callback){
        var self = this;
        if (CC_WECHATGAME) {
            wx.request({
                url:self.linkUrl+url,
                method:'post',
                data:parme,
                header:{
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                success(res){
                    if(callback){
                        callback(res.data);
                    }
                    console.log("请求成功 "+url,res.data);
                },
                failed(res){
                    console.log("请求失败 "+url,res.data);
                },
                complete(res){
                    
                },
            });
        }else {
            var xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4) {
                    if (xhr.status >= 200 && xhr.status < 400) {
                        var response = xhr.responseText;
                        if (response) {
                            var responseJson = JSON.parse(response);
                            callback(responseJson);
                        } else {
                            console.log("返回数据不存在")
                            callback(null);
                        }
                    } else {
                        console.log("请求失败")
                        callback(null);
                    }
                }
            };
            xhr.open("POST", url, true);
            xhr.send();
        }
    },
    
    //获取签到信息
    GetUserSignInfo(callback){
        let data = {
            sessionId:this.sessionId,
            appid:this.appid,
        }
        this.Post("game/GetUserSignInfo",data,callback);
    },
    //签到
    UserSign(type,callback){
        let data = {
            sessionId:this.sessionId,
            appid:this.appid,
            type:type,
        }
        this.Post("game/UserSign",data,callback);
    },
    //转盘抽奖结果
    RunZhuanPan(callback){
        let data = {
            sessionId:this.sessionId,
            appid:this.appid,
        }
        this.Post("game/RunZhuanPan",data,callback);
    },
    //获取转盘获奖信息
    GetZhuanPanLog(callback){
        let data = {
            sessionId:this.sessionId,
            appid:this.appid,
        }
        this.Post("game/GetZhuanPanLog",data,callback);
    },
    //登陆
    Login(){
        wx.login({
            success(res) {
                console.log("登录成功 == ", res);
                //window.self.code = res.code;
                let parme = {
                    appid: Global.appid,
                    code: res.code,
                    introuid: Global.Introuid,
                };
                // Global.Post(url, parme);
                Global.UserLogin(parme);
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
    /**
     * 授权接口
     * @param {*} res 参数
     * @param {*} sessionId sessionId
     */
    UserAuthPost(res, sessionId, callback) {
        this.sessionId = sessionId;
        this.rawData = res.rawData;
        this.compareSignature = res.signature;
        this.encryptedData = res.encryptedData;
        this.iv = res.iv;
        let parme = {
            appid: this.appid,
            sessionId: this.sessionId,
            rawData: this.rawData,
            compareSignature: this.compareSignature,
            encryptedData: this.encryptedData,
            iv: this.iv,
        };
        this.Post(this.url_UserAuth, parme, (res) => {
            if (res.resultcode == 500) {
                this.UserAuthPost(this.res, this.sessionId, callback);
                console.log("需要重新授权");
                this.GetUserData();
            }
        });
    },
    TiaoZhanFriend() {
        if (CC_WECHATGAME) {
            console.log(this.shareimg);
            wx.shareAppMessage({
                title: '被这游戏分分钟虐的怀疑人生，我就问问：还有谁？',
                imageUrl: this.shareimg,
                success(res) {
                    console.log("yes");
                },
                fail(res) {
                    console.log("failed");
                },
            });
        }
    },

    ShowEndDlg() {
        let dlg = cc.instantiate(this.prefab_shibai);
        if (dlg) {
            let canvas = cc.find("Canvas");
            if (canvas) {
                dlg.parent = canvas;
            }
        }
    },
    //获得分享图片
    Getinfo() {
        var self = this;
        this.Get("https://wx.zaohegame.com/game/shareimg?appid=wxfa819a83fa221978", (obj) => {
            if (obj.state == 1) {
                this.shareimg = obj.result;
                console.log(self.shareimg)
            }
        });
    },

    GetJumpInfo(callback) {
        var self = this;
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
                            }
                        }
                        else {
                            console.log(i, err);
                        }
                    });
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
                            console.log("返回数据不存在")
                            callback(null);
                        }
                    } else {
                        console.log("请求失败")
                        callback(null);
                    }
                }
            };
            xhr.open("GET", url, true);
            xhr.send();
        }
    },

    showAdVedio(success, failed) {
        if (CC_WECHATGAME) {
            let videoAd = wx.createRewardedVideoAd({
                adUnitId: 'adunit-3dd2f672a153d93a'
            })

            videoAd.load()
                .then(() => videoAd.show())
                .catch(err => console.log(err.errMsg));
            videoAd.offClose();
            videoAd.onClose(res => {

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
            videoAd.onError(() => {
                console.log("失败处理");

            });
        }
    },

    showBannerTime: 0,
    showBanner: function () {
        if (this.banner == null) {
            if (CC_WECHATGAME) {
                let system = wx.getSystemInfoSync();
                if (system != null) {
                    this.ScreenWidth = system.windowWidth;
                    this.ScreenHeight = system.windowHeight;
                }

                if (system.system.search("iOS") != -1) {
                    this.ios = 1;
                    console.log("Ios");
                }
                else {
                    this.ios = -1;
                }
                let bannerAd = wx.createBannerAd({
                    adUnitId: 'adunit-e4a48fdb20684eec',
                    style: {
                        left: 0,
                        top: this.ScreenHeight - 90,
                        width: this.ScreenWidth,
                    }
                })

                bannerAd.onResize(res => {
                    console.log(res.width, res.height);
                    console.log(bannerAd.style)

                    if (bannerAd.style.realHeight > 120)
                        bannerAd.style.top = this.ScreenHeight - 120;
                    else
                        bannerAd.style.top = this.ScreenHeight - bannerAd.style.realHeight;
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
                    this.ScreenHeight = system.windowHeight;
                }


                this.showBannerTime = 0;
                this.banner.destroy();
                let bannerAd = wx.createBannerAd({
                    adUnitId: 'adunit-e4a48fdb20684eec',
                    style: {
                        left: 0,
                        top: this.ScreenHeight - 90,
                        width: this.ScreenWidth,
                    }
                })

                bannerAd.onResize(res => {
                    console.log(res.width, res.height);

                    if (bannerAd.style.realHeight > 120)
                        bannerAd.style.top = this.ScreenHeight - 120;
                    else
                        bannerAd.style.top = this.ScreenHeight - bannerAd.style.realHeight;
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
}