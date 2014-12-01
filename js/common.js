/**
 * DIAMONDDASH
 *
 * model
 * Collection
 */
var DIAMONDDASH = DIAMONDDASH || {};

(function(win){
//
    var ns = win.DIAMONDDASH || {};


    ns.Gem = Backbone.Model.extend({
        defaults: {
            colors: 0,//red,blue,green,yellow,perple
            erasable: false,//
            gridPosX: 0,//
            gridPosY: 0,//
            gridId: 'X0_Y0',//
            groupId: undefined,//
        },
    });

    ns.Gems = Backbone.Collection.extend({
        model: ns.Gem,
        properties: {
            gridX: 7,
            gridY: 16,
            gemsModel: []
        },
        initialize: function() {
            this.createGemRandom();
        },
        createGemRandom: function(){
            this.x = 7;
            this.y = 16;
            var gemlis = [];
            for (y = 0; y < this.properties.gridY; y++) {
                var gemRow = [];
                for (x = 0; x < this.properties.gridX; x++) {
                    var r = Math.floor(Math.random() * 5);
                    gemRow.push(new ns.Gem({gridPosX: x, gridPosY: y, colors: r}));
                }
                gemlis.push(gemRow);
            }
            // console.log(gemlis);
            return this.properties.gemsModel;
            // console.log(this.gemlis[x][y].get('colors'));
        }
        // gemsStatusUpdate: function(){
        // }
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
        initialize: function() {
            // this.listenTo(this.model, 'change', this.render);
            this.collection = new ns.Gems();
        },
        clickHandler: function(event){
            this.trigger('gemClick', event, this);
            // this.$el.remove();
            // return this;
        },
        render: function(){
            // var lis = [];
            // var id = 0;
            var gems = new ns.Gems();
            console.log(gems);
            gems.$el.addClass("color_" + gems.get('colors'));
            // this.$el.addClass("color_" + this.collection.gemlis[x][y].get('colors'));
            // this.$el.addClass("X" + this.collection.get('gridPosX') + '_' + "Y" + this.collection.get('gridPosX'));
            return this;
        },
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
        },
        render: function() {
            var gemView = new ns.GemView({model: ns.Gem});
            this.$el.append(gemView.render().el);
            return this;
        },
        // gemClickHandler: function(event, gemView){
        //     if(gemView.model.get('erasable')){
        //         this.trigger('remove');
        //     }
        //     this.cellGroupOpen();
        // },
        // gemsGroupDelete: function(){
        //     var group = gemView.model.get('groupId');
        //     _(this.collection).each(function(model, index){
        //         if(this.model.get('sameGem') >= 3){
        //             this.$el.remove();
        //             // this.model.set('erasable', true);
        //         }
        //     }, this);
        // },
    });
})(this);


/**
 * TimeCountView
 */
(function(win){
    //
    var ns = win.DIAMONDDASH || {};

    ns.TimeCountView = Backbone.View.extend({
        initialize: function() {
        },
        timeStart: function() {
        },
        timeStop: function() {
        },
        timeReset: function() {
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
        initialize: function() {
        },
        scoreCount: function() {
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
            var gemsView = new ns.GemsView();
            this.$('#grid').append(gemsView.render());
            return this;
        },
        gameStart: function() {
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
