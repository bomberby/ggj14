var width = 0;
var height = 630;

function wordsubstr(txt){
  var re = txt.match(/^.{0,25}[\S]*/);
    var l = re[0].length;
    var re = re[0].replace(/\s$/,'');
    return re;
};

mainConfig.prototype.bubbleText = function(text) {
  if (!this.hasText())
  {
    var spr_bg = game.add.graphics(0, 0);
    spr_bg.beginFill('#bababa', 0.8);
    spr_bg.drawRect(width, height, this.game.width, this.game.height);
    spr_bg.alpha = 0.6;
    spr_bg.endFill();
    
    this.textholder.spr_bg = spr_bg;
    var textarr = [];
    var cuttext;
    while (text.length > 0)
    {
      cuttext = wordsubstr(text, 80);
      textarr[textarr.length] = game.add.text(width + 40, height, cuttext, { font: "80px Arial", fill: "#ffffff", align: "center" });
      text = text.substr(cuttext.length+1);
      height += 80;
    }
    this.textholder.text = textarr;
    height = 630;
  }
};

mainConfig.prototype.clearText = function() {
  if (this.hasText())
  {
    for (i=0 ;  i<this.textholder.text.length;i++){
      this.textholder.text[i].destroy();
      this.textholder.text[i] = undefined;
    }
    this.textholder.text = undefined
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
  else
    this.textnum += 1;
}

mainConfig.prototype.textnum = 0;
mainConfig.prototype.plot = [
  'Boss: so, it has come to this! you have finally seeked me out',
  'Hero: you Will pay for all that you\'ve done',
  'Boss: oh, we\'ll see about that, boy, come forth, and meet your doom!',
  null,
  'Boss:"finally, the end has come... for me"',
  null,
  '*the next weekend*',
  'Hero:"Life is GREAT"',
  'Hero:"guild bills paid, the big baddie is dead, and i\'ve got all the time and money that I could wish for"',
  'Hero: HAHA, cold throne and a cold bear.',
  'Hero:"so... what do I do now?"',
  null,
  'Villager:Save me! these MICE!',
  'Hero: No worries!',
  null
]