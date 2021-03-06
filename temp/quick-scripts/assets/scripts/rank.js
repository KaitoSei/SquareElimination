(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/rank.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '4b955qwxjhDtLc8MEKgbS7S', 'rank', __filename);
// scripts/rank.js

'use strict';

// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function onLoad() {
        var _this = this;

        FBInstant.getLeaderboardAsync('eliminateRank').then(function (leaderboard) {
            return leaderboard.getConnectedPlayerEntriesAsync(5, 0);
        }).then(function (entries) {
            for (var i = 0; i < entries.length; i++) {
                var rnode = _this.node.getChildByName('RankBG_' + (i + 1));
                var ranknode = rnode.getChildByName('rankLabel');
                var namenode = rnode.getChildByName('nameLabel');
                var scorenode = rnode.getChildByName('scoreLabel');
                var ranklabel = ranknode.getComponent(cc.Label);
                var namelabel = namenode.getComponent(cc.Label);
                var scorelabel = scorenode.getComponent(cc.Label);
                ranklabel.string = entries[i].getRank();
                namelabel.string = entries[i].getPlayer().getName();
                scorelabel.string = entries[i].getScore();
            }
        }).catch(function (error) {
            return console.error(error);
        });
    },
    start: function start() {}
}

// update (dt) {},
);

cc._RF.pop();
        }
        if (CC_EDITOR) {
            __define(__module.exports, __require, __module);
        }
        else {
            cc.registerModuleFunc(__filename, function () {
                __define(__module.exports, __require, __module);
            });
        }
        })();
        //# sourceMappingURL=rank.js.map
        