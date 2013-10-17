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
        };
        
    });

   it("draw", function(){

        NuevoSprite= new Sprite();

        spyOn(SpriteSheet, "draw");
 
		    NuevoSprite.draw(ctx)
        	 expect(SpriteSheet.draw).toHaveBeenCalled();

   });


});
