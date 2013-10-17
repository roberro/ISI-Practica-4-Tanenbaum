/*

El objetivo de este prototipo es conseguir que la nave del usuario
pueda disparar misiles.



Especificación: 

- Hay que añadir a la clase sprites la especificación del sprite
  missile

- Cada vez que el usuario presione la tecla de espacio se añadirán
  misiles al tablero de juego en la posición en la que esté la nave
  del usuario. En el código de la clase PlayerSip es donde tienen que
  añadirse los misiles

- La clase PlayerMissile es la que implementa los misiles. Es
  importante que la creación de los misiles sea poco costosa pues va a
  haber muchos disparos, para lo cual se declararán los métodos de la
  clase en el prototipo

- La nave del usuario debe tener un tiempo de recarga de las armas de
  0.25 segundos para que no pueda volver a añadir al tablero nuevos
  misiles antes de que haya pasado este tiempo


*/
describe("Clase PlayerMissile", function(){
   var canvas, ctx;

   beforeEach(function(){
	loadFixtures('index.html');

	canvas = $('#game')[0];
	expect(canvas).toExist();

	ctx = canvas.getContext('2d');
	expect(ctx).toBeDefined();

});
    it("draw", function(){
		SpriteSheet = {
		  map : {missile: { sx: 0, sy: 30, w: 2, h: 10, frames: 1 }},
		  draw: function() {}
		};

		var miMissile = new PlayerMissile(1,1);
 
		spyOn(SpriteSheet, "draw");
 
		miMissile.draw(ctx)
	 
		expect(SpriteSheet.draw).toHaveBeenCalled();
		expect(SpriteSheet.draw.calls[0].args[1]).toEqual("missile");
		expect(SpriteSheet.draw.calls[0].args[2]).toEqual(miMissile.x);
		expect(SpriteSheet.draw.calls[0].args[3]).toEqual(miMissile.y);

    });

    it("step", function(){
			var miMissile = new PlayerMissile(1,1);
			misil = {
			   map : {missile: { sx: 0, sy: 30, w: 2, h: 10, frames: 1,vy: -700 }},
	   		remove: function(obj) {}
			};

		miMissile.board=misil;

		spyOn(misil, "remove");

		miMissile.step(1);
		expect(misil.remove).toHaveBeenCalled();
    });
    
     it("disparar",function(){
    Game = {width: 320, height: 480, keys: {'fire': true}};
   
    SpriteSheet = {
      map : {missile: { sx: 0, sy: 30, w: 2, h: 10, frames: 1 },
                ship: { sx: 0, sy: 0, w: 37, h: 42, frames: 1 }},
    };

    var board = new GameBoard();
    var miNave = new PlayerShip();
    board.add(miNave);
   
    //Comprobamos que antes de disparar solo existe la nave en la lista
    //de objetos.
    expect(board.objects.length).toBe(1);
   
    Game = {keys: {'fire': true}};
    var dt = 1;
    board.step(dt);
    
    //Comprobamos que tras el disparo, se crean dos objetos nuevo, que
    //obviamente son los misiles.
    expect(board.objects.length).toBe(3);
 
    //Comprobamos que las coordenadas del primer misil (board.objects[1])
    //con respecto a la posicion de la nave (board.objects[0]) son correctas.
    expect(board.objects[1].x).toBe(board.objects[0].x - board.objects[1].w/2);
    expect(board.objects[1].y).toBe(board.objects[0].y+board.objects[0].h/2- board.objects[1].h);
  
    //Comprobamos que las coordenadas del segundo misil (board.objects[2])
    //con respecto a la posicion de la nave (board.objects[0]) son correctas.
    expect(board.objects[2].x).toBe(board.objects[0].x+board.objects[0].w - board.objects[2].w/2);
    expect(board.objects[2].y).toBe(board.objects[0].y+board.objects[0].h/2- board.objects[2].h);
  });

  it("un disparo por pulsación",function(){
  
    Game = {width: 320, height: 480, keys: {'fire': false}};
   
    SpriteSheet = {
      map : {missile: { sx: 0, sy: 30, w: 2, h: 10, frames: 1 },
                ship: { sx: 0, sy: 0, w: 37, h: 42, frames: 1 }},
    };

    var board = new GameBoard();
    var miNave = new PlayerShip();
    board.add(miNave);
   
    //Comprobamos que antes de disparar solo existe la nave en la lista
    //de objetos.
    expect(board.objects.length).toBe(1);
  
    Game = {keys: {'fire': true}};

    //Comprobamos que si dejamos 'fire' pulsado no se añaden más que una
    //pareja de misiles. dt>realoadTime
    var dt = 0.1;
    board.step(dt);
    board.step(dt);
    board.step(dt);
    board.step(dt);
    expect(board.objects.length).toBe(3);
    
    //Sin embargo si soltamos 'fire' y lo volvemos a pulsar se añade otra
    //pareja de misiles más.
    Game = {keys: {'fire': false}};
    board.step(dt);
    Game = {keys: {'fire': true}};
    board.step(dt);
    expect(board.objects.length).toBe(5);
  });


});
