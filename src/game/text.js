 mainConfig.prototype.bubbleText = function(text) {
   if (typeof(this.textholder.text)=='undefined')
   {
     var spr_bg = game.add.graphics(0, 0);
       spr_bg.beginFill('#bababa', 0.8);
       spr_bg.drawRect(0, 400, this.game.width, this.game.height);
       spr_bg.alpha = 0.6;
       spr_bg.endFill();
     this.textholder.spr_bg = spr_bg
     this.textholder.text = game.add.text(0, 400, text, { font: "40px Arial", fill: "#ffffff", align: "center" });
   }
 };

 mainConfig.prototype.textholder = function() {

 };