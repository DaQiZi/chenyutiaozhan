class LevelIcon extends eui.Button{
	private lb_level:eui.Label;
	public constructor() {
		super();
		this.skinName = "resource/mySkins/LevelIconSkin.exml";
		// this.lb_level = new eui.Label();
	}
	public get Level():number{
		return parseInt(this.lb_level.text);
	}
	public set Level(value:number){
		if(this.lb_level){
			// console.log("value = ",value.toString())
			this.lb_level.text = value.toString();
		}
	}
}