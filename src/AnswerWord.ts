class AnswerWord extends Word{
	public selectWord:Word;
	public constructor() {
		super();
		this.selectWord =null;
	}
	//点击到自身了，然后如果这个字有东西的话，那么就把这个字给取消了，选择框的字体显示出来。
	protected onclick_top(){
		if(this.selectWord!=null){
			this.selectWord.visible = true;
			this.selectWord = null;
			this.setWordText("");
		}
		console.log("selecWord");
		SoundMenager.getInstance().playWord();
	}
	//这个是给外部的使用的。给答案字，设置对应的值。
	public setSelectWord(word:Word){
		if(word!=null){
			word.visible = false;
			this.setWordText(word.getWordText());
			this.selectWord = word;
		}else{
			this.setWordText("");
			this.selectWord = null;
		}
		
	}
}