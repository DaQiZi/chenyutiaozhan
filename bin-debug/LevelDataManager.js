var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var LevelDataItem = (function () {
    function LevelDataItem() {
    }
    return LevelDataItem;
}());
__reflect(LevelDataItem.prototype, "LevelDataItem");
var LevelDataManager = (function () {
    function LevelDataManager() {
        this.items = [];
        this.items = RES.getRes("questions_json");
    }
    LevelDataManager.getInstance = function () {
        if (LevelDataManager._levelDataManager == null) {
            LevelDataManager._levelDataManager = new LevelDataManager();
        }
        return LevelDataManager._levelDataManager;
    };
    LevelDataManager.prototype.getLevel = function (level) {
        if (level < 0) {
            level = 0;
        }
        if (level >= this.items.length) {
            level = this.items.length - 1;
        }
        return this.items[level];
    };
    Object.defineProperty(LevelDataManager.prototype, "Milestone", {
        //当前游戏的最远进度
        get: function () {
            var milestone = egret.localStorage.getItem("CYDTZ_Milestone");
            if (milestone == "" || milestone == null) {
                milestone = "1";
            }
            return parseInt(milestone);
        },
        set: function (value) {
            egret.localStorage.setItem("CYDTZ_Milestone", value.toString());
        },
        enumerable: true,
        configurable: true
    });
    return LevelDataManager;
}());
__reflect(LevelDataManager.prototype, "LevelDataManager");
//# sourceMappingURL=LevelDataManager.js.map