class SceneLevels extends eui.Component{
	private btn_back:eui.Button;
	private group_levels:eui.Group;

	private img_arrow:eui.Image;
	private static _sceneLevel:SceneLevels;

	private sel_level:number;
	private levelIconArray:LevelIcon[] = [];
	public static getInstance(){
		if(SceneLevels._sceneLevel==null){
			SceneLevels._sceneLevel = new SceneLevels();
		}
		return SceneLevels._sceneLevel;
	}
	public constructor() {
		super();
		this.skinName = "resource/mySkins/SceneLevelSkin.exml";
		this.btn_back.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onclick_back,this);

		//这里要创建一个地图喽，纯代码的

		var row = 20;
		var col = 10;
		var spanx = 720/col;
		var spany = 1136/row;

		var group = new eui.Group();
		group.width = 720;
		group.height = (spany*400);
		//填充的背景，但是这里是  一个无缝拼接的地图
		for(var i = 0;i<(group.height/1138);i++){
			var img = new eui.Image();
			img.source = RES.getRes("GameBG2_jpg");
			img.y = i*1138;
			img.touchEnabled = false;
			this.group_levels.addChildAt(img,0);
		}

		//得到通关的最远距离。
		var milstone:number = LevelDataManager.getInstance().Milestone;

		for(var i =0;i<400;i++){
			var icon = new LevelIcon();
			icon.Level = i+1;
			icon.y = spany*i/2;
			icon.x =Math.cos(icon.y/180*Math.PI)*200+group.width/2;
			icon.y +=spany*i/2;

			icon.y = group.height - icon.y-50;
			group.addChild(icon);

			icon.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onclick_level,this);
			
			icon.enabled = i<milstone;
			this.levelIconArray.push(icon)
	}
		group.cacheAsBitmap = true;
		this.group_levels.addChild(group);
		this.group_levels.scrollV = group.height-1100;


		this.img_arrow = new eui.Image();
		this.img_arrow.texture = RES.getRes("PageDownBtn_png");
		this.img_arrow.anchorOffsetX = 124/2 - group.getChildAt(0).width/2;
		this.img_arrow.anchorOffsetY = 76;
		this.img_arrow.touchEnabled = false;
		this.img_arrow.x = group.getChildAt(0).x;
		this.img_arrow.y = group.getChildAt(0).y;
		this.sel_level = 1;
		group.addChild(this.img_arrow);
	}
	private onclick_back(){
		console.log("back ");
		this.parent.addChild(SceneBegin.getInstance());
		this.parent.removeChild(this);
	}
	private onclick_level(e:egret.TouchEvent){
		var icon:LevelIcon = e.currentTarget;
		SoundMenager.getInstance().playclick();
		if(this.sel_level!=icon.Level){
			this.img_arrow.x = icon.x;
			this.img_arrow.y = icon.y;
			this.sel_level = icon.Level;
		}else{
			console.log("进入游戏");
			this.parent.addChild(SceneGame.getInstance());
			SceneGame.getInstance().initLevel(icon.Level);
			this.parent.removeChild(this);
		}
	}
	public openLevel(level:number){
		let icon = this.levelIconArray[level-1];
		icon.enabled = true;
		if(level>LevelDataManager.getInstance().Milestone){
			LevelDataManager.getInstance().Milestone = level;
			this.img_arrow.x = icon.x;
			this.img_arrow.y = icon.y;
			this.sel_level = icon.Level;
		}
	}
}