describe("Clase FireBall", function(){
   var canvas, ctx;

   beforeEach(function(){
	loadFixtures('index.html');

	canvas = $('#game')[0];
	expect(canvas).toExist();

	ctx = canvas.getContext('2d');
	expect(ctx).toBeDefined();

  });
    //Bolas de fuego
  it("bola de fuego",function(){
    Game = {width: 320, height: 480, keys: {'fireB': true}};
   
    SpriteSheet = {
      map : {explosion: { sx: 0, sy: 30, w: 2, h: 10, frames: 1 },
                ship: { sx: 0, sy: 0, w: 37, h: 42, frames: 1 }},
    };

    var board = new GameBoard();
    var miNave = new PlayerShip();
    board.add(miNave);
   
    //Comprobamos que antes de disparar solo existe la nave en la lista
    //de objetos.
    expect(board.objects.length).toBe(1);
   
    Game = {keys: {'fireB': true}};
    var dt = 1;
    board.step(dt);
    
    //Comprobamos que tras el disparo, se crea 1 objetos nuevo
    expect(board.objects.length).toBe(2);
 
    //Comprobamos que las coordenadas del primer misil (board.objects[1])
    //con respecto a la posicion de la nave (board.objects[0]) son correctas.

    expect(board.objects[1].x).toBe(board.objects[0].x+board.objects[0].w - board.objects[1].w/2);
    expect(board.objects[1].y).toBe(board.objects[0].y+board.objects[0].h/2 - board.objects[1].h);
  
  
  });
});
