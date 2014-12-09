/**
 * DIAMONDDASH
 *
 * model
 * Collection
 */
var DIAMONDDASH = DIAMONDDASH || {};

(function(win){
    var ns = win.DIAMONDDASH || {};


    ns.Gem = Backbone.Model.extend({
        defaults: {
            colors: 0,//red,blue,green,yellow,perple
            erasable: false,//
            gridPosX: 0,//
            gridPosY: 0,//
            id: 'id0_0',//
            group: undefined,//
        }
    });

    ns.Gems = Backbone.Collection.extend({
        model: ns.Gem,
        properties: {
            gridX: 7,
            gridY: 16,
            resetFlg: false
        },
        initialize: function(gemsView) {
            this.collection = this.createGemRandom();
            this.checkFlg = [];
            this.group = 0;
            this.erasableGemCount = 0;
            this.sameGemCount = 0;
            this.gemsUpdateStatus(gemsView);
        },
        createGemRandom: function(){
            var x, y, r;
            var gemModel;
            for(x = 0; x < this.properties.gridX; x ++) {
                this.models[x] = [];
                for(y = 0; y < this.properties.gridY; y ++) {
                    id = x + (y * this.properties.gridX);
                    r = Math.round(Math.random() * 4);
                    gemModel = new ns.Gem({id: 'id' + x +'_'+ y, colors: r, gridPosX: x, gridPosY: y});
                    this.models[x][y] = gemModel;
                }
            }
            return this;
        },
        initCheckFlg: function() {
            var i;
            this.checkFlg = new Array(this.properties.gridX);
            for(i = 0; i < this.properties.gridX; i++){
                this.checkFlg[i] = new Array(this.properties.gridY);
            }
        },
        initGemGroup: function() {
            var x, y;
            for(y = (this.properties.gridY / 2); y < this.properties.gridY; y ++) {
                for(x = 0; x < this.properties.gridX; x ++) {
                    if(this.models[x][y] == undefined) {continue};
                    this.models[x][y].set('erasable', false);
                    this.models[x][y].set('group', undefined);
                }
            }
        },
        gemsUpdateStatus: function(gemsView){
            var x, y;
            var i = 0;
            this.group = 0;
            this.erasableGemCount = 0;
            this.initCheckFlg();
            this.initGemGroup();
            for(y = (this.properties.gridY / 2); y < this.properties.gridY; y ++) {
                for(x = 0; x < this.properties.gridX; x ++) {
                    this.sameGemCount = 0;
                    if(this.models[x][y] == undefined) {continue};
                    this.checkAroundGem(x, y);
                    if(this.sameGemCount >= 3) {
                        this.group ++;
                    }
                }
            }
        },
        checkAroundGem: function(x, y) {
            this.checkTopGem(x, y);
            this.checkLeftGem(x, y);
            this.checkRightGem(x, y);
            this.checkBottomGem(x, y);
            if(this.sameGemCount >= 3) {
                this.models[x][y].set('group', this.group);
                this.models[x][y].set('erasable', true);
            }
        },
        checkTopGem: function(x, y) {
            if(y > (this.properties.gridY / 2) && this.models[x][y - 1] != undefined) {
                if(this.models[x][y].get('colors') == this.models[x][y - 1].get('colors')) {
                    if(this.models[x][y - 1].get('group') == undefined && this.checkFlg[x][y - 1] == undefined) {
                        this.checkFlg[x][y - 1] = 1;
                        this.sameGemCount ++;
                        if(this.sameGemCount >= 3) {
                            this.models[x][y].set('group',this.group);
                            this.models[x][y - 1].set('group',this.group);
                            this.erasableGemCount ++;
                        }
                        this.checkAroundGem(x, y - 1);
                    }
                }
            }
        },
        checkLeftGem: function(x, y) {
            if(x > 0 && this.models[x - 1][y] != undefined) {
                if(this.models[x][y].get('colors') == this.models[x - 1][y].get('colors')) {
                    if(this.models[x - 1][y].get('group') == undefined && this.checkFlg[x - 1][y] == undefined) {
                        this.checkFlg[x - 1][y] = 1;
                        this.sameGemCount ++;
                        if(this.sameGemCount >= 3) {
                            this.models[x][y].set('group',this.group);
                            this.models[x - 1][y].set('group',this.group);
                            this.erasableGemCount ++;
                        }
                        this.checkAroundGem(x - 1, y);
                    }
                }
            }
        },
        checkRightGem: function(x, y) {
            if(x < this.properties.gridX - 1 && this.models[x + 1][y] != undefined) {
                if(this.models[x][y].get('colors') == this.models[x + 1][y].get('colors')) {
                    if(this.models[x + 1][y].get('group') == undefined && this.checkFlg[x + 1][y] == undefined) {
                        this.checkFlg[x + 1][y] = 1;
                        this.sameGemCount ++;
                        if(this.sameGemCount >= 3) {
                            this.models[x][y].set('group',this.group);
                            this.models[x + 1][y].set('group',this.group);
                            this.erasableGemCount ++;
                        }
                        this.checkAroundGem(x + 1, y);
                    }
                }
            }
        },
        checkBottomGem: function(x, y) {
            if(y < this.properties.gridY - 1 && this.models[x][y + 1] != undefined) {
                if(this.models[x][y].get('colors') == this.models[x][y + 1].get('colors')) {
                    if(this.models[x][y + 1].get('group') == undefined && this.checkFlg[x][y + 1] == undefined) {
                        this.checkFlg[x][y + 1] = 1;
                        this.sameGemCount ++;
                        if(this.sameGemCount >= 3) {
                            this.models[x][y].set('group',this.group);
                            this.models[x][y + 1].set('group',this.group);
                            this.erasableGemCount ++;
                        }
                        this.checkAroundGem(x, y + 1);
                    }
                }
            }
        }
    });
})(this);


