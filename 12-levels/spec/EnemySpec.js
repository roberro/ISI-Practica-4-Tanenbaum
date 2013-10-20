/*

El objetivo de este prototipo es a�adir al juego naves enemigas.


Especificaci�n: 

1. El patr�n de movimiento lo dictan las ecuaciones que se utilizar�n
para calcular las componentes vx e vy de su velocidad.  Los par�metros
de las ecuaciones que definen vx e vy determinan el patr�n de
comportamiento: 

  vx = A + B * sin (C * t + D) 
  vy = E + F * sin (G * t + H)

  siendo t la edad de un enemigo, calculada como el tiempo que ha
  pasado desde que se cre�.

  A: componente constante de la velocidad horizontal
  B: fuerza de la velocidad horizontal sinusoidal
  C: periodo de la velocidad horizontal sinusoidal
  D: desplazamiento en el tiempo de la velocidad horizontal sinusoidal

  E: componente constante de la velocidad vertical
  F: fuerza de la velocidad vertical sinusoidal
  G: periodo de la velocidad vertical sinusoidal
  H: desplazamiento en el tiempo de la velocidad vertical sinusoidal

  Todos estos par�metros tendr�n un valor por defecto de 0 (definido
  en la variable baseParameters en el constructor)


2. Se crear� una nueva clase Enemy. Los enemigos se diferenciar�n s�lo
en su posici�n inicial, en el sprite que utilizan y en el patr�n de
movimiento (A..H), pero todos ser�n de la misma clase.

Para definir diferentes tipos de enemigos se pasar� al constructor una
plantilla con valores para las propiedades (x, y, sprite, A..H).

Para poder definir enemigos parecidos creados a partir de una misma
plantilla, se pasar� un segundo argumento al constructor con valores
alternativos para algunas de las propiedades de la plantilla.


*/
    describe("Clase Enemy", function(){
   
    beforeEach(function(){
        loadFixtures('index.html');

        canvas = $('#game')[0];
        expect(canvas).toExist();

        ctx = canvas.getContext('2d');
        expect(ctx).toBeDefined();
        
        SpriteSheet = {
          map : {missile: { sx: 0, sy: 30, w: 2, h: 10, frames: 1 },
                  ship: { sx: 0, sy: 0, w: 37, h: 42, frames: 1 },
                  enemy_purple: { sx: 37, sy: 0, w: 42, h: 43, frames: 1 },},
          draw: function(){},
        };
        
    });
    
    
   it("draw", function(){ 
        
        NuevoSprite= new Sprite();

        spyOn(SpriteSheet, "draw");
 
		    NuevoSprite.draw(ctx)
        expect(SpriteSheet.draw).toHaveBeenCalled();        
  
   });      
        
   
    it("step", function(){
      
      
      Game = {width: 320, height: 480};
      var baseParameters =  { A: 0, B: 0, C: 0, D: 0, 
                        E: 0, F: 0, G: 0, H: 0 }
      var enemies = {
      
          basic: { x: 100, y: -50, sprite: 'enemy_purple', B: 100, C: 2 , E: 100 }

      };
      
    
			var miEnemigo = new Enemy(enemies.basic);
			Enemigo = {
	   		remove: function(obj) {},
				collide: function(obj) {},
			};

		miEnemigo.board=Enemigo;

		spyOn(Enemigo, "remove");

      
    miEnemigo.step(0.2);
		expect(Enemigo.remove).not.toHaveBeenCalled(); 
		//No lo llama porque aun no se ha salido

        

		miEnemigo.step(7);
		expect(Enemigo.remove).toHaveBeenCalled();
		//Ya ha dado tiempo a que el enemigo salga 
  
    });
});    
        
