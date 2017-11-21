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
var SceneLevels = (function (_super) {
    __extends(SceneLevels, _super);
    function SceneLevels() {
        var _this = _super.call(this) || this;
        _this.levelIconArray = [];
        _this.skinName = "resource/mySkins/SceneLevelSkin.exml";
        _this.btn_back.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onclick_back, _this);
        //这里要创建一个地图喽，纯代码的
        var row = 20;
        var col = 10;
        var spanx = 720 / col;
        var spany = 1136 / row;
        var group = new eui.Group();
        group.width = 720;
        group.height = (spany * 400);
        //填充的背景，但是这里是  一个无缝拼接的地图
        for (var i = 0; i < (group.height / 1138); i++) {
            var img = new eui.Image();
            img.source = RES.getRes("GameBG2_jpg");
            img.y = i * 1138;
            img.touchEnabled = false;
            _this.group_levels.addChildAt(img, 0);
        }
        //得到通关的最远距离。
        var milstone = LevelDataManager.getInstance().Milestone;
        for (var i = 0; i < 400; i++) {
            var icon = new LevelIcon();
            icon.Level = i + 1;
            icon.y = spany * i / 2;
            icon.x = Math.cos(icon.y / 180 * Math.PI) * 200 + group.width / 2;
            icon.y += spany * i / 2;
            icon.y = group.height - icon.y - 50;
            group.addChild(icon);
            icon.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onclick_level, _this);
            icon.enabled = i < milstone;
            _this.levelIconArray.push(icon);
        }
        group.cacheAsBitmap = true;
        _this.group_levels.addChild(group);
        _this.group_levels.scrollV = group.height - 1100;
        _this.img_arrow = new eui.Image();
        _this.img_arrow.texture = RES.getRes("PageDownBtn_png");
        _this.img_arrow.anchorOffsetX = 124 / 2 - group.getChildAt(0).width / 2;
        _this.img_arrow.anchorOffsetY = 76;
        _this.img_arrow.touchEnabled = false;
        _this.img_arrow.x = group.getChildAt(0).x;
        _this.img_arrow.y = group.getChildAt(0).y;
        _this.sel_level = 1;
        group.addChild(_this.img_arrow);
        return _this;
    }
    SceneLevels.getInstance = function () {
        if (SceneLevels._sceneLevel == null) {
            SceneLevels._sceneLevel = new SceneLevels();
        }
        return SceneLevels._sceneLevel;
    };
    SceneLevels.prototype.onclick_back = function () {
        console.log("back ");
        this.parent.addChild(SceneBegin.getInstance());
        this.parent.removeChild(this);
    };
    SceneLevels.prototype.onclick_level = function (e) {
        var icon = e.currentTarget;
        SoundMenager.getInstance().playclick();
        if (this.sel_level != icon.Level) {
            this.img_arrow.x = icon.x;
            this.img_arrow.y = icon.y;
            this.sel_level = icon.Level;
        }
        else {
            console.log("进入游戏");
            this.parent.addChild(SceneGame.getInstance());
            SceneGame.getInstance().initLevel(icon.Level);
            this.parent.removeChild(this);
        }
    };
    SceneLevels.prototype.openLevel = function (level) {
        var icon = this.levelIconArray[level - 1];
        icon.enabled = true;
        if (level > LevelDataManager.getInstance().Milestone) {
            LevelDataManager.getInstance().Milestone = level;
            this.img_arrow.x = icon.x;
            this.img_arrow.y = icon.y;
            this.sel_level = icon.Level;
        }
    };
    return SceneLevels;
}(eui.Component));
__reflect(SceneLevels.prototype, "SceneLevels");
//# sourceMappingURL=SceneLevels.js.map