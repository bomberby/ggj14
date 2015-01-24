var width = 0;
var height = 170;
mainConfig.prototype.bubbleText = function(text) {
  if (!this.hasText())
  {
    var spr_bg = game.add.graphics(0, 0);
    spr_bg.beginFill('#bababa', 0.8);
    spr_bg.drawRect(width, height, this.game.width, this.game.height);
    spr_bg.alpha = 0.6;
    spr_bg.endFill();
    
    this.textholder.spr_bg = spr_bg
    this.textholder.text = game.add.text(width, height, text, { font: "20px Arial", fill: "#ffffff", align: "center" });
  }
};

mainConfig.prototype.clearText = function() {
  if (this.hasText())
  {
    this.textholder.text.destroy();
    this.textholder.text = undefined;

    this.textholder.spr_bg.destroy();
    this.textholder.spr_bg = undefined;
    this.textnum += 1;
    this.nextText();
  }
};
 
mainConfig.prototype.hasText = function() {
  return (typeof(this.textholder.text)!='undefined');
};

mainConfig.prototype.textholder = [];

mainConfig.prototype.nextText = function() {
  if (this.hasText())
    return
  if (this.plot[this.textnum])
    this.bubbleText(this.plot[this.textnum]);

}
mainConfig.prototype.textnum = 0;
mainConfig.prototype.plot = ['bla','primak is indra','another text',null,'no text after?',null]
//todo: gamestate
//todo: move to next text