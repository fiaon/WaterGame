
const { ccclass, property } = cc._decorator;

@ccclass
export default class DrinkPlan extends cc.Component {

    @property(cc.ScrollView)
    drinkScrollView: cc.ScrollView = null;

    @property(cc.ScrollView)
    finishScrollView: cc.ScrollView = null;

    @property(cc.Prefab)
    drinkPlanItem: cc.Prefab = null;

    @property(cc.Prefab)
    finishPlanItem: cc.Prefab = null;

    @property(cc.Prefab)
    finishPlanItem_hui: cc.Prefab = null;

    @property(cc.Button)
    btnAdd: cc.Button = null;

    @property(cc.Button)
    btnReport: cc.Button = null;

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start() {
        Global.isopencount =0;
        this.initUI();
    }

    // update (dt) {}
    /**
     * 初始化界面UI
     */
    initUI(){
        this.btnAdd.node.active = true;
        this.btnReport.node.active = false;
        this.drinkScrollView.node.active = true;
        this.finishScrollView.node.active = false;
        //测试
        Global.ShuiDiPlaneList((res)=>{
            if(res.state == 1){
                for(let i=0;i<res.result.length;i++){
                    let plan = cc.instantiate(this.drinkPlanItem);
                    plan.getComponent("DrinkPlanItem").init(i,res.result[i]);
                    this.drinkScrollView.content.addChild(plan);
                    if(res.result[i].isopen){
                        Global.isopencount++;
                    }
                }
            }
        });
        // if (this.drinkScrollView.content.childrenCount >= 8) return;
        // for (let i = 0; i < 8; i++) {
        //     let plan = cc.instantiate(this.drinkPlanItem);
        //     this.drinkScrollView.content.addChild(plan);
        // }
    }
    /**
     * 返回
     */
    onClickBack() {
        console.log('返回大厅');
        cc.director.loadScene('start');
    }
    /**
     * 
     * @param toggle 点击的toggle对象 
     */
    onClickToggle(toggle: cc.Toggle) {
        // console.log('====>',toggle,toggle.isChecked,toggle.name,toggle.node.name);
        if (toggle.isChecked && toggle.node.name == 'toggle_plan') {
            console.log('饮水计划');
            this.btnAdd.node.active = this.drinkScrollView.node.active = true;
            this.btnReport.node.active = this.finishScrollView.node.active = false;
            //测试
            // if (this.drinkScrollView.content.childrenCount >= 8) return;
            // for (let i = 0; i < 8; i++) {
            //     let plan = cc.instantiate(this.drinkPlanItem);
            //     this.drinkScrollView.content.addChild(plan);
            // }
        } else if (toggle.isChecked && toggle.node.name == 'toggle_list') {
            console.log('守约清单');
            this.finishScrollView.content.removeAllChildren();
            Global.ShuiDiPlaneLog((res)=>{
                if(res.state == 1){
                    for(let i=0;i<res.result.length;i++){
                        let plan =null;
                        if(res.result[i].IsFinish){
                            plan = cc.instantiate(this.finishPlanItem);
                            plan.getComponent("FinishPlanItem").init(i,res.result[i]);
                        }else{
                            plan = cc.instantiate(this.finishPlanItem_hui);
                            plan.getComponent("FinishPlanItem").init(i,res.result[i]);
                        }
                        this.finishScrollView.content.addChild(plan);
                    }
                }
            })
            this.btnAdd.node.active = this.drinkScrollView.node.active = false;
            this.btnReport.node.active = this.finishScrollView.node.active = true;
            // //测试
            // if (this.finishScrollView.content.childrenCount >= 8) return;
            // for (let i = 0; i < 8; i++) {
            //     let plan = cc.instantiate(this.finishPlanItem);
            //     this.finishScrollView.content.addChild(plan);
            // }
        }
    }
    /**
     * 添加提醒
     */
    onClickAddRemind() {
        console.log('添加提醒');
    }
    /**
     * 分享
     */
    onClickShare() {
        console.log('分享');
    }

    /**
     * 生成报告单
     */
    onCreateReport(){
        console.log('生成报告单');
    }
}