/**
 * GemView
 */
(function(win){
    //
    var ns = win.DIAMONDDASH || {};

    ns.GemView = Backbone.View.extend({
        tagName: 'li',
        className: 'gem',
        events: {
            'click': 'clickHandler',
        },
        clickHandler: function(event) {
            this.trigger('gemClick', event, this);
        }
    });
})(this);


/**
 * GemsView
 */
(function(win){
    //
    var ns = win.DIAMONDDASH || {};

    ns.GemsView = Backbone.View.extend({
        el: $('#grid'),
        initialize: function() {
            this.collection = new ns.Gems();
            this.gemListSet();
        },
        gemListSet: function() {
            var lis = [];
            var id = 0;
            var x, y;
            for(y = 0; y < this.collection.properties.gridY; y ++) {
                for(x = 0; x < this.collection.properties.gridX; x ++) {
                    lis[id] = new ns.GemView(this.collection.models[x][y]);
                    lis[id].$el.addClass("color_" + lis[id].attributes.colors);
                    lis[id].listenTo(lis[id], 'gemClick', $.proxy(this.gemGroupDelete, this));
                    this.$el.append(lis[id].el);
                    id ++;
                }
            }
        },
        gemGroupDelete: function(event, self) {
            // console.log(this);
            // console.log(self);
            var deletedGems = [];
            var i = 0;
            var x, y;
            for(y = 0; y < this.collection.properties.gridY; y ++) {
                for(x = 0; x < this.collection.properties.gridX; x ++) {
                    if(this.collection.models[x][y] == undefined) {continue};
                    if(this.collection.models[x][y].get('group') == undefined) {continue};
                    if(this.collection.models[x][y].get('group') == self.attributes.group && this.collection.models[x][y].get('erasable') == true) {
                        // var expTop = Number($('#id' + x + '_' + y).css('top').slice(0, -2)) - 10;
                        // var expLeft = Number($('#id' + x + '_' + y).css('left').slice(0, -2)) - 10;
                        // var expId = this.collection.models[x][y].get('group');
                        // $('#id' + x + '_' + y).addClass('anm_deleted');
                        // $('#id' + x + '_' + y).removeClass('anm_deleted');
                        $('#id' + x + '_' + y).remove();
                        delete this.collection.models[x][y];
                        deletedGems[i] = [];
                        deletedGems[i].push(x,y);
                        i++;
                    }
                }
            }
            var scoreView = new ns.ScoreView(deletedGems);
            this.gemFall(deletedGems, self);
        },
        gemFall: function(deletedGems, view) {
            var gemXY = this.setFallGem(deletedGems);
            this.gemFallRender(view, gemXY);
        },
        setFallGem: function(deletedGems) {
            var x = [];
            var y_x = [];
            var i;
            for(i = 0; i < this.collection.properties.gridX; i++) {
               x[i] = 0;
               y_x[i] = [];
            }
            _.each(deletedGems, function(num) {
                switch(num[0]) {
                    case 0:
                        x[0] ++;
                        y_x[0].push(num[1]);
                        break;
                    case 1:
                        x[1] ++;
                        y_x[1].push(num[1]);
                        break;
                    case 2:
                        x[2] ++;
                        y_x[2].push(num[1]);
                        break;
                    case 3:
                        x[3] ++;
                        y_x[3].push(num[1]);
                        break;
                    case 4:
                        x[4] ++;
                        y_x[4].push(num[1]);
                        break;
                    case 5:
                        x[5] ++;
                        y_x[5].push(num[1]);
                        break;
                    case 6:
                        x[6] ++;
                        y_x[6].push(num[1]);
                        break;
                }
            });
            return [x, y_x];
        },
        gemFallRender: function(view, gemXY) {
            var fallY_max;
            var fallY_now;
            var fallY_min;
            var fallCount;
            var emptyBlocks = [];
            var addBlocks = [];
            for(n = 0; n < this.collection.properties.gridX; n ++) {
                if(gemXY[0][n] != 0) {
                    fallY_max = _.max(gemXY[1][n]);
                    fallY_now = fallY_max;
                    fallY_min = _.min(gemXY[1][n]) - 1;
                    fallCount = 0;
                    for(fallY_now; fallY_now > fallY_min; fallY_now --) {
                        if(this.collection.models[n][fallY_now] == undefined) {continue};
                        if(this.collection.models[n][fallY_now].get('group') == view.attributes.group) {continue};
                        $('#id'+n+'_'+fallY_now).attr('id', 'id' + n + '_' + (fallY_max - fallCount));
                        this.collection.models[n][fallY_now].set('blockY', (fallY_max - fallCount));
                        this.collection.models[n][fallY_now].set('id', 'id' + n + '_' + (fallY_max - fallCount));
                        this.collection.models[n][(fallY_max - fallCount)] = this.collection.models[n][fallY_now];
                        delete this.collection.models[n][fallY_now];
                        emptyBlocks.push([n, fallY_now]);
                        addBlocks.push([n, (fallY_max - fallCount)]);
                        fallCount ++;
                    }
                    for(fallY_min; fallY_min >= 0; fallY_min --) {
                        if(this.collection.models[n][fallY_min] == undefined) {continue};
                        $('#id'+n+'_'+fallY_min).attr('id', 'id' + n + '_' + (fallY_min + gemXY[0][n]));
                        this.collection.models[n][fallY_min].set('blockY', (fallY_min + gemXY[0][n]));
                        this.collection.models[n][fallY_min].set('id', 'id' + n + '_' + (fallY_min + gemXY[0][n]));
                        this.collection.models[n][(fallY_min + gemXY[0][n])] = this.collection.models[n][fallY_min];
                        delete this.collection.models[n][fallY_min];
                        emptyBlocks.push([n, fallY_min]);
                        addBlocks.push([n, (fallY_min + gemXY[0][n])]);
                    }
                }
            }
            _.each(emptyBlocks, function(num, index) {
                emptyBlocks[index] = num.toString();
            });
            _.each(addBlocks, function(num, index) {
                delete emptyBlocks[_.indexOf(emptyBlocks, num.toString())];
            });
            this.collection.gemsUpdateStatus(this);
            this.gemMakeMargin(emptyBlocks);
        },
        gemMakeMargin: function(emptyBlocks) {
            var addBlocksArray = [];
            _.each(emptyBlocks, function(num, index) {
                addBlocksArray.push(num.split(","));
            });
            var id = 0;
            var lis = [];
            var r;
            var gemModel;
            _.each(addBlocksArray, function(num, index) {
                id = Number(num[0]) + (Number(num[1]) * this.collection.properties.gridX);
                r = Math.round(Math.random() * 4);
                gemModel = new ns.Gem({id: 'id' + Number(num[0]) +'_'+ Number(num[1]), colors: r, gridPosX: Number(num[0]), gridPosY: Number(num[1])});
                this.collection.models[Number(num[0])][Number(num[1])] = gemModel;
                lis[id] = new ns.GemView(gemModel);
                lis[id].$el.addClass("color_" + lis[id].attributes.colors);
                lis[id].listenTo(lis[id], 'gemClick', $.proxy(this.gemGroupDelete, this));
                this.$el.append(lis[id].el);
                // lis[id].$el.addClass('anm_deleted');
            }, this);
        }
    });
})(this);


