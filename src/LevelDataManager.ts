
class LevelDataItem{
	public answer:string;
	public img:string;
	public word:string;
	public tip:string;
	public content:string;
}
class LevelDataManager {
	private static _levelDataManager:LevelDataManager;
	private items:LevelDataItem[]=[];
	public static getInstance(){
		if(LevelDataManager._levelDataManager==null){
			LevelDataManager._levelDataManager = new LevelDataManager();
		}
		return LevelDataManager._levelDataManager;
	}
	public constructor() {
		this.items = RES.getRes("questions_json");
	}
	public getLevel(level:number):LevelDataItem{
		if(level<0){
			level = 0;
		}
		if(level>=this.items.length){
			level = this.items.length -1;
		}
		return this.items[level];
	}
	//当前游戏的最远进度
	public get Milestone():number{
		let milestone = egret.localStorage.getItem("CYDTZ_Milestone");
		if(milestone==""||milestone==null){
			milestone = "1";
		}
		return parseInt(milestone);
	}
	public set Milestone(value:number){
		egret.localStorage.setItem("CYDTZ_Milestone",value.toString())
	}
}