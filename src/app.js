var MainScene = cc.Layer.extend({
    ctor: function () {
        this._super();


        var winSize = cc.winSize;
        var w = winSize.width;
        var h = winSize.height;
        this._tableOutSize = cc.size(w, 1115);
        this._cellOutSize = cc.size(w, 340);


        this._tableOut = null;
        this._tableIn = null;
        this._data = [1];

        this._delegate = null;

        this._isOut = true;


        this.init();
    },

    init: function () {
        if (this._super()) {

            var colorlayer = new cc.LayerColor(cc.color(220, 220, 220));
            this.addChild(colorlayer);

            this._createOutTable();
        }
        return false;

    },
    _createOutTable:function () {
        var table = this._tableOut = new cc.TableView(this, this._tableOutSize);
        table.setDirection(cc.SCROLLVIEW_DIRECTION_VERTICAL);
        table.setPosition(cc.p(0, 0));
        table.setDelegate(this);
        table.setVerticalFillOrder(cc.TABLEVIEW_FILL_TOPDOWN);
        this.addChild(table);
        table.reloadData();
    },


    tableCellAtIndex: function (table, index) {
        var cell = table.dequeueCell();
        var size = this._cellOutSize;
        var w = size.width;
        var h = size.height;
        var posy = h * 0.5;
        if (!cell) {
            cell = new cc.TableViewCell();

            var colorLayer = new cc.LayerColor(cc.color.WHITE, w, h - 20);
            cell.addChild(colorLayer);
            colorLayer.setPosition(0, 10);

            var nameLabel = cell.lzName = new cc.LabelTTF("aaaaa", "Arial", 30);
            nameLabel.setPosition(10, h * 0.84);
            nameLabel.setAnchorPoint(0, 0.5);
            nameLabel.setFontFillColor(cc.color(225, 87, 12));
            colorLayer.addChild(nameLabel);

            var rank = cell.lzRank = new cc.LabelTTF("bbbbbb", "Arial", 20);
            rank.setPosition(10, h * 0.7);
            rank.setAnchorPoint(0, 0.5);
            rank.setFontFillColor(cc.color(225, 87, 12));
            colorLayer.addChild(rank);

            var desc = cell.lzDesc = new cc.LabelTTF("cccccc", "Arial", 20);
            desc.setPosition(w * 0.75, h * 0.85);
            desc.setAnchorPoint(0, 0.5);
            desc.setFontFillColor(cc.color(225, 87, 12));
            colorLayer.addChild(desc);


            var avatar = cell.lzAvatar = new cc.Sprite("#poker_back.png");
            avatar.setPosition(67, posy);
            cell.addChild(avatar);

            var posX = [148, 192, 265, 310, 357, 416, 473];

            cell.lzCards = [];

            for (var i = 0; i < 7; i++) {
                var card = cell.lzCards[i] = new cc.Sprite("#poker01.png");
                card.setPosition(posX[i], posy);
                cell.addChild(card);
            }


            var lbBtn = cell.lzLabelBtn = new cc.LabelTTF("click", "Arial", 30);
            lbBtn.setPosition(75, 43);
            lbBtn.setFontFillColor(cc.color(225, 87, 12));
            colorLayer.addChild(lbBtn);


        }
        return cell;
    },
    scrollViewDidScroll:function (view) {
    },
    scrollViewDidZoom:function (view) {
    },

    tableCellSizeForIndex: function (table, idx) {
        return this._cellOutSize;
    },
    numberOfCellsInTableView: function (table) {
        return this._data.length;
    },
    tableCellTouched:function (table, cell ,touch) {
        var loc = cell.convertTouchToNodeSpace(touch);
        var index = cell.getIdx();

        cc.log("fuck index is " + index);
        var w = this._cellOutSize.width;
        var data = this._data[index];
        var rect = cc.rect(0, 0, 300, 80);
        if (cc.rectContainsPoint(rect, loc)) {
            if(this._tableOut){
                this._tableOut.removeAllChildrenWithCleanup(true);
                this._tableOut.removeAllChildren();

                cc.log("fuck index is in in in ");
                this._delegate = new MainScene.delegateLayer();
                this.addChild(this._delegate);
            }
        }

    }


});


MainScene.delegateLayer = cc.Layer.extend({
    ctor: function () {
        this._super();
        var winSize = cc.winSize;
        var w = winSize.width;
        var h = winSize.height;
        this._tableOutSize = cc.size(w, 1115);
        this._cellInSize = cc.size(w, 270);


        this._data = [1, 1, 1, 1, 1, 1];

        this.init();

    },
    init:function () {
        if (this._super()){
            var table  =  new cc.TableView(this, this._tableOutSize);
            table.setDirection(cc.SCROLLVIEW_DIRECTION_VERTICAL);
            table.setPosition(cc.p(0, 0));
            table.setDelegate(this);
            table.setVerticalFillOrder(cc.TABLEVIEW_FILL_TOPDOWN);
            this.addChild(table);
            table.reloadData();
            return true;
        }
        return false;

    },
    tableCellAtIndex: function (table, index) {
        var cell = table.dequeueCell();
        var size = this._cellInSize;
        var w = size.width;
        var h = size.height;
        var posy = h * 0.5;
        if (!cell) {
            cell = new cc.TableViewCell();
            var colorLayer = new cc.LayerColor(cc.color.WHITE, w, h);
            cell.addChild(colorLayer);

            var nameLabel = cell.lzName = new cc.LabelTTF("aaaaa", "Arial", 30);
            nameLabel.setPosition(61, h * 0.84);
            nameLabel.setFontFillColor(cc.color(225, 87, 12));
            colorLayer.addChild(nameLabel);

            cell.lzCards = [];
            for (var i = 0; i < 2; i++) {
                var card = cell.lzCards[i] = new cc.Sprite("#poker01.png");
                card.setPosition(150 + i * 44, posy);
                cell.addChild(card);
            }

        }
        return cell;
    },
    scrollViewDidScroll:function (view) {
    },
    scrollViewDidZoom:function (view) {
    },

    tableCellSizeForIndex: function (table, idx) {
        return this._cellInSize;
    },
    numberOfCellsInTableView: function (table) {
        return 4;
    }
});

MainScene.createScene = function () {
    var scene = new cc.Scene();
    var layer = new MainScene();
    scene.addChild(layer);

    return scene;

};