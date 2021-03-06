/*


En el anterior prototipo, el objeto Game permite gestionar una pila de
tableros (boards). Los tres campos de estrellas, la pantalla de inicio
y el sprite de la nave del jugador se a�aden como tableros
independientes para que Game pueda ejecutar sus m�todos step() y
draw() peri�dicamente desde su m�todo loop(). Sin embargo los tableros
no pueden interaccionar entre s�. Resulta dif�cil con esta
arquitectura pensar en c�mo podr�a por ejemplo detectarse la colisi�n
de una nave enemiga con la nave del jugador, o c�mo podr�a detectarse
si un disparo de colisiona con una nave.

Este es precisamente el requisito que se ha identificado para este
prototipo: gestionar la interacci�n entre los elementos del
juego. Piensa en esta clase como un tablero de juegos de mesa, sobre
el que se disponen los elementos del juego (fichas, cartas, etc.). En
este caso ser�n naves enemigas, nave del jugador y disparos los
elementos del juego. Para Game, GameBoard ser� un tablero m�s, por lo
que deber� ofrecer los m�todos step() y draw(), y ser� responsable de
mostrar todos los objetos que contenga cuando Game llame a estos
m�todos.



Especificaci�n: GameBoard debe

- mantener una colecci�n de objetos a la que se pueden a�adir y de la
  que se pueden eliminar sprites

- interacci�n con Game: cuando reciba los m�todos step() y draw() debe
  ocuparse de que se ejecuten estos m�todos en todos los objetos que
  contenga.

- debe detectar la colisi�n entre objetos. Querremos que los disparos
  de la nave del jugador detecten cu�ndo colisionan con una nave
  enemiga, que una nave enemiga detecte si colisiona con la nave del
  jugador, que un disparo de la nave enemiga detecte si colisiona con
  la nave del jugador,... necesitamos saber de qu� tipo es cada objeto.


*/
describe("Clase GameBoard", function(){
   
    beforeEach(function(){
        loadFixtures('index.html');

        canvas = $('#game')[0];
        expect(canvas).toExist();

        ctx = canvas.getContext('2d');
        expect(ctx).toBeDefined();
    });

    // add()
    it("add()", function(){
        var miGameBoard = new GameBoard();
        var obj = "nave";
        miGameBoard.add(obj);
        expect(miGameBoard.add(obj)).toEqual("nave");
    });

        // remove()
    it("remove(), resetRemoved, finalizeRemoved", function(){
        var miGameBoard = new GameBoard();
        var obj1 = "nave1";
        var obj2 = "nave2";
        var obj3 = "nave3";
        miGameBoard.add(obj1);
        miGameBoard.add(obj2);
        miGameBoard.add(obj3);

        miGameBoard.resetRemoved();
        miGameBoard.remove(obj2);
        miGameBoard.finalizeRemoved();

        expect(miGameBoard.objects[0]).toEqual("nave1");
        expect(miGameBoard.objects[1]).toEqual("nave3");
        expect(miGameBoard.objects[2]).toEqual(undefined);
    });



   it("interacci�n con Game", function(){
 
        //Creamos dos objetos en la lista
        var board = new GameBoard();
        board.add(new PlayerShip());
        board.add(new PlayerShip());
        expect(board.objects.length).toEqual(2);
        
        //Programamos los spys para cada funci�n de cada objeto
        spyOn(board.objects[1], "step");
        spyOn(board.objects[0], "step");
        spyOn(board.objects[1], "draw");
        spyOn(board.objects[0], "draw");
        
        //Comprobamos que al llamar la funci�n en GameBoard, �sta se ocupa
        //de ejecutar los metodos en cada uno de los objetos de la lista
        var dt = 1;
        board.step(dt);
        expect(board.objects[0].step).toHaveBeenCalled();
        expect(board.objects[1].step).toHaveBeenCalled();
 
        board.draw(ctx);
        expect(board.objects[1].draw).toHaveBeenCalled();
        expect(board.objects[0].draw).toHaveBeenCalled();

    }); 


    it("detect", function(){

			var miNave = new GameBoard();
			var obj = "nave";
	
			miNave.add(obj);
			
			var func = {call: function(){}};
			spyOn(func, "call");
			miNave.detect(func)
			waits(100);
		
			expect(miNave.objects[0]).toBeTruthy();
			expect(miNave.objects[1]).toBeFalsy();

    });

    it("overlap", function(){
		var miNave = new GameBoard();
		var o1 = {x:2,y:2,h:1,w:1};
		var o2 = {x:1,y:1,h:2,w:2};

		miNave.add(o1);
		miNave.add(o2);

		expect(miNave.overlap(o1,o2)).toBeTruthy();	
    });

    it("collide", function(){
		var miNave = new GameBoard();
		miNave.objects = [{type:"1",x:2,y:2,h:1,w:1},{type:"2",x:1,y:1,h:2,w:2}];
		var obj = {x:2,y:2,h:1,w:1};

		expect(miNave.collide(obj,"1")).toEqual(miNave.objects[0]);
    });
 });
