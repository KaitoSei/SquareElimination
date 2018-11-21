"use strict";
cc._RF.push(module, 'a87c8hi7gJCY68LOGmf83ic', 'square');
// scripts/square.js

"use strict";

var _properties;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html
var SquareFrame = require('squareframe');
var scaleParam = 0.5;

cc.Class({
    extends: cc.Component,

    properties: (_properties = {
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
        checkerboard: {
            default: null,
            type: SquareFrame
        },
        sideLength: 0
    }, _defineProperty(_properties, "color1", {
        default: null,
        type: cc.SpriteFrame
    }), _defineProperty(_properties, "color2", {
        default: null,
        type: cc.SpriteFrame
    }), _defineProperty(_properties, "color3", {
        default: null,
        type: cc.SpriteFrame
    }), _defineProperty(_properties, "color4", {
        default: null,
        type: cc.SpriteFrame
    }), _defineProperty(_properties, "color5", {
        default: null,
        type: cc.SpriteFrame
    }), _defineProperty(_properties, "color6", {
        default: null,
        type: cc.SpriteFrame
    }), _defineProperty(_properties, "color7", {
        default: null,
        type: cc.SpriteFrame
    }), _properties),

    getTheConfig: function getTheConfig() {

        var a = this.sideLength;

        var configLists = [
        //一个
        [cc.v2(0, 0)],
        //两个
        [cc.v2(0, 0), cc.v2(a, 0)], //横摆
        [cc.v2(0, 0), cc.v2(0, a)], //竖摆
        //三个
        [cc.v2(0, 0), cc.v2(a, 0), cc.v2(a * 2, 0)], //横摆
        [cc.v2(0, 0), cc.v2(0, a), cc.v2(0, a * 2)], //竖摆

        [cc.v2(0, 0), cc.v2(a, 0), cc.v2(a, a)], //堆1
        [cc.v2(0, 0), cc.v2(a, 0), cc.v2(0, a)], //堆2
        [cc.v2(0, 0), cc.v2(0, a), cc.v2(a, a)], //堆3
        [cc.v2(0, a), cc.v2(a, 0), cc.v2(a, a)], //堆4
        //四个
        [cc.v2(0, 0), cc.v2(a, 0), cc.v2(a * 2, 0), cc.v2(a * 3, 0)], //横摆
        [cc.v2(0, 0), cc.v2(0, a), cc.v2(0, a * 2), cc.v2(0, a * 3)], //竖摆

        [cc.v2(0, 0), cc.v2(a, 0), cc.v2(a * 2, 0), cc.v2(a * 2, a)], //横堆1
        [cc.v2(0, 0), cc.v2(a, 0), cc.v2(a * 2, 0), cc.v2(0, a)], //横堆2
        [cc.v2(0, 0), cc.v2(a, 0), cc.v2(a * 2, 0), cc.v2(a * 2, -a)], //横堆3
        [cc.v2(0, 0), cc.v2(a, 0), cc.v2(a * 2, 0), cc.v2(0, -a)], //横堆4

        [cc.v2(0, 0), cc.v2(0, a), cc.v2(0, a * 2), cc.v2(a, a * 2)], //竖堆1
        [cc.v2(0, 0), cc.v2(0, a), cc.v2(0, a * 2), cc.v2(a, 0)], //竖堆2
        [cc.v2(0, 0), cc.v2(0, a), cc.v2(0, a * 2), cc.v2(-a, a * 2)], //竖堆3
        [cc.v2(0, 0), cc.v2(0, a), cc.v2(0, a * 2), cc.v2(-a, 0)], //竖堆4

        [cc.v2(0, 0), cc.v2(a, 0), cc.v2(a, a), cc.v2(0, a)]];

        return configLists;
    },

    newOneK: function newOneK(colorIndex) {
        //创建一个块
        var node = new cc.Node("colorSpr");
        var sprite = node.addComponent(cc.Sprite);
        sprite.spriteFrame = this["color" + colorIndex];
        sprite.sizeMode = cc.Sprite.SizeMode.CUSTOM;

        node.width = this.sideLength;
        node.height = this.sideLength;

        return node;
    },

    newOneNode: function newOneNode() {
        var squareNode = new cc.Node("square");

        var config = this.getTheConfig();
        //随机样子
        var randomIndex = Math.floor(Math.random() * config.length);
        var posList = config[randomIndex];

        var randomIndex = Math.floor(Math.random() * 6 + 1);
        var sumX = 0;
        var countX = 0;
        var sumY = 0;
        var countY = 0;
        for (var index = 0; index < posList.length; index++) {
            var pos = posList[index];
            var square = this.newOneK(randomIndex);
            square.x = pos.x;

            sumX += square.x;
            countX++;

            square.y = pos.y;

            sumY += square.y;
            countY++;

            squareNode.addChild(square);
        }

        squareNode.x = -sumX / countX * scaleParam;
        squareNode.y = -sumY / countY * scaleParam;

        squareNode.setScale(scaleParam);

        return squareNode;
    },

    addTouchEvent: function addTouchEvent() {
        var upH = 100;
        var self = this;

        this.node.ox = this.node.x;
        this.node.oy = this.node.y;

        this.node.on(cc.Node.EventType.TOUCH_START, function () {
            this.y += upH;

            this.getChildByName("square").setScale(1);

            cc.find('Canvas/pause').emit('touchOne');
        }, this.node);
        this.node.on(cc.Node.EventType.TOUCH_MOVE, function (event) {

            var delta = event.touch.getDelta();
            this.x += delta.x;
            this.y += delta.y;

            self.collisionFunc();

            // 变色处理
            if (!self.checkIsCanDrop()) {
                self.changeColorDeal(true);
            } else {
                self.changeColorDeal();
            }
        }, this.node);

        this.node.on(cc.Node.EventType.TOUCH_CANCEL, function (event) {
            this.dropDownFunc();
        }, this);
        this.node.on(cc.Node.EventType.TOUCH_END, function (event) {
            this.dropDownFunc();
        }, this);
    },

    //变色处理
    changeColorDeal: function changeColorDeal(isJustClearColor) {
        for (var i = 0; i < this.checkerboard.frameList.length; i++) {
            var PicNode = this.checkerboard.frameList[i];
            var sprite = PicNode.getComponent(cc.Sprite);
            sprite.spriteFrame = this.checkerboard.framePic;
            PicNode.opacity = 255;
        }

        //直接返回
        if (isJustClearColor) {
            return;
        }

        for (var i = 0; i < this.checkFrameList.length; i++) {
            var PicNode = this.checkFrameList[i];
            var sprite = PicNode.getComponent(cc.Sprite);
            var FKsprite = this.checkFKlist[0].getComponent(cc.Sprite);
            sprite.spriteFrame = FKsprite.spriteFrame;
            PicNode.opacity = 127;
        }
    },

    //碰撞逻辑
    collisionFunc: function collisionFunc() {
        this.checkFrameList = []; //清空数组
        this.checkFKlist = []; //清空数组

        var children = this.node.children[0].children;

        for (var i = 0; i < children.length; i++) {

            var pianyiCPos = cc.v2(this.node.children[0].x, this.node.children[0].y).add(cc.v2(children[i].x, children[i].y));
            var childPos = this.node.position.add(pianyiCPos);
            var frame = this.checkPosFunc(childPos);

            if (frame) {
                this.checkFKlist.push(children[i]);
                this.checkFrameList.push(frame);
            }
        }
    },

    //一个色块和所有框检测
    checkPosFunc: function checkPosFunc(pos) {
        var len = this.sideLength / 2; //碰撞距离

        for (var i = 0; i < this.checkerboard.frameList.length; i++) {
            var frameNode = this.checkerboard.frameList[i];
            var dis = cc.v2(frameNode.x, frameNode.y).sub(pos).mag();
            if (dis <= len) {
                return frameNode;
            }
        }
    },

    //检测自身是否已经无处可放
    checkIsLose: function checkIsLose() {
        var canDropCount = 0;

        var children = this.node.children[0].children;

        //一个个格子放试一下能不能放
        for (var i = 0; i < this.checkerboard.frameList.length; i++) {
            var frameNode = this.checkerboard.frameList[i];
            var srcPos = cc.v2(frameNode.x, frameNode.y);

            var count = 1;
            if (!frameNode.isHaveFK) {

                for (var j = 1; j < children.length; j++) {
                    var len = this.sideLength / 2; //碰撞距离
                    var childPos = srcPos.add(cc.v2(children[j].x, children[j].y));

                    //碰撞检测
                    for (var k = 0; k < this.checkerboard.frameList.length; k++) {
                        var tFrameNode = this.checkerboard.frameList[k];
                        var dis = cc.v2(tFrameNode.x, tFrameNode.y).sub(childPos).mag();
                        if (dis <= len && !tFrameNode.isHaveFK) {
                            count++;
                        }
                    }
                }

                if (count == children.length) {
                    canDropCount++;
                }
            }
        }

        if (canDropCount == 0) {
            return true;
        } else {
            return false;
        }
    },

    //检测是否能够放下
    checkIsCanDrop: function checkIsCanDrop() {
        if (this.checkFrameList.length == 0 || this.checkFrameList.length != this.node.children[0].children.length) {
            return false;
        }

        for (var i = 0; i < this.checkFrameList.length; i++) {
            if (this.checkFrameList[i].isHaveFK) {
                return false;
            }
        }

        return true;
    },

    //放下
    dropDownFunc: function dropDownFunc() {

        if (!this.checkIsCanDrop()) {
            //放回去
            this.takeBack();
            return;
        }

        for (var i = 0; i < this.checkFKlist.length; i++) {
            this.checkFKlist[i].x = 0;
            this.checkFKlist[i].y = 0;

            this.checkFKlist[i].parent = this.checkFrameList[i];
            this.checkFrameList[i].isHaveFK = true;
        }

        this.node.removeAllChildren();
        var oneNode = this.newOneNode();
        this.node.addChild(oneNode);

        this.checkerboard.curFKLen = this.checkFKlist.length;
        this.checkerboard.node.emit('succDropDownOne');

        // var ranC = Util.random(1, 3)
        // cc.audioEngine.playEffect(this["fangxiaSound" + ranC])


        //放回去
        this.takeBack();
        //直接用棋盘检测是不是输了
        this.checkerboard.checkIsLose();
    },

    //回到原位
    takeBack: function takeBack() {
        //变色处理
        this.checkFrameList = []; //清空数组
        this.changeColorDeal();

        this.node.getChildByName("square").setScale(scaleParam);

        this.node.x = this.node.ox;
        this.node.y = this.node.oy;
    },
    // LIFE-CYCLE CALLBACKS:

    onLoad: function onLoad() {
        this.checkFrameList = [];
        this.checkSquareList = [];

        var oneNode = this.newOneNode();
        this.node.addChild(oneNode);

        // 添加触摸
        this.addTouchEvent();
    }

    // start () {

    // },

    // update (dt) {},
});

cc._RF.pop();