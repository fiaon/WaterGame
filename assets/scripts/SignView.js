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
        content:cc.Node,
        jindutiao:{
            default:[],
            type:cc.ProgressBar,
        },
        cj_prefab:{
            default:null,
            type:cc.Prefab,
        }
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        this.videonum =0;
        Global.GetAchievementList((res)=>{
            if(res.state == 1){
                for(let i=0;i<res.result.length;i++){
                    let cj = cc.instantiate(this.cj_prefab);
                    cj.getComponent("ChengJiuPrefab").init(res.result[i]);
                    this.content.addChild(cj);
                    if(res.result[i].issign &&res.result[i].isvideo){
                        this.videonum ++;
                    }
                    if(this.videonum!=0){
                        let jundu = this.videonum%4;
                        switch(jundu){
                            case 0:
                                this.jindutiao[this.videonum/4-1].progress = 1;
                                break;
                            case 1:
                                this.jindutiao[Math.floor(this.videonum/4)].progress = 0;
                                break;
                            case 2:
                                this.jindutiao[Math.floor(this.videonum/4)].progress = 0.3;
                                break;
                            case 3:
                                this.jindutiao[Math.floor(this.videonum/4)].progress = 0.6;
                                break;
                            default:
                                break;
                        }
                    }
                }
            }
        });
    },
    onClose(){
        this.node.destroy();
    },
    // update (dt) {},
});
