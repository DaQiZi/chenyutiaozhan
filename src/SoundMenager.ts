class SoundMenager {
	private static _soundMenager:SoundMenager;

	private _click:egret.Sound;
	private _word:egret.Sound;
	private _right:egret.Sound;
	private _wrong:egret.Sound;
	private _bgm:egret.Sound;
	private _bgm_channel:egret.SoundChannel;
	// public isMusic:boolean;
	// public isSound:boolean;
	public static getInstance(){
		if(SoundMenager._soundMenager==null){
			SoundMenager._soundMenager = new SoundMenager();
		}
		return SoundMenager._soundMenager;
	}
	public constructor() {
		this._click = RES.getRes("buttonclick_mp3");
		this._word = RES.getRes("type_word_mp3");
		this._right = RES.getRes("right_mp3");
		this._wrong = RES.getRes("wrong_mp3");
		this._bgm = RES.getRes("Music_mp3");

	}
	public playBGM(){
		if(this.IsMusic){
			this._bgm_channel =  this._bgm.play(0,0);
		}
	}
	public stopBGM(){
		if(this._bgm_channel!=null){
			this._bgm_channel.stop();
		}
	}
	public playclick(){
		if(this.IsSound){
			this._click.play(0,1);
		}
	}
	public playRight(){
		if(this.IsSound){
			this._right.play(0,1);
		}
	}
	public playWrong(){
		if(this.IsSound){
			this._wrong.play(0,1);
		}
	}
	public playWord(){
		if(this.IsSound){
			this._word.play(0,1);
		}
	}

	public set IsMusic(value:boolean){
		if(!value){
			egret.localStorage.setItem("ismusic","0");
			this.stopBGM();
		}else {
			egret.localStorage.setItem("ismusic","1");
			this.playBGM();
		}
	}

	public get IsMusic():boolean{
		var flag = egret.localStorage.getItem("ismusic");
		if(flag==null||flag==""){
			return true;
		}else{
			return false;
		}
	}
	public set IsSound(value:boolean){
		if(value){
			egret.localStorage.setItem("issound","1");
		}else{
			egret.localStorage.setItem("issound","0");
		}
	}

	public get IsSound():boolean{
		var flag = egret.localStorage.getItem("issound");
		if(flag==null||flag==""){
			return false;
		}else{
			return true;
		}
	}
}