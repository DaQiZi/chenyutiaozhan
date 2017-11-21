class SceneGame extends eui.Component{
	private static _sceneGame:SceneGame;
	private btn_back:eui.Button;
	private group_word:eui.Group;
	private group_anwer:eui.Group;
	private img_question:eui.Image;
	private levelIndex:number;

	//游戏胜利界面需要皮肤部件
	private group_win:eui.Group;
	private lb_from:eui.Label;
	private lb_explain:eui.Label;
	private btn_next:eui.Button;
	public constructor() {
		super();
		this.skinName = "resource/mySkins/SceneGameSkin.exml";
		this.btn_back.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onclick_back,this);
		this.btn_next.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onclick_next,this);
}
	private onclick_back(){
		SoundMenager.getInstance().playclick();
		this.parent.addChild(SceneLevels.getInstance());
		this.parent.removeChild(this);
	}
	public static getInstance(){
		if(SceneGame._sceneGame ==null){
			SceneGame._sceneGame = new SceneGame();
		}
		return SceneGame._sceneGame;
	}
	public initLevel(level:number){
		this.levelIndex = level;
		let leveldata = LevelDataManager.getInstance().getLevel(this.levelIndex);
		var words = leveldata.answer+leveldata.word;
		while(true){
			var i  = Math.floor(Math.random()*400);
			if(i!=level){
				var temp = LevelDataManager.getInstance().getLevel(i);
				words+=temp.word+temp.answer;
				break;
			}
		}
		//字段重排
		var wordlist:string[]=[];
		for(let i  =0;i<words.length;i++){
			wordlist.push(words.charAt(i));
		}
		wordlist = this.getRandomWordList(wordlist);
		//给每一个提示方块赋值
		for(var i = 0;i<this.group_word.numChildren;i++){
			var tempword = <Word>this.group_word.getChildAt(i);
			tempword.setWordText(wordlist[i]);
			tempword.visible = true;
		}
		//答案列表的状态重置，注意这的null啊。是之前自己设置的。
		for(var i = 0;i<this.group_anwer.numChildren;i++){
			var answerrect = <AnswerWord>this.group_anwer.getChildAt(i);
			answerrect.setSelectWord(null);
			answerrect.visible = true;
			// answerrect.selectWord = null;
		}
		this.img_question.source = "resource/myResource/"+leveldata.img;
	}
	private getRandomWordList(strArr:string[]):string[]{
		var newstrArr:string[] = [];
		while(strArr.length>0){
			var i = Math.floor(Math.random()*strArr.length);
			newstrArr.push(strArr[i]);
			strArr.splice(i,1);
		}
		return newstrArr;
	}

	public onclick_word(word:Word){
		var sel:AnswerWord = null;
		for(var i = 0;i<this.group_anwer.numChildren;i++){
			var answer = <AnswerWord>this.group_anwer.getChildAt(i);
			if(answer.selectWord==null){
				sel = answer;
				break;
			}
		}
		if(sel!=null){
			sel.setSelectWord(word);
			var check_str:string = "";
			for(var i   = 0;i<this.group_anwer.numChildren;i++){
				var answer_word = <AnswerWord>this.group_anwer.getChildAt(i);
				check_str+=answer_word.getWordText();
			}
			if(check_str==LevelDataManager.getInstance().getLevel(this.levelIndex).answer){
				console.log("游戏匹配成功");
				SoundMenager.getInstance().playRight();
				
				this.showWin();
			}else if(check_str.length==this.group_anwer.numChildren){
				SoundMenager.getInstance().playWrong();
			}
		}

		
	}
	private showWin(){
		this.group_win.visible = true;
		var leveldata = LevelDataManager.getInstance().getLevel(this.levelIndex);
		this.lb_from.text = leveldata.content;
		this.lb_explain.text = leveldata.tip;
	}
	private onclick_next(){
		this.group_win.visible = false;
		SceneLevels.getInstance().openLevel(this.levelIndex+1);
		this.initLevel(this.levelIndex+1);
	}
}