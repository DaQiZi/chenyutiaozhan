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
var AnswerWord = (function (_super) {
    __extends(AnswerWord, _super);
    function AnswerWord() {
        var _this = _super.call(this) || this;
        _this.selectWord = null;
        return _this;
    }
    //点击到自身了，然后如果这个字有东西的话，那么就把这个字给取消了，选择框的字体显示出来。
    AnswerWord.prototype.onclick_top = function () {
        if (this.selectWord != null) {
            this.selectWord.visible = true;
            this.selectWord = null;
            this.setWordText("");
        }
        console.log("selecWord");
        SoundMenager.getInstance().playWord();
    };
    //这个是给外部的使用的。给答案字，设置对应的值。
    AnswerWord.prototype.setSelectWord = function (word) {
        if (word != null) {
            word.visible = false;
            this.setWordText(word.getWordText());
            this.selectWord = word;
        }
        else {
            this.setWordText("");
            this.selectWord = null;
        }
    };
    return AnswerWord;
}(Word));
__reflect(AnswerWord.prototype, "AnswerWord");
//# sourceMappingURL=AnswerWord.js.map