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
var SceneBegin = (function (_super) {
    __extends(SceneBegin, _super);
    function SceneBegin() {
        var _this = _super.call(this) || this;
        _this.skinName = "resource/mySkins/SceneBeginSkin.exml";
        _this.btn_begin.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onclick_begin, _this);
        return _this;
    }
    SceneBegin.getInstance = function () {
        if (SceneBegin._sceneBegin == null) {
            SceneBegin._sceneBegin = new SceneBegin();
        }
        return SceneBegin._sceneBegin;
    };
    SceneBegin.prototype.onclick_begin = function () {
        console.log("game begin ");
        SoundMenager.getInstance().playclick();
        this.parent.addChild(SceneLevels.getInstance());
        this.parent.removeChild(this);
    };
    return SceneBegin;
}(eui.Component));
__reflect(SceneBegin.prototype, "SceneBegin");
//# sourceMappingURL=SceneBegin.js.map