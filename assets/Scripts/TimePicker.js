// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html
var Itemtype = cc.Enum({
    _hour:1,
    _minute:2,
});
cc.Class({
    extends: cc.Component,

    properties: {
        itemtype:{
            default:Itemtype._hour,
            type:Itemtype,
        },
        textprefab:{
            default:null,
            type:cc.Prefab,
        },
        content:{
            default:null,
            type:cc.Node,
        },
        targetRec:{
            default:null,
            type:cc.Node,
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.contentHeight =0;                                                     //父物体高度
        this.conentSpacing = this.content.getComponent(cc.Layout).spacingY;        //子物体间距
        this.labelHeight = this.textprefab.data.height                              //字体行高
        this.conentJG = this.conentSpacing + this.labelHeight;
        this.textList =[];

        this.oldDragPos  =null;
        this.newDragPos =null;
    },

    start () {
        switch(this.itemtype){
            case Itemtype._hour:
                console.log("时间");
                this.init(24,24);
                break;
            case Itemtype._minute:
                console.log("分钟");
                this.init(60,60);
                break;
        }
        this.itemNum = this.content.childrenCount-1;                //子项数量
        this.conentLimit = 0;
        
        //this.content.setAnchorPoint(this.content.anchorX,this.conentLimit);
        this.node.on('scroll-began', this.onScrollBeganEvent, this);
        this.node.on('scroll-ended', this.onScrollEndedEvent, this);
        let _height = this.content.height/2-this.labelHeight/2;
        console.log("height: "+_height);
        for(let i =0;i<this.content.childrenCount;i++){
            if(i>0){
                _height -= this.conentJG;
            }
            this.textList.push(_height);
        }
    },
    closest(num) {
        var ret = this.textList[0];
        var distance = Math.abs(ret - num);
        for (var i = 1; i < this.textList.length; i++) {
            var newDistance = Math.abs(this.textList[i] - num);
            if (newDistance < distance) {
            distance = newDistance;
            ret = this.textList[i];
            }
        }
        return ret;
    },
    //滑动开始
    onScrollBeganEvent(event){
        this.oldDragPos = event.getContentPosition();
    },
    //滑动结束
    onScrollEndedEvent(event){
        this.newDragPos = event.getContentPosition();
        if (Math.abs(this.newDragPos.y - this.oldDragPos.y) >= this.conentJG) {
            if (this.newDragPos.y > this.oldDragPos.y) {
                this.content.setPosition(this.content.x,this.closest(this.content.y));
                this.oldDragPos.y += this.conentJG;
            }else{
                this.content.setPosition(this.content.x,this.closest(this.content.y));
                this.oldDragPos.y -= this.conentJG;
            }
            console.log("pos: "+this.content.position);
        }else{
            this.UpdateEx();
        }
    },
    //
    //itemnum:数量 max最大值
    init(itemnum,max){
        var go = null;
        this.content.height = itemnum*this.labelHeight+(max-1)*this.conentSpacing;
        this.contentHeight =this.content.height;
        // this.itemHeight_min = this.contentHeight /2 -20;            //子项最小发生改变位置
        // this.itemHeight_max = -this.contentHeight /2 +20;           //子项最大发生改变位置
        if(this.itemtype == Itemtype._hour){
            for(let i = max-itemnum+1;i<=max;i++){
                go = cc.instantiate(this.textprefab);
                go.name = i.toString();
                if(i<10){
                    go.getComponent(cc.Label).string = "0"+i.toString()+"时";
                }else{
                    go.getComponent(cc.Label).string = i.toString()+"时";
                }
                go.parent = this.content;
                //this.ShowItem(true);
            }
        }else{
            for(let i = max-itemnum;i<=max;i++){
                go = cc.instantiate(this.textprefab);
                go.name = i.toString();
                if(i<10){
                    go.getComponent(cc.Label).string = "0"+i.toString()+"分";
                }else{
                    go.getComponent(cc.Label).string = i.toString()+"分";
                }
                go.parent = this.content;
            }
        }
    },
    // 是增加或减少
    ShowItem(isIncreaseOrdecrease){
        if (isIncreaseOrdecrease) {
            for(let i=0;i<this.textList.length;i++){
                if (this.textList[i].y >= this.itemHeight_min){
                    console.log("+");
                    this.content.setSiblingIndex(this.itemNum);
                }
            }
            console.log(this.itemHeight_min);
        }else{
            for(let i=0;i<this.textList;i++){
                if (this.textList[i].y <= this.itemHeight_max){
                    console.log("-");
                    this.content.setSiblingIndex(0);
                }
            }
            console.log(this.itemHeight_max);
        }
    },
    //纠正位置
    UpdateEx(){
        if (this.content.y > this.conentLimit) {
            //this.ShowItem(true);
            this.content.setPosition(this.content.x,this.closest(this.content.y));
        }
        if (this.content.y < this.conentLimit) {
            //this.ShowItem(false);
            this.content.setPosition(this.content.x,this.closest(this.content.y));
        }
        console.log("pos: "+this.content.position);
    },
    // update (dt) {},
});
