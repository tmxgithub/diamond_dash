/**
 * Minesweeper関連オブジェクトを格納するNamespace
 */
var DIAMONDDASH = DIAMONDDASH || {};

(function(win){
//
    var ns = win.DIAMONDDASH || {};

    ns.JemModel = Backbone.Model.extend({
        defaults: {
            colors: 0,//red,blue,green,yellow,perple
            unDisappear: false,//消えるか消えないか
            gridPosX: 0,// x座標
            gridPosY: 0,// y座標
            group: 0,// グループ
        },
        // JemColor: function(){
        // },
        JemTappedColor: function(){
            // this.get('colors');
        },
    });

    ns.JemsCollection = Backbone.Collection.extend({
        model: ns.JemModel,
        properties: {
            gridX: 7,
            gridY: 16,
        },
        initialize: function() {
            this.collection = this.JemRandomPut();
        },
        JemRandomPut: function(){
            var x, y, r;
            for(x = 0; x < this.properties.gridX; x ++) {
                this.models[x] = [];
                for(y = 0; y < this.properties.gridY; y ++) {
                    r = Math.round(Math.random() * 4);
                    var JemModel = new ns.JemModel({gridPosX: x, gridPosY: y, colors: r});
                    this.models[x][y] = JemModel;
                }
            }
            return this;
        },
        JemNeighbors: function(){
            var x, y;
            for (x = 0; x < this.properties.gridX; x++) {
                this.models[x] = [];
                for (y = 0; y < this.properties.gridY; y++) {
                    // var neighbors = [];
                    // for (var dx = -1; dx <= 1; dx++) {
                    //     for (var dy = -1; dy <= 1; dy++) {
                    //         if (this.models[x+dx] && this.models[x+dx][y+dy]) {
                    //             this.models[x][y].set({group: x,unDisappear: true});
                    //         }
                    //     }
                    // }
                    // this.models[x][y].set({neighbors: x});
                    // if(this.models[x][y].get('colors') == this.models[x][y - 1].get('colors')){
                    //     this.models[x][y].set({unDisappear: true});
                    // }
                }
            }
            return this;
        },
        getColors: function(){
            // var x, y, r;
            // for(x = 0; x < this.properties.gridX; x ++) {
            //     this.models[x] = [];
            //     for(y = 0; y < this.properties.gridY; y ++) {
            //         r = Math.round(Math.random() * 4);
            //         var JemModel = new ns.JemModel({gridPosX: x, gridPosY: y, colors: r});
            //         this.models[x][y] = JemModel;
            //     }
            // }
            // return this;
        }
    });
// console.log(this.model.toJSON());
    var JemsCollection = new ns.JemsCollection().JemNeighbors();
    console.log(JemsCollection);
    // var JemView = new ns.JemView();
})(this);


/**
 * jemview
 */
(function(win){
    //
    var ns = win.DIAMONDDASH || {};

    ns.JemView = Backbone.View.extend({
        tagName: 'li',
        className: 'jem',
        events: {
            'click .jem': 'destroy',
            'click': 'clickHandler',
        },
        initialize: function() {
            // this.listenTo(this.model, 'destroy', this.render);
            // this.listenTo(this.collections, 'change', this.render);
        },
        destroy: function(){
            this.$el.addClass('anm_deleted');
            this.$el.destroy();
            // this.trigger('', event, this);
        },
        clickHandler: function(event){
            // this.trigger('', event, this);
            return this;
        },
        render: function(){
            return this;
        },
    });

    var JemView = new ns.JemView();
    // console.log(JemView.el);
})(this);


/**
 * jemリストview
 */
(function(win){
    //
    var ns = win.DIAMONDDASH || {};

    ns.JemsView = Backbone.View.extend({
        el: $('#grid'),
        initialize: function() {
            this.collection = new ns.JemsCollection();
        },
        // render: function(){
        //     var JemView = new ns.JemView({model: ns.JemModel});
        //     this.$el.append(JemView.render().el);
        //     return this;
        // },
        render: function() {
            var lis = [];
            var id = 0;
            for(var y = 0; y < this.collection.properties.gridY; y ++) {
                for(var x = 0; x < this.collection.properties.gridX; x ++) {
                    lis[id] = new ns.JemView(this.collection.models[x][y]);
                    lis[id].$el.addClass("color_" + lis[id].attributes.colors);
                    lis[id].$el.addClass("gridX" + lis[id].attributes.gridPosX);
                    lis[id].$el.addClass("gridY" + lis[id].attributes.gridPosY);
                    // lis[id].on('blockClick', $.proxy(this.blockGroupDelete, this));
                    this.$el.append(lis[id].el);
                    id ++;
                }
            }
        },
    });
    // var JemsView = new ns.JemsView().render();
    // console.log(JemsView.render());

})(this);

(function(win){
    //
    var ns = win.DIAMONDDASH || {};

    ns.GameView = Backbone.View.extend({
        el: $('#game'),
        initialize: function() {
            // var JemsView = new ns.JemsView();
        },
        render: function(){
            var JemsView = new ns.JemsView();
            this.$('#grid').append(JemsView.render());
            return this;
        },
    });
    // var Game = new ns.GameView();
    // ns.Game = new DIAMONDDASH.GameView();
    // console.log(Game.render().el);

})(this);

/**
 * GameController起動
 */
(function(win) {
    var Game = new DIAMONDDASH.GameView();
    console.log(Game.render().toJSON());
})(this);
