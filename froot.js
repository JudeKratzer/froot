//Constants
var W, H;

//functions
var within;
var fillGrid;
var functionOfGrid;

//classes
var Garden;

//game parts
var box;



function setup() {
  W = windowWidth;
  H = windowHeight;
  createCanvas(W, H);

  //functions
  within = function(px, py, rectx1, recty1, rectx2, recty2) {
    if(px >= rectx1 && px < rectx2 && py >= recty1 && py < recty2) {
      return true;
    }
    return false;
  }
  fillGrid = function(rows, cols, els){
    var retarr = [];
    for(var i = 0; i < this.cols; i++) {
      var temparr = [];
      for(var j = 0; j < this.rows; j++){
        temparr.push(els(i, j));
      }
      retarr.push(temparr);
    }
    return(retarr);
  }
  functionOfGrid;

  //classes
  Garden = function(rows, columns, centerx, centery, borderthickness, insidethickness, highlightcolor, bordercolor, sidelength) {
    this.init = function(r, c, cx, cy, bt, it, hc, bc, s) {
      this.rows = r;
      this.cols = c;
      this.cx = cx;
      this.cy = cy;
      this.bordert = bt;
      this.insidet = it;
      this.highc = hc;
      this.borderc = bc;
      this.sidelength = s;

      var zero = function() {
        return 0;
      }
      this.plants = fillGrid(this.rows, this.cols, zero);
    }
    
    this.init(rows, columns, centerx, centery, borderthickness, insidethickness, highlightcolor, bordercolor, sidelength);

    this.render = function(mX, mY) {
      var tl = [this.cx - this.cols * this.sidelength / 2, this.cy - this.rows * this.sidelength / 2];
      var tr = [this.cx + this.cols * this.sidelength / 2, this.cy - this.rows * this.sidelength / 2];
      var bl = [this.cx - this.cols * this.sidelength / 2, this.cy + this.rows * this.sidelength / 2];
      var br = [this.cx + this.cols * this.sidelength / 2, this.cy + this.rows * this.sidelength / 2];
      var msx = floor((mX - tl[0]) / this.sidelength);
      var msy = floor((mY - tl[1]) / this.sidelength);

      fill(this.highc);
      strokeWeight(0);
      if(within(msx, msy, 0, 0, this.rows, this.cols)) {
        rect(tl[0] + msx * this.sidelength, tl[1] + msy * this.sidelength, this.sidelength, this.sidelength);
      }


      stroke(this.borderc);
      strokeWeight(this.bordert);

      line(...tl, ...tr);
      line(...tr, ...br);
      line(...br, ...bl);
      line(...bl, ...tl);

      stroke(this.borderc);
      strokeWeight(this.insidet);
      for(var i = 1; i < this.rows; i++) {
        line(tl[0] + i * this.sidelength, tl[1], bl[0] + i * this.sidelength, bl[1]);
      }
      for(var i = 1; i < this.cols; i++) {
        line(tl[0], tl[1] + i * this.sidelength, tr[0], tr[1] + i * this.sidelength);
      }




    }
  }


  box = new Garden(5, 5, W/2, H/2, 5, 2, color(100), color(0), 50);
  console.log(box.plants);


}


function draw() {
  background(40);
  box.render(mouseX, mouseY);
}
