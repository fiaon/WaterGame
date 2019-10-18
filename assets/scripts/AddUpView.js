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
        lvUp:cc.Node,
        tanchuan_1:cc.Node,
        tanchuan_2:cc.Node,
        lab_lvl:cc.Label,
        lab_days_bai:cc.Label,
        lab_days_shi:cc.Label,
        lab_days_ge:cc.Label,
        addshuidi_prefab:cc.Prefab,
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

    },
    init(type,data){
        //type 类型用来显示的窗口
        if(type == 1){
            this.lvUp.active = true;
            this.addshuidinum = data.addshuidi;
            this.lab_lvl.string = "LV." +data.lvl;
        }else if(type == 2){
            this.tanchuan_1.active = true;
            if(data>=100){
                this.lab_days_bai.string = parseInt(data/100);
                this.lab_days_shi.string = parseInt((data%100)/10);
                this.lab_days_ge.string = data%10;
            }else if(data>=10 && data<100){
                this.lab_days_shi.string = parseInt(data/10);
                this.lab_days_ge.string = data%10;
            }else if(data <10){
                this.lab_days_ge.string = data;
            }
        }else if(type == 3){
            this.tanchuan_2.active = true;
        }
    },
    LvUpBtn(){
        this.node.destroy();
        let add = cc.instantiate(this.addshuidi_prefab);
        add.getComponent("AddUpTanChuang").init(this.addshuidinum);
        this.node.parent.addChild(add);
    },
    CloseBtn(){
        this.node.destroy();
    },
    ShareBtn(){
        Global.ShareApp();
    },
    //保存图片操作
    onSavePhotoBtnClick: function () {
        // if (cc.sys.browserType == cc.sys.BROWSER_TYPE_WECHAT_GAME) {
        //     this.photo = null;
        //     let self = this;
        //     cc.loader.loadRes("1", function (err, data) {
        //         if (err) {
        //             return;
        //         }
        //         self.photo = data.url;
        //         // 上线前注释console.log("self.photo == ", self.photo);

        //         wx.hideLoading({});
        //         self.saveImage(self.photo);
        //     });
        // }
    },
    openAlbumSeting: function () {
        var _self = this;
        wx.showModal({
            title: "提示",
            content: "游戏需要您授权保存图片到相册",
            showCancel: false,
            cancelText: "取消",
            confirmText: "确认",
            success: function (e) {
                wx.openSetting({
                    success: function (e) {
                        0 == e.authSetting["scope.writePhotosAlbum"] || _self.saveToAlbum();
                    }
                });
            }
        });
    },

    dealAlbum: function () {
        var _self = this;
        wx.authorize({
            scope: "scope.writePhotosAlbum",
            success: function (e) {
                _self.saveToAlbum();
            },
            fail: function (e) {
                _self.openAlbumSeting();
            }
        });
    },

    saveImage: function (t) {
        // 上线前注释console.log("t == ", t);
        this.mSaveImage = t;
        // 上线前注释console.log("this.mSaveImage == ", this.mSaveImage);
        var _self = this;
        wx.getSetting({
            success: function (t) {
                if (null == t.authSetting["scope.writePhotosAlbum"])
                    _self.dealAlbum();
                else if (1 == t.authSetting["scope.writePhotosAlbum"])
                    _self.saveToAlbum();
                else
                    _self.openAlbumSeting();
            },

            fail: function (t) {
                _self.dealAlbum();
            }

        });

    },

    saveToAlbum: function () {
        wx.saveImageToPhotosAlbum({
            filePath: this.mSaveImage,
            success: function (t) {
                wx.showToast({
                    title: "保存成功",
                    icon: "success",
                    image: "",
                    duration: 2e3
                });
            }
        });
    },
    // update (dt) {},
});
