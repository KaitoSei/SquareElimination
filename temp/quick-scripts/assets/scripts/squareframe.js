(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/squareframe.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '725feHcFZtKwqpGdIs0gCJG', 'squareframe', __filename);
// scripts/squareframe.js

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

var disList = [[0, 1, 2, 3, 4, 5, 6, 7], [8, 9, 10, 11, 12, 13, 14, 15], [16, 17, 18, 19, 20, 21, 22, 23], [24, 25, 26, 27, 28, 29, 30, 31], [32, 33, 34, 35, 36, 37, 38, 39], [40, 41, 42, 43, 44, 45, 46, 47], [48, 49, 50, 51, 52, 53, 54, 55], [56, 57, 58, 59, 60, 61, 62, 63], [0, 8, 16, 24, 32, 40, 48, 56], [1, 9, 17, 25, 33, 41, 49, 57], [2, 10, 18, 26, 34, 42, 50, 58], [3, 11, 19, 27, 35, 43, 51, 59], [4, 12, 20, 27, 36, 44, 52, 60], [5, 13, 21, 29, 37, 45, 53, 61], [6, 14, 22, 30, 38, 46, 54, 62], [7, 15, 23, 31, 39, 47, 55, 63]];

var theScore = 0;
var hScore = 0;

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
        sideNum: 8,
        sideLength: 0,
        framePic: {
            default: null,
            type: cc.SpriteFrame
        },
        failPrefab: {
            default: null,
            type: cc.Prefab
        }
    },

    // 消除
    checkElimination: function checkElimination(argument) {
        this.addScore(this.curFKLen, true);

        var haveSquareIndexList = [];
        for (var i = 0; i < this.frameList.length; i++) {
            if (this.frameList[i].isHaveFK) {
                haveSquareIndexList.push(this.frameList[i].SquareIndex);
            }
        }

        haveSquareIndexList.sort(function (a, b) {
            return a - b;
        });
        var eliminationList = []; //要消除的方块列表
        for (var i = 0; i < disList.length; i++) {
            var oneXCList = disList[i];
            var intersectAry = this.get2AryIntersect(haveSquareIndexList, oneXCList);

            if (intersectAry.length > 0) {
                //cc.log("intersectAry:", intersectAry.toString())
                //cc.log("oneXCList:", oneXCList.toString())

                var isXC = this.check2AryIsEqual(oneXCList, intersectAry);

                //cc.log("intersectAry 和 oneXCList是否相等：", isXC)
                if (isXC) {
                    eliminationList.push(oneXCList);
                }
            }
        }

        var actionAry = [];
        var self = this;
        //消除
        var count = 0;
        for (var i = 0; i < eliminationList.length; i++) {

            var oneList = eliminationList[i];
            for (var j = 0; j < oneList.length; j++) {
                var xIndex = oneList[j];

                actionAry.push(cc.callFunc(function () {
                    var xIndex = arguments[1];
                    this.frameList[xIndex].isHaveFK = null;

                    var FKNode = this.frameList[xIndex].getChildByName("colorSpr");
                    if (!FKNode) {
                        return;
                    }

                    FKNode.runAction(cc.sequence(cc.spawn(cc.scaleTo(0.5, 2), cc.fadeOut(0.5)), cc.removeSelf(true)));
                }, this, xIndex));

                actionAry.push(cc.delayTime(0.05));

                count++;
            }
        }

        if (actionAry.length > 0) {
            actionAry.push(cc.callFunc(function () {
                this.isDeleting = false;
                this.checkIsLose();
            }, this));

            this.isDeleting = true;
            var action = cc.sequence(actionAry);
            this.node.runAction(action);

            this.addScore(count);
        }
    },

    //检测是不是输了
    checkIsLose: function checkIsLose() {
        //如果正在消除中，那就不判断输赢，因为消除后会再判断
        if (this.isDeleting) return;

        var count = 0;
        for (var i = 0; i < 3; i++) {
            var node = cc.find('Canvas/get_square_' + (i + 1));
            var script = node.getComponent('square');
            if (script.checkIsLose()) {

                //cc.log("方块" + (i + 1) + "已经无处安放")
                count++;
                node.opacity = 125;
            } else {

                //cc.log("方块" + (i + 1) + "可以安放")
                node.opacity = 255;
            }
        }

        if (count == 3) {
            var failNode = cc.instantiate(this.failPrefab);
            this.node.parent.addChild(failNode);

            var oldScore = 0;
            FBInstant.player.getDataAsync(['hScore']).then(function (data) {
                oldScore = data['hScore'];
                if (oldScore < theScore) {
                    FBInstant.player.setDataAsync({ hScore: theScore }).then(FBInstant.getLeaderboardAsync('eliminateRank').then(function (leaderboard) {
                        return leaderboard.setScoreAsync(theScore);
                    }).then(function () {
                        return console.log('Score saved');
                    }).catch(function (error) {
                        return console.error(error);
                    }));
                }
            });
        }
    },

    //加分，参数是消除的总数,isDropAdd是是否是放下的单纯加分
    addScore: function addScore(XCCount, isDropAdd) {
        var addScoreCount = this.getAddScoreCal(XCCount, isDropAdd);
        var node = cc.find('Canvas/scores/score/scoreLabel');
        var label = node.getComponent(cc.Label);

        label.string = addScoreCount + Number(label.string);
        theScore = Number(label.string);
    },

    //计算加分的公式
    getAddScoreCal: function getAddScoreCal(XCCount, isDropAdd) {
        var x = XCCount + 1;
        var addScoreCount = isDropAdd ? x : 2 * x; //数量的平方
        return addScoreCount;
    },

    // 获得两个数组的交集
    get2AryIntersect: function get2AryIntersect(ary1, ary2) {
        var intersectAry = [];
        for (var i = 0; i < ary1.length; i++) {
            for (var j = 0; j < ary2.length; j++) {
                // cc.log(ary1[i] + " " + ary2[j]);
                if (ary2[j] == ary1[i]) {
                    intersectAry.push(ary2[j]);
                }
            }
        }

        return intersectAry;
    },

    // 检查两数组是否相同
    check2AryIsEqual: function check2AryIsEqual(ary1, ary2) {
        for (var i = 0; i < ary1.length; i++) {
            if (ary2[i] != ary1[i]) {
                return false;
            }
        }

        return true;
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function onLoad() {
        cc.view.enableRetina(true);
        cc.view.resizeWithBrowserSize(true);

        var srcPos = cc.v2(this.node.x, this.node.y);
        var frameList = [];
        var fPosList = [];
        var oVec = cc.v2(-(this.sideLength * 7) / 2, this.sideLength * 7 / 2);
        var zeroPos = srcPos.add(oVec);

        //生成位置列表
        for (var i = 0; i < this.sideNum; i++) {
            for (var j = 0; j < this.sideNum; j++) {
                var fPos = zeroPos.add(cc.v2(i * this.sideLength, -(j * this.sideLength)));
                fPosList.push(fPos);
            }
        }

        //初始化框架
        for (var _i = 0; _i < fPosList.length; _i++) {
            var node = new cc.Node("frame");
            var sprite = node.addComponent(cc.Sprite);
            sprite.spriteFrame = this.framePic;
            sprite.sizeMode = cc.Sprite.SizeMode.CUSTOM;

            node.width = this.sideLength;
            node.height = this.sideLength;

            node.x = fPosList[_i].x;
            node.y = fPosList[_i].y;

            node.parent = this.node;

            node.SquareIndex = _i;

            frameList.push(node);
        }

        this.frameList = frameList;
        this.fPosList = fPosList;
        this.isDeleting = false; //判断是否正在消除的依据

        //监听成功放下事件
        this.node.on('succDropDownOne', this.checkElimination, this);
        //初始化历史最高分
        FBInstant.player.getDataAsync(['hScore']).then(function (data) {
            hScore = data['hScore'];
            var node = cc.find('Canvas/scores/highScore/scoreLabel');
            var label = node.getComponent(cc.Label);
            if (hScore > 0) {
                label.string = hScore;
            }
        });
    }

    // start () {

    // },

    // update (dt) {},
});

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
        //# sourceMappingURL=squareframe.js.map
        