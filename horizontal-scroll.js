function HorizontalSection(options) {

  this.selector = options.selector
  this.sectionContainer = options.sectionContainer
  this.pseudoHeight = options.pseudoHeight
  this.settings = options.settings

  this.init = init
}

function init() {

  const options = this.settings
  const hardOffset = options.hardOffset
  const offsetPercent = options.offsetPercent

  $(window).on('load', () => {
    if ($(window).width() > 768) {
      //get scrollbar width
      $.scrollbarWidth = function () {
        var parent, child, width;

        //skip if already calculated
        if (width === undefined) {
          //create element with scrollbar
          parent = $('<div style="width:50px;height:50px;overflow:auto"><div/></div>').appendTo('body');

          //substract child inner from container
          child = parent.children();
          width = child.innerWidth() - child.height(99).innerWidth();

          //reset html
          parent.remove();
        }

        return width;
      };

      // var dynamicOffset = 20 //set in percent

      let realOffset = offsetPercent ? convertDynamicOffset(offsetPercent) : hardOffset

      // convertDynamicOffset(dynamicOffset) // hardcode in pixels (minimum reccommended: 100)

      const selectorInner = $(this.selector)
      const sectionContainer = $(this.sectionContainer)
      const pseudoHeight = $(this.pseudoHeight)

      $.each(selectorInner, function (i, element) {
        //set properties
        var container = $(element).find(sectionContainer)[0]
        var sectionHeight = $(element).find(pseudoHeight)[0]
        var containerWidth = $(container)[0].scrollWidth
        var barWidth = $.scrollbarWidth()
        
        if (containerWidth > window.innerWidth - barWidth) {
          setTimeout(function() {
            var boundingContainer = $(container)[0].scrollHeight
            $(sectionHeight).css('height', ((containerWidth - (window.innerWidth - barWidth)) + boundingContainer) + (realOffset * 2))
          }, 5);
          setBounds(container, '100vw', '100vh')

          //handle scroll
          $(window).on('scroll', function () {
            if ($(document).scrollTop() >= $(element).offset().top &&
              $(document).scrollTop() <= (($(element).offset().top + containerWidth) - (window.innerWidth - barWidth)) + (realOffset * 2)) {
              container.scrollLeft = ($(document).scrollTop() - $(element).offset().top) - realOffset
              playClass(container, 'play')
            } else if ($(document).scrollTop() < $(element).offset().top) {
              container.scrollLeft = 0
              playClass(container, 'wait')
            } else if ($(document).scrollTop() > ($(element).offset().top + containerWidth) - (window.innerWidth - barWidth)) {
              container.scrollLeft = containerWidth
              playClass(container, 'rest')
            }
          })
        }
      })
    }
  })
}

//set section size
function setBounds(el, w, h) {
  //use scrollbar width to set accurate bounds
  var scrollBWidth = $.scrollbarWidth()
  var thisWidth = `calc(${w} - ${scrollBWidth}px)`
  var thisHeight = h

  if ($(el)[0].scrollWidth < (window.innerWidth - scrollBWidth)) {
    $(el).css({
      'width': 'auto',
      'height': thisHeight,
      'overflow': 'hidden',
    })
  } else {
    $(el).css({
      'width': thisWidth,
      'height': thisHeight,
      'overflow': 'hidden',
    })
  }

}

//apply css to container depending on scroll position
function playClass(el, status) {
  if (status == 'play') {
    $(el).css({
      'position': 'fixed',
      'top': '0',
      'left': '0',
      'bottom': 'auto',
    })
  } else if (status == 'wait') {
    $(el).css({
      'position': 'absolute',
      'top': '0',
      'left': '0',
      'bottom': 'auto',
    })
  } else if (status == 'rest') {
    $(el).css({
      'position': 'absolute',
      'top': 'auto',
      'left': '0',
      'bottom': '0',
    })
  }
}

function convertDynamicOffset(dOffset) {
  var scrollBWidth = $.scrollbarWidth()
  var winWidth = window.innerWidth - scrollBWidth

  var pxOffset = parseInt(winWidth * (dOffset / 100))

  return pxOffset
}

export default HorizontalSection