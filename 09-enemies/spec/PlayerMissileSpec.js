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
});
