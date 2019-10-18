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
        lab_order:cc.Label,
        lab_time:cc.Label,
        switchbtn:{
            default: null,
            type: cc.Sprite,
        },
        btnSprite: {
            default: [],
            type: cc.SpriteFrame
        },
        id:0,
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        this.ischange = true;
    },
    init(order,data){
        this.lab_order.string = "第"+(order+1)+"杯";
        this.lab_time.string = data.time.substr(0,5);
        this.id = data.id;
        this.isopen = data.isopen;
        if(data.isopen){
            this.switchbtn.spriteFrame = this.btnSprite[0];
        }else{
            this.switchbtn.spriteFrame = this.btnSprite[1];
        }
        
    },
    //点击了开关
    onClickToggle() {
        if(this.isopen == false){
            //调用开启接口
            Global.ShuiDiPlaneSetOpen(this.id,true);
            Global.isopencount++;
            this.switchbtn.spriteFrame = this.btnSprite[0];
        }else{
            //至少要开启四个
            if(Global.isopencount >4){
                //调用关闭接口
                Global.ShuiDiPlaneSetOpen(this.id,false);
                Global.isopencount--;
                this.switchbtn.spriteFrame = this.btnSprite[1];
            }else{
                //
                this.ischange = false;
                Global.ShowTip(this.node,"为了您的健康，每日至少4杯水哦");
            }
        }
        if(this.ischange){
            this.isopen = !this.isopen;
        }
    },
    // update (dt) {},
});
