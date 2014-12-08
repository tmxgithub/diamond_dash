/**
 * Minesweeper
 */
var DIAMONDDASH = DIAMONDDASH || {};

(function(win){
//
    var ns = win.DIAMONDDASH || {};

    ns.GemModel = Backbone.Model.extend({
        defaults: {
            colors: 0,//red,blue,green,yellow,perple
            erasable: false,//
            gridPosX: 0,//
            gridPosY: 0,//
            gridId: 'X0_Y0',//
            group: undefined,//
        },
        // GemColor: function(){
        // },
        // setGroup: function(){
        //     this.set({group: this.get('group') + 1});
        // },
        GemTappedColor: function(){
            // this.get('colors');
        },
    });

    ns.GemsCollection = Backbone.Collection.extend({
        model: ns.GemModel,
        properties: {
            gridX: 7,
            gridY: 16,
        },
        initialize: function() {
            this.GemRandomPut();
            this.GemNeighbor();
            this.gemsGroupErasable();
        },
        GemRandomPut: function(){
            var x, y, r;
            for(x = 0; x <= this.properties.gridX; x ++) {
                this.models[x] = [];
                for(y = 0; y <= this.properties.gridY; y ++) {
                    r = Math.round(Math.random() * 4);
                    var gemModel = new ns.GemModel({gridPosX: x, gridPosY: y, colors: r});
                    this.models[x][y] = gemModel;
                }
            }
        },
        GemNeighbor: function(){
            var x, y;
            for(x = 0; x <= this.properties.gridX; x ++) {
                // this.models[x] = [];
                for(y = 0; y <= (this.properties.gridY / 2); y ++) {
                    // var currentcolor = this.models[x][y];
                    var topcolor = this.models[x][y - 1];
                    var bottomcolor = this.models[x][y + 1];
                    var leftcolor = this.models[x - 1];
                    var rightcolor = this.models[x + 1];
                    this.sameGemsCount = 0;
                    this.group = 0;
                    if(topcolor !== undefined){
                        if(this.models[x][y].get('colors') == topcolor.get('colors')){
                            this.sameGemsCount ++;
                            if(this.sameGemsCount >= 2){
                                // this.group ++;
                                this.models[x][y].set({group: true});
                                // this.models[x][y].set({erasable: true});
                                // this.models[x][y - 1].set({erasable: true});
                            }
                        }
                    }
                    if(bottomcolor !== undefined){
                        if(this.models[x][y].get('colors') == bottomcolor.get('colors')){
                            this.sameGemsCount ++;
                            if(this.sameGemsCount >= 2){
                                this.models[x][y].set({group: true});
                                // this.models[x][y].set({erasable: true});
                                // this.models[x][y + 1].set({erasable: true});
                            }
                        }
                    }
                    if(x <= 6 && leftcolor !== undefined){
                        if(this.models[x][y].get('colors') == leftcolor[y].get('colors')){
                            this.sameGemsCount ++;
                            if(this.sameGemsCount >= 2){
                                this.models[x][y].set({group: true});
                                // this.models[x][y].set({erasable: true});
                                // this.models[x - 1][y].set({erasable: true});
                            }
                        }
                    }
                    if(x <= 6 && rightcolor !== undefined){
                        if(this.models[x][y].get('colors') == rightcolor[y].get('colors')){
                            this.sameGemsCount ++;
                            if(this.sameGemsCount >= 2){
                                this.models[x][y].set({group: true});
                                // this.models[x][y].set({erasable: true});
                                // this.models[x + 1][y].set({erasable: true});
                            }
                        }
                    }
                }
            }
        },
        gemsGroupErasable: function(){
            var x, y;
            for(x = 0; x <= this.properties.gridX; x ++) {
                // this.models[x] = [];
                for(y = 0; y <= this.properties.gridY; y ++) {
                    var topcolor = this.models[x][y - 1];
                    var bottomcolor = this.models[x][y + 1];
                    var leftcolor = this.models[x - 1];
                    var rightcolor = this.models[x + 1];
                    this.sameGemsCount = 0;
                    // this.group = 0;
                    if(y <= 7 && topcolor !== undefined){
                        if(this.models[x][y].get('colors') == topcolor.get('colors') && this.models[x][y].get('group')){
                            this.models[x][y].set({erasable: true});
                            this.models[x][y - 1].set({erasable: true});
                        }
                    }
                    if(y <= 7 && bottomcolor !== undefined){
                        if(this.models[x][y].get('colors') == bottomcolor.get('colors') && this.models[x][y].get('group')){
                            this.models[x][y].set({erasable: true});
                            this.models[x][y + 1].set({erasable: true});
                        }
                    }
                    if(x <= 6 && leftcolor !== undefined){
                        if(this.models[x][y].get('colors') == leftcolor[y].get('colors') && this.models[x][y].get('group')){
                            this.models[x][y].set({erasable: true});
                            this.models[x - 1][y].set({erasable: true});
                        }
                    }
                    if(x <= 6 && rightcolor !== undefined){
                        if(this.models[x][y].get('colors') == rightcolor[y].get('colors') && this.models[x][y].get('group')){
                            this.models[x][y].set({erasable: true});
                            this.models[x + 1][y].set({erasable: true});
                        }
                    }
                }
            }
            // return this.filter(function(gem) {return gems.get('erasable');});
            // collection.remove(collection.where({group: 0}));
        },
        GemUpdatePut: function(){
        }
    });
    var GemsCollection = new ns.GemsCollection();
    // var GemView = new ns.GemView();
})(this);


