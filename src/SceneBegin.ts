class SceneBegin extends eui.Component{
	public btn_begin:eui.Button;
	private static _sceneBegin:SceneBegin;
	public static getInstance(){
		if(SceneBegin._sceneBegin==null){
			SceneBegin._sceneBegin = new SceneBegin();
		}
		return SceneBegin._sceneBegin;
	}
	public constructor() {
		super();
		this.skinName = "resource/mySkins/SceneBeginSkin.exml"
		this.btn_begin.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onclick_begin,this);
	}
	private onclick_begin():void{
		console.log("game begin ");
		SoundMenager.getInstance().playclick();
		this.parent.addChild(SceneLevels.getInstance());
		this.parent.removeChild(this);
	}
}