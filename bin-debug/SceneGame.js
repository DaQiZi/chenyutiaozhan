var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var SceneGame = (function (_super) {
    __extends(SceneGame, _super);
    function SceneGame() {
        var _this = _super.call(this) || this;
        _this.skinName = "resource/mySkins/SceneGameSkin.exml";
        _this.btn_back.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onclick_back, _this);
        _this.btn_next.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onclick_next, _this);
        return _this;
    }
    SceneGame.prototype.onclick_back = function () {
        SoundMenager.getInstance().playclick();
        this.parent.addChild(SceneLevels.getInstance());
        this.parent.removeChild(this);
    };
    SceneGame.getInstance = function () {
        if (SceneGame._sceneGame == null) {
            SceneGame._sceneGame = new SceneGame();
        }
        return SceneGame._sceneGame;
    };
    SceneGame.prototype.initLevel = function (level) {
        this.levelIndex = level;
        var leveldata = LevelDataManager.getInstance().getLevel(this.levelIndex);
        var words = leveldata.answer + leveldata.word;
        while (true) {
            var i = Math.floor(Math.random() * 400);
            if (i != level) {
                var temp = LevelDataManager.getInstance().getLevel(i);
                words += temp.word + temp.answer;
                break;
            }
        }
        //字段重排
        var wordlist = [];
        for (var i_1 = 0; i_1 < words.length; i_1++) {
            wordlist.push(words.charAt(i_1));
        }
        wordlist = this.getRandomWordList(wordlist);
        //给每一个提示方块赋值
        for (var i = 0; i < this.group_word.numChildren; i++) {
            var tempword = this.group_word.getChildAt(i);
            tempword.setWordText(wordlist[i]);
            tempword.visible = true;
        }
        //答案列表的状态重置，注意这的null啊。是之前自己设置的。
        for (var i = 0; i < this.group_anwer.numChildren; i++) {
            var answerrect = this.group_anwer.getChildAt(i);
            answerrect.setSelectWord(null);
            answerrect.visible = true;
            // answerrect.selectWord = null;
        }
        this.img_question.source = "resource/myResource/" + leveldata.img;
    };
    SceneGame.prototype.getRandomWordList = function (strArr) {
        var newstrArr = [];
        while (strArr.length > 0) {
            var i = Math.floor(Math.random() * strArr.length);
            newstrArr.push(strArr[i]);
            strArr.splice(i, 1);
        }
        return newstrArr;
    };
    SceneGame.prototype.onclick_word = function (word) {
        var sel = null;
        for (var i = 0; i < this.group_anwer.numChildren; i++) {
            var answer = this.group_anwer.getChildAt(i);
            if (answer.selectWord == null) {
                sel = answer;
                break;
            }
        }
        if (sel != null) {
            sel.setSelectWord(word);
            var check_str = "";
            for (var i = 0; i < this.group_anwer.numChildren; i++) {
                var answer_word = this.group_anwer.getChildAt(i);
                check_str += answer_word.getWordText();
            }
            if (check_str == LevelDataManager.getInstance().getLevel(this.levelIndex).answer) {
                console.log("游戏匹配成功");
                SoundMenager.getInstance().playRight();
                this.showWin();
            }
            else if (check_str.length == this.group_anwer.numChildren) {
                SoundMenager.getInstance().playWrong();
            }
        }
    };
    SceneGame.prototype.showWin = function () {
        this.group_win.visible = true;
        var leveldata = LevelDataManager.getInstance().getLevel(this.levelIndex);
        this.lb_from.text = leveldata.content;
        this.lb_explain.text = leveldata.tip;
    };
    SceneGame.prototype.onclick_next = function () {
        this.group_win.visible = false;
        SceneLevels.getInstance().openLevel(this.levelIndex + 1);
        this.initLevel(this.levelIndex + 1);
    };
    return SceneGame;
}(eui.Component));
__reflect(SceneGame.prototype, "SceneGame");
//# sourceMappingURL=SceneGame.js.map