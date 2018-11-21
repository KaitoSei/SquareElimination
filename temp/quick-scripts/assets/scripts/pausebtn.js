(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/pausebtn.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '8af4cNhPF1EcJQwYpbfO0Y3', 'pausebtn', __filename);
// scripts/pausebtn.js

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
        topprefab: {
            default: null,
            type: cc.Prefab
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function onLoad() {
        this.ispaused = false;
        this.node.on('touchOne', this.onTouch, this);
    },
    onTouch: function onTouch() {
        if (this.ispaused) {
            this.ispaused = false;
            var topNode = cc.find('Canvas/top');
            topNode.destroy();

            var scoresnode = cc.find('Canvas/scores');
            scoresnode.x = 0;
        }
    },
    onClick: function onClick() {
        if (!this.ispaused) {
            this.ispaused = true;
            var scoresnode = cc.find('Canvas/scores');
            scoresnode.x -= 220;

            var topNode = cc.instantiate(this.topprefab);
            this.node.parent.addChild(topNode);
        } else {
            this.ispaused = false;
            var topNode = cc.find('Canvas/top');
            topNode.destroy();

            var scoresnode = cc.find('Canvas/scores');
            scoresnode.x = 0;
        }
    }
}

// start () {

// },

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
        //# sourceMappingURL=pausebtn.js.map
        