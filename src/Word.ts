class Word extends eui.Component{
	protected lb_text:eui.Label;
	public constructor() {
		super();
		this.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onclick_top,this);
	}
	protected onclick_top(){
		console.log(this.lb_text.text);
		SceneGame.getInstance().onclick_word(this);
		SoundMenager.getInstance().playWord();
	}
	public setWordText(value:string){
		this.lb_text.text = value;
	}
	public getWordText():string{
		return this.lb_text.text;
	}
}