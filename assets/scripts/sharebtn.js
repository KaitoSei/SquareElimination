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

    // onLoad () {},

    onClick(){
        if (typeof FBInstant === 'undefined') return;
        FBInstant.shareAsync({
            intent: 'SHARE',
            image: 'data:image/png;base64,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',
            text: '来和我比一比吧~',
            data: {myReplayData: '...'},
        }).then(() => {
            // continue with the game.
        });
    },

    start () {

    },

    // update (dt) {},
});
