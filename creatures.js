(function(){
  'use strict';
  var classes = function(){
    var tmp$0 = Kotlin.createClass({initialize:function(canvas){
      this.$canvas = canvas;
      this.$width = this.get_canvas().width;
      this.$height = this.get_canvas().height;
      this.$context = creatures.get_context();
      this.$valid = false;
      this.$shapes = new Kotlin.ArrayList;
      this.$selection = null;
      this.$dragOff = new creatures.Vector(0, 0);
      this.$interval = 1000 / 30;
      {
        var tmp$0_0;
        $(this.get_canvas()).mousedown((tmp$0_0 = this , function(it){
          {
            tmp$0_0.set_valid(false);
            tmp$0_0.set_selection(null);
            var mousePos = tmp$0_0.mousePos_0(it);
            var tmp$0;
            {
              tmp$0 = tmp$0_0.get_shapes().iterator();
              while (tmp$0.get_hasNext()) {
                var shape = tmp$0.next();
                {
                  if (shape.contains(mousePos)) {
                    tmp$0_0.set_dragOff(mousePos.minus(shape.get_pos()));
                    shape.set_selected(true);
                    tmp$0_0.set_selection(shape);
                    break;
                  }
                }
              }
            }
          }
        }
        ));
        var tmp$1;
        $(this.get_canvas()).mousemove((tmp$1 = this , function(it){
          {
            if (tmp$1.get_selection() != null) {
              (tmp$1.get_selection() != null?tmp$1.get_selection():Kotlin.throwNPE()).set_pos(tmp$1.mousePos_0(it).minus(tmp$1.get_dragOff()));
              tmp$1.set_valid(false);
            }
          }
        }
        ));
        var tmp$2;
        $(this.get_canvas()).mouseup((tmp$2 = this , function(it){
          {
            if (tmp$2.get_selection() != null) {
              (tmp$2.get_selection() != null?tmp$2.get_selection():Kotlin.throwNPE()).set_selected(false);
            }
            tmp$2.set_selection(null);
            tmp$2.set_valid(false);
          }
        }
        ));
        var tmp$3;
        $(this.get_canvas()).dblclick((tmp$3 = this , function(it){
          {
            var newCreature = new creatures.Creature(tmp$3.mousePos_0(it), tmp$3);
            tmp$3.addShape(newCreature);
            tmp$3.set_valid(false);
          }
        }
        ));
        var tmp$4;
        window.setInterval((tmp$4 = this , function(){
          {
            tmp$4.draw();
          }
        }
        ), this.get_interval());
      }
    }
    , get_canvas:function(){
      return this.$canvas;
    }
    , get_width:function(){
      return this.$width;
    }
    , set_width:function(tmp$0){
      this.$width = tmp$0;
    }
    , get_height:function(){
      return this.$height;
    }
    , set_height:function(tmp$0){
      this.$height = tmp$0;
    }
    , get_size:function(){
      {
        return creatures.v(this.get_width(), this.get_height());
      }
    }
    , get_context:function(){
      return this.$context;
    }
    , get_valid:function(){
      return this.$valid;
    }
    , set_valid:function(tmp$0){
      this.$valid = tmp$0;
    }
    , get_shapes:function(){
      return this.$shapes;
    }
    , set_shapes:function(tmp$0){
      this.$shapes = tmp$0;
    }
    , get_selection:function(){
      return this.$selection;
    }
    , set_selection:function(tmp$0){
      this.$selection = tmp$0;
    }
    , get_dragOff:function(){
      return this.$dragOff;
    }
    , set_dragOff:function(tmp$0){
      this.$dragOff = tmp$0;
    }
    , get_interval:function(){
      return this.$interval;
    }
    , mousePos_0:function(e){
      {
        var offset = new creatures.Vector(0, 0);
        var element = this.get_canvas();
        while (element != null) {
          var el = element != null?element:Kotlin.throwNPE();
          offset = offset.plus(new creatures.Vector(el.offsetLeft, el.offsetTop));
          element = el.offsetParent;
        }
        return (new creatures.Vector(e.pageX, e.pageY)).minus(offset);
      }
    }
    , addShape:function(shape){
      {
        this.get_shapes().add(shape);
        this.set_valid(false);
      }
    }
    , clear:function(){
      {
        this.get_context().fillStyle = '#FFFFFF';
        this.get_context().fillRect(0, 0, this.get_width(), this.get_height());
        this.get_context().strokeStyle = '#000000';
        this.get_context().lineWidth = 4;
        this.get_context().strokeRect(0, 0, this.get_width(), this.get_height());
      }
    }
    , draw:function(){
      {
        if (this.get_valid())
          return;
        this.clear();
        var tmp$0;
        {
          tmp$0 = creatures.reversed(this.get_shapes()).iterator();
          while (tmp$0.get_hasNext()) {
            var shape = tmp$0.next();
            {
              shape.draw(this);
            }
          }
        }
        creatures.get_Kotlin().draw(this);
        this.set_valid(true);
      }
    }
    });
    var tmp$1 = Kotlin.createClass({initialize:function(){
      this.$selected = false;
    }
    , draw:function(state){
    }
    , contains:function(mousePos){
    }
    , get_pos:function(){
      return this.$pos_0;
    }
    , set_pos:function(tmp$0){
      this.$pos_0 = tmp$0;
    }
    , get_selected:function(){
      return this.$selected;
    }
    , set_selected:function(tmp$0){
      this.$selected = tmp$0;
    }
    , shadowed:function(receiver, shadowOffset, alpha, render){
      {
        receiver.save();
        receiver.shadowColor = 'rgba(100, 100, 100, ' + alpha + ')';
        receiver.shadowBlur = 5;
        receiver.shadowOffsetX = shadowOffset.get_x();
        receiver.shadowOffsetY = shadowOffset.get_y();
        render.call(receiver);
        receiver.restore();
      }
    }
    , fillPath:function(receiver, constructPath){
      {
        receiver.beginPath();
        constructPath.call(receiver);
        receiver.closePath();
        receiver.fill();
      }
    }
    });
    var tmp$2 = Kotlin.createClass(tmp$1, {initialize:function(pos, state){
      this.$pos = pos;
      this.$state = state;
      this.super_init();
      this.$shadowOffset = creatures.v(-5, 5);
      this.$colorStops = (creatures.get_gradientGenerator() != null?creatures.get_gradientGenerator():Kotlin.throwNPE()).getNext();
      this.$relSize = 0.05;
    }
    , get_pos:function(){
      return this.$pos;
    }
    , set_pos:function(tmp$0){
      this.$pos = tmp$0;
    }
    , get_state:function(){
      return this.$state;
    }
    , get_shadowOffset:function(){
      return this.$shadowOffset;
    }
    , get_colorStops:function(){
      return this.$colorStops;
    }
    , get_relSize:function(){
      return this.$relSize;
    }
    , get_radius:function(){
      {
        return this.get_state().get_width() * this.get_relSize();
      }
    }
    , get_position:function(){
      var tmp$0;
      if (this.get_selected())
        tmp$0 = this.get_pos().minus(this.get_shadowOffset());
      else 
        tmp$0 = this.get_pos();
      {
        return tmp$0;
      }
    }
    , get_directionToLogo:function(){
      {
        return creatures.get_Kotlin().get_centre().minus(this.get_position()).get_normalized();
      }
    }
    , contains:function(mousePos){
      {
        return this.get_pos().distanceTo(mousePos) < this.get_radius();
      }
    }
    , circlePath:function(receiver, position, rad){
      {
        receiver.arc(position.get_x(), position.get_y(), rad, 0, 2 * Math.PI, false);
      }
    }
    , fillCircle:function(receiver, position, rad){
      {
        var tmp$0;
        this.fillPath(receiver, (tmp$0 = this , function(){
          {
            tmp$0.circlePath(receiver, position, rad);
          }
        }
        ));
      }
    }
    , draw:function(state){
      {
        var context = state.get_context();
        if (!this.get_selected()) {
          this.drawCreature(context);
        }
         else {
          this.drawCreatureWithShadow(context);
        }
      }
    }
    , drawCreature:function(context){
      {
        context.fillStyle = this.getGradient(context);
        var tmp$0;
        this.fillPath(context, (tmp$0 = this , function(){
          {
            tmp$0.tailPath(context);
            tmp$0.circlePath(this, tmp$0.get_position(), tmp$0.get_radius());
          }
        }
        ));
        this.drawEye(context);
      }
    }
    , getGradient:function(context){
      {
        var gradientCentre = this.get_position().plus(this.get_directionToLogo().times(this.get_radius() / 4));
        var gradient = context.createRadialGradient(gradientCentre.get_x(), gradientCentre.get_y(), 1, gradientCentre.get_x(), gradientCentre.get_y(), 2 * this.get_radius()) != null?context.createRadialGradient(gradientCentre.get_x(), gradientCentre.get_y(), 1, gradientCentre.get_x(), gradientCentre.get_y(), 2 * this.get_radius()):Kotlin.throwNPE();
        var tmp$0;
        var tmp$1;
        var tmp$2;
        {
          tmp$0 = this.get_colorStops() , tmp$1 = tmp$0.length;
          for (var tmp$2 = 0; tmp$2 != tmp$1; ++tmp$2) {
            var colorStop = tmp$0[tmp$2];
            {
              gradient.addColorStop(colorStop[0], colorStop[1]);
            }
          }
        }
        return gradient;
      }
    }
    , tailPath:function(context){
      {
        var tailDirection = this.get_directionToLogo().minus$0();
        var tailPos = this.get_position().plus(tailDirection.times(this.get_radius()).times(1));
        var tailSize = this.get_radius() * 1.6;
        var angle = Math.PI / 6;
        var p1 = tailPos.plus(tailDirection.rotatedBy(angle).times(tailSize));
        var p2 = tailPos.plus(tailDirection.rotatedBy(-angle).times(tailSize));
        var middlePoint = this.get_position().plus(tailDirection.times(this.get_radius()).times(1));
        context.moveTo(tailPos.get_x(), tailPos.get_y());
        context.lineTo(p1.get_x(), p1.get_y());
        context.quadraticCurveTo(middlePoint.get_x(), middlePoint.get_y(), p2.get_x(), p2.get_y());
        context.lineTo(tailPos.get_x(), tailPos.get_y());
      }
    }
    , drawEye:function(context){
      {
        var eyePos = this.get_directionToLogo().times(this.get_radius()).times(0.6).plus(this.get_position());
        var eyeRadius = this.get_radius() / 3;
        var eyeLidRadius = eyeRadius / 2;
        context.fillStyle = '#FFFFFF';
        this.fillCircle(context, eyePos, eyeRadius);
        context.fillStyle = '#000000';
        this.fillCircle(context, eyePos, eyeLidRadius);
      }
    }
    , drawCreatureWithShadow:function(context){
      {
        var tmp$0_0;
        this.shadowed(context, this.get_shadowOffset(), 0.7, (tmp$0_0 = this , function(){
          {
            context.fillStyle = tmp$0_0.getGradient(context);
            var tmp$0;
            tmp$0_0.fillPath(this, (tmp$0 = tmp$0_0 , function(){
              {
                tmp$0.tailPath(context);
                tmp$0.circlePath(context, tmp$0.get_position(), tmp$0.get_radius());
              }
            }
            ));
          }
        }
        ));
        this.drawEye(context);
      }
    }
    });
    var tmp$3 = Kotlin.createClass(tmp$1, {initialize:function(pos){
      this.$pos = pos;
      this.super_init();
      this.$relSize = 0.25;
      this.$shadowOffset = creatures.v(-3, 3);
      this.$imageSize = creatures.v(377, 393);
      this.$size = this.get_imageSize().times(this.get_relSize());
    }
    , get_pos:function(){
      return this.$pos;
    }
    , set_pos:function(tmp$0){
      this.$pos = tmp$0;
    }
    , get_relSize:function(){
      return this.$relSize;
    }
    , get_shadowOffset:function(){
      return this.$shadowOffset;
    }
    , get_imageSize:function(){
      return this.$imageSize;
    }
    , get_size:function(){
      return this.$size;
    }
    , set_size:function(tmp$0){
      this.$size = tmp$0;
    }
    , get_position:function(){
      var tmp$0;
      if (this.get_selected())
        tmp$0 = this.get_pos().minus(this.get_shadowOffset());
      else 
        tmp$0 = this.get_pos();
      {
        return tmp$0;
      }
    }
    , drawLogo:function(state){
      {
        this.set_size(this.get_imageSize().times(state.get_size().get_x() / this.get_imageSize().get_x()).times(this.get_relSize()));
        state.get_context().drawImage(creatures.loadImage('http://kotlin-demo.jetbrains.com/static/images/kotlinlogowobackground.png'), 0, 0, this.get_imageSize().get_x(), this.get_imageSize().get_y(), this.get_position().get_x(), this.get_position().get_y(), this.get_size().get_x(), this.get_size().get_y());
      }
    }
    , draw:function(state){
      {
        var context = state.get_context();
        if (this.get_selected()) {
          var tmp$0;
          this.shadowed(context, this.get_shadowOffset(), 0.2, (tmp$0 = this , function(){
            {
              tmp$0.drawLogo(state);
            }
          }
          ));
        }
         else {
          this.drawLogo(state);
        }
      }
    }
    , contains:function(mousePos){
      {
        return mousePos.isInRect(this.get_pos(), this.get_size());
      }
    }
    , get_centre:function(){
      {
        return this.get_pos().plus(this.get_size().times(0.5));
      }
    }
    });
    var tmp$4 = Kotlin.createClass({initialize:function(x, y){
      this.$x = x;
      this.$y = y;
    }
    , get_x:function(){
      return this.$x;
    }
    , get_y:function(){
      return this.$y;
    }
    , plus:function(v){
      {
        return creatures.v(this.get_x() + v.get_x(), this.get_y() + v.get_y());
      }
    }
    , minus$0:function(){
      {
        return creatures.v(-this.get_x(), -this.get_y());
      }
    }
    , minus:function(v){
      {
        return creatures.v(this.get_x() - v.get_x(), this.get_y() - v.get_y());
      }
    }
    , times:function(koef){
      {
        return creatures.v(this.get_x() * koef, this.get_y() * koef);
      }
    }
    , distanceTo:function(v){
      {
        return Math.sqrt(this.minus(v).get_sqr());
      }
    }
    , rotatedBy:function(theta){
      {
        var sin = Math.sin(theta);
        var cos = Math.cos(theta);
        return creatures.v(this.get_x() * cos - this.get_y() * sin, this.get_x() * sin + this.get_y() * cos);
      }
    }
    , isInRect:function(topLeft, size){
      {
        return (new Kotlin.NumberRange(topLeft.get_x(), topLeft.get_x() + size.get_x() - topLeft.get_x() + 1, false)).contains(this.get_x()) && (new Kotlin.NumberRange(topLeft.get_y(), topLeft.get_y() + size.get_y() - topLeft.get_y() + 1, false)).contains(this.get_y());
      }
    }
    , get_sqr:function(){
      {
        return this.get_x() * this.get_x() + this.get_y() * this.get_y();
      }
    }
    , get_normalized:function(){
      {
        return this.times(1 / Math.sqrt(this.get_sqr()));
      }
    }
    });
    var tmp$5 = Kotlin.createClass({initialize:function(context){
      this.$context = context;
      this.$gradients = new Kotlin.ArrayList;
      this.$current = 0;
      {
        this.newColorStops([[0, '#F59898'], [0.5, '#F57373'], [1, '#DB6B6B']]);
        this.newColorStops([[0.39, 'rgb(140,167,209)'], [0.7, 'rgb(104,139,209)'], [0.85, 'rgb(67,122,217)']]);
        this.newColorStops([[0, 'rgb(255,222,255)'], [0.5, 'rgb(255,185,222)'], [1, 'rgb(230,154,185)']]);
        this.newColorStops([[0, 'rgb(255,209,114)'], [0.5, 'rgb(255,174,81)'], [1, 'rgb(241,145,54)']]);
        this.newColorStops([[0, 'rgb(132,240,135)'], [0.5, 'rgb(91,240,96)'], [1, 'rgb(27,245,41)']]);
        this.newColorStops([[0, 'rgb(250,147,250)'], [0.5, 'rgb(255,80,255)'], [1, 'rgb(250,0,217)']]);
      }
    }
    , get_context:function(){
      return this.$context;
    }
    , get_gradients:function(){
      return this.$gradients;
    }
    , get_current:function(){
      return this.$current;
    }
    , set_current:function(tmp$0){
      this.$current = tmp$0;
    }
    , newColorStops:function(colorStops){
      {
        this.get_gradients().add(colorStops);
      }
    }
    , getNext:function(){
      {
        var result = this.get_gradients().get(this.get_current());
        this.set_current((this.get_current() + 1) % this.get_gradients().size());
        return result;
      }
    }
    });
    return {RadialGradientGenerator:tmp$5, Shape:tmp$1, Creature:tmp$2, Logo:tmp$3, Vector:tmp$4, CanvasState:tmp$0};
  }
  ();
  var kotlin = Kotlin.createNamespace({initialize:function(){
  }
  , set:function(receiver, key, value){
    {
      return receiver.put(key, value);
    }
  }
  }, {browser:Kotlin.createNamespace({initialize:function(){
  }
  }, {})});
  Kotlin.defs.kotlin = kotlin;
  var creatures = Kotlin.createNamespace({initialize:function(){
    this.$Kotlin = new creatures.Logo(creatures.v(250, 75));
    this.$gradientGenerator = null;
  }
  , get_Kotlin:function(){
    return this.$Kotlin;
  }
  , loadImage:function(path){
    {
      var image = window.document.createElement('img');
      image.src = path;
      return image;
    }
  }
  , v:function(x, y){
    {
      return new creatures.Vector(x, y);
    }
  }
  , get_canvas:function(){
    {
      return window.document.getElementsByTagName('canvas').item(0) != null?window.document.getElementsByTagName('canvas').item(0):Kotlin.throwNPE();
    }
  }
  , get_context:function(){
    {
      return creatures.get_canvas().getContext('2d') != null?creatures.get_canvas().getContext('2d'):Kotlin.throwNPE();
    }
  }
  , get_gradientGenerator:function(){
    {
      if (this.$gradientGenerator == null) {
        this.$gradientGenerator = new creatures.RadialGradientGenerator(creatures.get_context());
      }
      return this.$gradientGenerator;
    }
  }
  , main:function(args){
    {
      $(function(){
        {
          var state = new creatures.CanvasState(creatures.get_canvas());
          state.addShape(creatures.get_Kotlin());
          state.addShape(new creatures.Creature(state.get_size().times(0.25), state));
          state.addShape(new creatures.Creature(state.get_size().times(0.75), state));
          window.setTimeout(function(state){
            return function(){
              {
                state.set_valid(false);
              }
            }
            ;
          }
          (state), 1000);
        }
      }
      );
    }
  }
  , reversed:function(receiver){
    {
      var result = new Kotlin.ArrayList;
      var i = receiver.size();
      while (i > 0) {
        result.add(receiver.get(--i));
      }
      return result;
    }
  }
  }, {Logo:classes.Logo, RadialGradientGenerator:classes.RadialGradientGenerator, Vector:classes.Vector, Shape:classes.Shape, CanvasState:classes.CanvasState, Creature:classes.Creature});
  Kotlin.defs.creatures = creatures;
  kotlin.initialize();
  creatures.initialize();
}
)();

