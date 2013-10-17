describe("Clase SpriteSpec", function(){
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
			 merge: function(){},
			 setup: function(){},
        };
        
    });

   it("draw", function(){

        NuevoSprite= new Sprite();

        spyOn(SpriteSheet, "draw");
 
		    NuevoSprite.draw(ctx)
        	 expect(SpriteSheet.draw).toHaveBeenCalled();

   });

   it("setup", function(){

        var board = new GameBoard();
        enemigo= new Enemy(enemies.basic);
        board.add(enemigo);
        board.add(new Enemy(enemies.basic, { x: 200 }));
        expect(board.objects.length).toEqual(2);   
        
			spyOn(enemigo, "merge");

		    enemigo.setup(enemies.basic.sprite)
       	 expect(enemigo.merge).toHaveBeenCalled();

   });

});