/**
 * gemview
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
            // this.listenTo(this.model, 'remove', this.remove);
            // this.model.bind('change', this.render, this);
        },
        clickHandler: function(){
            // if(){
            //     this.$el.remove();
            // }
            // this.$el.toggleClass('anm_deleted');
            this.$el.remove();
            // setTimeout(function(){
            //     this.$el.remove();
            // }, 3000);
            // this.trigger('', event, this);
            return this;
        },
        render: function(){
            return this;
        },
    });

    var gemView = new ns.GemView();
    // console.log(GemView.el);
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
            this.collection = new ns.GemsCollection();
        },
        // render: function(){
        //     var GemView = new ns.GemView({model: ns.GemModel});
        //     this.$el.append(GemView.render().el);
        //     return this;
        // },
        render: function() {
            var x, y;
            var lis = [];
            var id = 0;
            for(y = 0; y < this.collection.properties.gridY; y ++) {
                for(x = 0; x < this.collection.properties.gridX; x ++) {
                    lis[id] = new ns.GemView(this.collection.models[x][y]);
                    lis[id].$el.addClass("color_" + lis[id].attributes.colors);
                    lis[id].$el.addClass("X" + lis[id].attributes.gridPosX + '_' + "Y" + lis[id].attributes.gridPosY);
                    // lis[id].on('blockClick', $.proxy(this.blockGroupDelete, this));
                    this.$el.append(lis[id].el);
                    id ++;
                }
            }
        },
    });
    // var GemsView = new ns.GemsView().render();
    // console.log(GemsView.render());
            // console.log(this.models.get('colors'));
})(this);


/**
 * GameView
 */
(function(win){
    //
    var ns = win.DIAMONDDASH || {};

    ns.GameView = Backbone.View.extend({
        el: $('#game'),
        initialize: function() {
            var gemsView = new ns.GemsView();
            this.$('#grid').append(gemsView.render());
            return this;
        },
    });
    // var Game = new ns.GameView();
    // ns.Game = new DIAMONDDASH.GameView();
    // console.log(Game.render().el);

})(this);

/**
 * GameController
 */
(function(win) {
    var Game = new DIAMONDDASH.GameView();
})(this);