/**
 * TimeCountView
 */
(function(win){
    var ns = win.DIAMONDDASH || {};

    ns.TimeCountView = Backbone.View.extend({
        el: $('.second'),
        properties: {
            sec: 60,
            timerId: undefined
        },
        initialize: function() {
            // this.collection = new ns.BlockCollection();
            // this.countDown();
            this.render();
            this.$el.html(this.properties.sec);
            $('.meter').attr('value', this.properties.sec);
        },
        start: function() {
            var self = this;
            this.properties.timerId = window.setInterval(function() {
                self.countDown();
            }, 1000);
        },
        stop: function() {
            clearInterval(this.properties.timerId);
        },
        countDown: function() {
            var prop = this.properties;
            prop.sec--;
            var target = $('.meter');
            target.attr('value', prop.sec);
            this.render();
            if(prop.sec === 0) {
                $('#mask_layer').show();
                $('#timeup').show();
                $('.re_start').show();
                // this.render();
                this.$el.html(60);
                $('.meter').attr('value', 60);
                this.clear();
            }
        },
        clear: function() {
            this.stop();
            this.properties.sec = 60;
            this.$el.html(60);
            // console.log(this.properties.sec);
        },
        render: function() {
            this.$el.html(this.properties.sec);
            console.log(this.properties.sec);
        }
    });
})(this);


