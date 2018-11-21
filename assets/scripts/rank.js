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

    onLoad () {
        FBInstant .getLeaderboardAsync('eliminateRank').then(leaderboard => leaderboard.getConnectedPlayerEntriesAsync(5,0)).then(entries => {
            for (var i = 0; i < entries.length; i++) {
                var rnode = this.node.getChildByName('RankBG_' + (i + 1));
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
        }).catch(error => console.error(error));
    },

    start () {

    },

    // update (dt) {},
});
