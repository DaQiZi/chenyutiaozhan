var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var SoundMenager = (function () {
    function SoundMenager() {
        this._click = RES.getRes("buttonclick_mp3");
        this._word = RES.getRes("type_word_mp3");
        this._right = RES.getRes("right_mp3");
        this._wrong = RES.getRes("wrong_mp3");
        this._bgm = RES.getRes("Music_mp3");
    }
    // public isMusic:boolean;
    // public isSound:boolean;
    SoundMenager.getInstance = function () {
        if (SoundMenager._soundMenager == null) {
            SoundMenager._soundMenager = new SoundMenager();
        }
        return SoundMenager._soundMenager;
    };
    SoundMenager.prototype.playBGM = function () {
        if (this.IsMusic) {
            this._bgm_channel = this._bgm.play(0, 0);
        }
    };
    SoundMenager.prototype.stopBGM = function () {
        if (this._bgm_channel != null) {
            this._bgm_channel.stop();
        }
    };
    SoundMenager.prototype.playclick = function () {
        if (this.IsSound) {
            this._click.play(0, 1);
        }
    };
    SoundMenager.prototype.playRight = function () {
        if (this.IsSound) {
            this._right.play(0, 1);
        }
    };
    SoundMenager.prototype.playWrong = function () {
        if (this.IsSound) {
            this._wrong.play(0, 1);
        }
    };
    SoundMenager.prototype.playWord = function () {
        if (this.IsSound) {
            this._word.play(0, 1);
        }
    };
    Object.defineProperty(SoundMenager.prototype, "IsMusic", {
        get: function () {
            var flag = egret.localStorage.getItem("ismusic");
            if (flag == null || flag == "") {
                return true;
            }
            else {
                return false;
            }
        },
        set: function (value) {
            if (!value) {
                egret.localStorage.setItem("ismusic", "0");
                this.stopBGM();
            }
            else {
                egret.localStorage.setItem("ismusic", "1");
                this.playBGM();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SoundMenager.prototype, "IsSound", {
        get: function () {
            var flag = egret.localStorage.getItem("issound");
            if (flag == null || flag == "") {
                return false;
            }
            else {
                return true;
            }
        },
        set: function (value) {
            if (value) {
                egret.localStorage.setItem("issound", "1");
            }
            else {
                egret.localStorage.setItem("issound", "0");
            }
        },
        enumerable: true,
        configurable: true
    });
    return SoundMenager;
}());
__reflect(SoundMenager.prototype, "SoundMenager");
//# sourceMappingURL=SoundMenager.js.map