(function($){
  $.fn.makeGif = function(){
    return this.each(function(index, element){
      let canvas = this,
      context = canvas.getContext('2d'),
      canvasWrapper = $('#canvasWrapper'),
      palette = $('.color'),
      clearBtn = $('.btn-clear'),
      eraserBtn = $('.btn-eraser'),
      sizeBtn = $('input[type=range]'),
      newBtn = $('.btn-new'),
      points = [],
      color = 'darkslategrey',
      state = {
        color: 'darkslategrey',
        size: $(sizeBtn).val()
      },
      paint, mouseX, mouseY;

      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      /* Bind events */
      $(element).on('mousedown', handleMousedown);

      $(element).on('mousemove', handleMousemove);

      $(element).on('mouseup', handleMouseup);

      $(palette).on('click', setColor);

      $(clearBtn).on('click', clear);

      $(eraserBtn).on('click', eraser);

      $(sizeBtn).on('change', setSize);

      $(newBtn).on('click', addNewCanvas);
      /* Bind events */

      function handleMousedown(e){
        mouseX = e.pageX - this.offsetLeft;
        mouseY = e.pageY - this.offsetTop;
        paint = true;
        addClick(mouseX, mouseY);
        redraw();
      }

      function handleMousemove(e){
        if(paint){
          mouseX = e.pageX - this.offsetLeft;
          mouseY = e.pageY - this.offsetTop;
          addClick(mouseX, mouseY, true);
          redraw();
        }
      }

      function handleMouseup(){
        paint = false;
      }

      function addClick(x, y, dragging){
        let pointObj = {};
        pointObj['clickX'] = x;
        pointObj['clickY'] = y;
        pointObj['clickDrag'] = dragging;
        pointObj['state'] = state;
        state = jQuery.extend({}, state);
        points.push(pointObj);
      }

      function setColor(e){
        state['size'] = $(sizeBtn).val();
        state['color'] = color = $(this).attr('data-color');
      }

      function setSize(e){
        state['color'] = color;
        state['size'] = $(this).val();
      }

      function eraser(){
        state['color'] = $(canvas).css('background-color');
        state['size'] = 25;
      }

      function clear(){
        context.clearRect(0, 0, context.canvas.width, context.canvas.height);
        points = [];
        state['color'] = color;
        state['size'] = $(sizeBtn).val();;
      }

      function addNewCanvas(e){
        // TODO: implement adding new canvas 
      }

      function redraw(){
        for(let i=0; i < points.length; i++) {
          context.lineJoin = "round";
          context.beginPath();
          if(points[i].clickDrag && i){
            context.moveTo(points[i-1].clickX, points[i-1].clickY);
           }else{
             context.moveTo(points[i].clickX, points[i].clickY);
           }
           context.lineTo(points[i].clickX-1, points[i].clickY);
           context.closePath();
           context.strokeStyle = points[i]['state']['color'];
           context.lineWidth = points[i]['state']['size'];
           context.stroke();
        }

      }

    });
  }
})(jQuery);

$(document).ready(function(){
  'use strict';
  let $canvas = $('canvas'),
    btnClose = $('#btnClose'),
    btnOpen = $('#btnOpen'),
    sidebar = $('#sidebar'),
    slider = $(".slider");

  $(slider).slider();

  $(btnOpen).on('click', openHandler);

  $(btnClose).on('click', closeHandler);

  function openHandler(){
    $(sidebar).css('width', 340);
    $(btnClose).css('display', 'inline-block');
  }

  function closeHandler(){
    $(sidebar).css('width', 0);
    $(btnClose).css('display', 'none');
  }

  $canvas.makeGif();
});

(function($){
  $.fn.slider = function(){
    let currentSlide = 0,
      slider = this,
      slides = $('canvas'),
      nextButton = $('.direction'),
      timer;

    $(nextButton).on('click', showNextSlide);

    function showNextSlide(){
      let element = this;
      clearTimeout(timer);
      if($(element).hasClass("right")){
        if($(slides).length - 1 === currentSlide){ return; }
        timer = setTimeout(() => {
          $(slides).eq(currentSlide).css('display', 'none');
          $(slides).eq(++currentSlide).css('display', 'block');
        }, 500);
      }else{
        if(currentSlide === 0){ return; }
        timer = setTimeout(() => {
            $(slides).eq(currentSlide).css('display', 'none');
            $(slides).eq(--currentSlide).css('display', 'block');
        }, 500);
      }
    }
  }
})(jQuery);
