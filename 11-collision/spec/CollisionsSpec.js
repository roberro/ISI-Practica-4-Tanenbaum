describe("Clase CollisionsSpec", function(){
   var canvas, ctx;

   beforeEach(function(){
	loadFixtures('index.html');

	canvas = $('#game')[0];
	expect(canvas).toExist();

	ctx = canvas.getContext('2d');
	expect(ctx).toBeDefined();

  });
   

  it("Da�o del misil igual vida de la nave",function(){

	SpriteSheet.map = { missile: {h:10, w:2},
                            enemy_purple: { sx: 37, sy: 0, w: 42, h: 43, frames: 1 },
                            explosion: { sx: 0, sy: 64, w: 64, h: 64, frames: 12 },
        };

        var board = new GameBoard();
	var dt= 30/10000;
	
	var enemy = new Enemy(enemies.basic);
        enemy.x = 5;
        enemy.y = 5;
        enemy.health = 10;

        var missile = new PlayerMissile(5,5);
        missile.x = 5;
        missile.y = 5;
        missile.damage = 10;
        
	board.add(enemy);
        board.add(missile);
        
	//Comprobamos que antes de la colision hay dos objetos
	expect(board.objects.length).toBe(2);

        board.step(dt);

	//Comprobamos que cuando colisionan aparece solo un objeto(explosion)
	expect(board.objects[0].sprite).toBe('explosion');
        expect(board.objects.length).toBe(1);
        

  });

  it("Da�o del misil inferior vida de la nave",function(){
	SpriteSheet.map = { missile: {h:10, w:2},
                            enemy_purple: { sx: 37, sy: 0, w: 42, h: 43, frames: 1 },
                            explosion: { sx: 0, sy: 64, w: 64, h: 64, frames: 12 },
        };

        var board = new GameBoard();
	var dt= 30/10000;

	var enemy = new Enemy(enemies.basic);
        enemy.x = 5;
        enemy.y = 5;
        enemy.health = 20;
	
        var missile = new PlayerMissile(5,5);
        missile.x = 5;
        missile.y = 5;
        missile.damage = 10;

	board.add(enemy);
        board.add(missile);
         
	//Comprobamos que antes de la colision hay dos objetos
	expect(board.objects.length).toBe(2);

        board.step(dt);

	//Comprobamos que la vida del enemigo se ha reducido de 20 a 10
	expect(enemy.health).toBe(10);

	//Comprobamos que despues de la colision los misiles desaparecen y queda solo el enemigo
	expect(board.objects[0]).toBe(enemy);
        expect(board.objects.length).toBe(1);
        
        
  });

  it("FireBall destruye enemigo", function() {
  	SpriteSheet = {
        		map : {enemy_purple: { sx: 37, sy: 0, w: 42, h: 43, frames: 1 },
                               fireball: { sx: 0, sy: 64, w: 64, h: 64, frames: 1 },
                               explosion: { sx: 0, sy: 64, w: 64, h: 64, frames: 12 }
			}
        };
	
	var board = new GameBoard();
	var dt= 30/10000;

	var enemy = new Enemy(enemies.basic);
        enemy.x=2;
        enemy.y=4;

        var fireBall = new FireBallB(2,4);
        fireBall.x=2;
        fireBall.y=4;

	board.add(enemy);
        board.add(fireBall);
        
        //Comprobamos que antes de la colision hay dos objetos
	expect(board.objects.length).toBe(2);
      
        board.step(dt);

	//Comprobamos que tras la colision se produce una explosion y desaparece la nave enemiga
	expect(board.objects[1].sprite).toBe('explosion');
	
	//Comprobamos que existen 2 objetos la explosion y la bola de fuego
        expect(board.objects.length).toBe(2);
        expect(board.objects[0]).toBe(fireBall);
        

  });
        
  it("Enemigo destruye miNave", function() {
  	SpriteSheet = {
        		map : {enemy_purple: { sx: 37, sy: 0, w: 42, h: 43, frames: 1 },
                               ship: { sx: 0, sy: 0, w: 37, h: 42, frames: 1 },
                               explosion: { sx: 0, sy: 64, w: 64, h: 64, frames: 12 }
		      }
        };

	var board = new GameBoard();
	var dt= 30/10000;

	var enemy = new Enemy(enemies.basic);
        enemy.x=1;
        enemy.y=2;

        var miNave = new PlayerShip();
        miNave.x=1;
        miNave.y=2;
                
	board.add(enemy);
        board.add(miNave);
        
	//Comprobamos que antes de la colision hay dos objetos
	expect(board.objects.length).toBe(2);

        board.step(dt);
	
	//Comprobamos que tras la colision desaparecen las dos naves y no existe ningun objeto
        expect(board.objects.length).toBe(0);
  });

});
/*

  Requisitos:

  El objetivo de este prototipo es que se detecten colisiones entre
  varios tipos de sprites:
  
  - Los misiles tienen ahora una nueva propiedad: el da�o (damage) que
    producen cuando colisionan con una nave enemiga. Cuando un misil
    colisione con una nave enemiga le infligir� un da�o de cierta
    cuant�a a la nave enemiga con la que impacta, y desaparecer�.

  - Las naves enemigas tienen ahora una nueva propiedad: su salud
    (health).  El da�o ocasionado a una nave enemiga por un misil har�
    que disminuya la salud de la nave enemiga, y cuando llegue a cero,
    la nave enemiga desaparecer�.

  - cuando una nave enemiga colisione con la nave del jugador, deber�
    desaparecer tanto la nave enemiga como la nave del jugador.



  Especificaci�n:

  En el prototipo 07-gameboard se a�adi� el constructor GameBoard. El
  m�todo overlap() de los objetos creados con GameBoard() ofrece
  funcionalidad para comprobar si los rect�ngulos que circunscriben a
  los sprites que se le pasan como par�metros tienen intersecci�n no
  nula. El m�todo collide() de GameBoard utiliza overlap() para
  detectar si el objeto que se le pasa como primer par�metro ha
  colisionado con alg�n objeto del tipo que se le pasa como segundo
  par�metro.

  En este prototipo se utilizar� el m�todo collide() para detectar los
  siguientes tipos de colisiones:

    a) detectar si un misil disparado por la nave del jugador
       colisiona con una nave enemiga

    b) detectar si una nave enemiga colisiona con la nave del jugador


  En el m�todo step() de los objetos creados con PlayerMissile() y
  Enemy(), tras "moverse" a su nueva posici�n calculada, se comprobar�
  si han colisionado con alg�n objeto del tipo correspondiente. 

  No interesa comprobar si se colisiona con cualquier otro objeto,
  sino s�lo con los de ciertos tipos. El misil tiene que comprobar si
  colisiona con enemigos. El enemigo tiene que comprobar si colisiona
  con la nave del jugador. Para ello cada sprite tiene un tipo y
  cuando se comprueba si un sprite ha colisionado con otros, se pasa
  como segundo argumento a collide() el tipo de sprites con los que se
  quiere ver si ha colisionado el objeto que se pasa como primer
  argumento.

  Cuando un objeto detecta que ha colisionado con otro llama al m�todo
  hit() del objeto con el que ha colisionado. El misil cuando llama a
  hit() de una nave enemiga pasa como par�metro el da�o que provoca
  para que la nave enemiga pueda calcular la reducci�n de salud que
  conlleva la colisi�n.


  Efectos de las colisiones:

  Cuando una nave enemiga recibe la llamada .hit() realizada por un
  misil que ha detectado la colisi�n, recalcula su salud reduci�ndola
  en tantas unidades como el da�o del misil indique, y si su salud
  llega a 0 desaparece del tablero de juegos, produci�ndose en su
  lugar la animaci�n de una explosi�n.

  Cuando la nave del jugador recibe la llamada .hit() realizada por
  una nave enemiga que ha detectado la colisi�n, desaparece.

  El misil, tras informar llamando al m�tod hit() de la nave enemiga
  con la que ha detectado colisi�n, desaparece.

  La nave enemiga, tras informar llamando a hit() de la nave del
  jugador, desaparece.

*/
