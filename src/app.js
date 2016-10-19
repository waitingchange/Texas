var MainScene = cc.Layer.extend({
    ctor: function () {
        this._super();


        var winSize = cc.winSize;
        var w = winSize.width;
        var h = winSize.height;
        this._tableOutSize = cc.size(w, 1115);
        this._cellOutSize = cc.size(w, 340);
        this._cellBigSize = cc.size(w, 2320);
        this._cellInSize = cc.size(w, 220);


        this._tableOut = null;
        this._data = [1, 1];

        this._delegate = null;

        this._isOnClickIndex = -1;


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
    _createOutTable: function () {
        var table = this._tableOut = new cc.TableView(this, this._tableOutSize);
        table.setDirection(cc.SCROLLVIEW_DIRECTION_VERTICAL);
        table.setPosition(cc.p(0, 0));
        table.setDelegate(this);
        table.setVerticalFillOrder(cc.TABLEVIEW_FILL_TOPDOWN);
        this.addChild(table);
        table.reloadData();
    },

    initTableCell: function (cell, isNormal) {
        var size = this._cellOutSize;
        if (!isNormal) {
            size = this._cellBigSize;
        }
        var w = size.width;
        var h = size.height;
        var posy = h * 0.5;


        var nameLab = cell.lzName;
        var rankLab = cell.lzRank;
        var cards = cell.lzCards;
        var descLab = cell.lzDesc;
        var lzAvatar = cell.lzAvatar;
        var btnLab = cell.lzLabelBtn;


        nameLab.setPosition(10, h - 46);
        rankLab.setPosition(10, h - 86);
        descLab.setPosition(w * 0.75, h - 47);
        lzAvatar.setPosition(67, h - 190);

        var posX = [148, 192, 265, 310, 357, 416, 473];
        for (var i = 0; i < 7; i++) {
            cards[i].setPosition(posX[i], h - 190);
        }
        btnLab.setPosition(75, 43);

        if (!isNormal) {
            var showNode = cell.showNode = new cc.LayerColor(cc.color(255, 255, 255, 255), w, 1980);
            cell.addChild(showNode);
            showNode.setPosition(0, 76);

            for (var i = 0; i < 9; i++) {
                var cnode = this._createExtraCell();
                cnode.setPosition(0, 220 * i);
                showNode.addChild(cnode);
            }

        } else if (cell.showNode) {
            cell.showNode.removeFromParent();
            cell.showNode = null;
        }

    },

    _createExtraCell: function () {
        var cell = new cc.Node();
        var cellSize = this._cellInSize;

        var w = cellSize.width;
        var h = cellSize.height;
        var posy = h * 0.5;

        cell.setContentSize(cellSize);


        var nameLabel = cell.lzName = new cc.LabelTTF("aaaaa", "Arial", 30);
        nameLabel.setPosition(61, h * 0.84);
        nameLabel.setFontFillColor(cc.color(225, 87, 12));
        cell.addChild(nameLabel);

        cell.lzCards = [];
        for (var i = 0; i < 2; i++) {
            var card = cell.lzCards[i] = new cc.Sprite("#poker01.png");
            card.setPosition(150 + i * 44, posy);
            cell.addChild(card);
        }

        return cell;


    },


    tableCellAtIndex: function (table, index) {
        var cell = table.dequeueCell();
        var size = this._cellOutSize;
        var w = size.width;
        var h = size.height;
        var posy = h * 0.5;
        if (!cell) {
            cell = new cc.TableViewCell();

            var colorLayer = cell.bgLayer = new cc.LayerColor(cc.color.WHITE, w, h - 20);
            cell.addChild(colorLayer);
            colorLayer.setPosition(0, 10);

            var nameLabel = cell.lzName = new cc.LabelTTF("aaaaa", "Arial", 30);
            nameLabel.setAnchorPoint(0, 0.5);
            nameLabel.setFontFillColor(cc.color(225, 87, 12));
            colorLayer.addChild(nameLabel);

            var rank = cell.lzRank = new cc.LabelTTF("bbbbbb", "Arial", 20);
            rank.setAnchorPoint(0, 0.5);
            rank.setFontFillColor(cc.color(225, 87, 12));
            colorLayer.addChild(rank);

            var desc = cell.lzDesc = new cc.LabelTTF("cccccc", "Arial", 20);
            desc.setAnchorPoint(0, 0.5);
            desc.setFontFillColor(cc.color(225, 87, 12));
            colorLayer.addChild(desc);


            var avatar = cell.lzAvatar = new cc.Sprite("#poker_back.png");
            cell.addChild(avatar);


            cell.lzCards = [];

            for (var i = 0; i < 7; i++) {
                var card = cell.lzCards[i] = new cc.Sprite("#poker01.png");
                cell.addChild(card);
            }

            var lbBtn = cell.lzLabelBtn = new cc.LabelTTF("click", "Arial", 30);

            lbBtn.setFontFillColor(cc.color(225, 87, 12));
            colorLayer.addChild(lbBtn);

            this.initTableCell(cell, true);

        }
        return cell;
    },
    scrollViewDidScroll: function (view) {
    },
    scrollViewDidZoom: function (view) {
    },

    tableCellSizeForIndex: function (table, idx) {
        if (idx == this._isOnClickIndex) {
            return this._cellBigSize;
        }
        return this._cellOutSize;
    },
    numberOfCellsInTableView: function (table) {
        return this._data.length;
    },
    tableCellTouched: function (table, cell, touch) {
        var loc = cell.convertTouchToNodeSpace(touch);
        var index = cell.getIdx();

        cc.log("fuck index is " + index);
        var w = this._cellOutSize.width;
        var data = this._data[index];
        var rect = cc.rect(0, 0, 300, 80);

        if (cc.rectContainsPoint(rect, loc)) {
            if (index != this._isOnClickIndex) {
                this._isOnClickIndex = index;
                cc.log("fuck click index is " + index);
                cell.bgLayer.setContentSize(this._cellBigSize.width, this._cellBigSize.height - 20);

                this.initTableCell(cell, false);

            } else {
                // cell.lzName.setPosition(cc.p(200,0));
                cell.bgLayer.setContentSize(this._cellOutSize.width, this._cellOutSize.height - 20);
                this._isOnClickIndex = -1;
                this.initTableCell(cell, true);

            }


            this._tableOut.reloadData();


            if (this._tableOut) {
                // this._tableOut.removeAllChildrenWithCleanup(true);
                // this._tableOut.removeAllChildren();

                // cc.log("fuck index is in in in ");
                // this._delegate = new MainScene.delegateLayer();
                // this.addChild(this._delegate);
            }
        }

    }


});


MainScene.createScene = function () {
    var scene = new cc.Scene();
    var layer = new MainScene();
    scene.addChild(layer);

    return scene;

};