/**
 * ScoreView
 */
(function(win){
    //
    var ns = win.DIAMONDDASH || {};

    ns.ScoreView = Backbone.View.extend({
        el: $('#score_point'),
        properties: {
            gameScore: 0,
            deletedGemCount: 0
        },
        initialize: function(deletedGems) {
            if(deletedGems != undefined) {
                this.deletedGemCount = deletedGems.length;
                this.$el.html(this.properties.gameScore);
                this.render();
                console.log(this.deletedGemCount);
            }else{
                this.$el.html(this.properties.gameScore);
                this.properties.gameScore = 0;
            }
        },
        render: function() {
            this.properties.gameScore += this.deletedGemCount * 100;
            this.$el.html(this.properties.gameScore);
        }
    });
})(this);


/**
 * GemsGameView
 */
(function(win){
    //
    var ns = win.DIAMONDDASH || {};

    ns.GemsGameView = Backbone.View.extend({
        el: $('#game'),
        initialize: function() {
            this.timeCountView = new ns.TimeCountView();
            this.scoreView = new ns.ScoreView();
            this.gemsView = new ns.GemsView();
            this.gameStart();
            this.gameRetry();
            return this;
        },
        gameStart: function() {
            var self = this;
            $('.game_start').on('click', function(){
                $('#mask_layer').hide();
                $('.game_start').hide();
                self.timeCountView.start();
            });
        },
        gameRetry: function() {
            var self = this;
            $('.re_start').on('click', function(){
                $('#mask_layer').hide();
                $('#timeup').hide();
                $('.re_start').hide();
                self.timeCountView.start();
            });
        },
        gameEnd: function() {
        },
        gameReset: function() {
        }
    });
})(this);

/**
 * GameController
 */
(function(win) {
    var Game = new DIAMONDDASH.GemsGameView();
})(this);