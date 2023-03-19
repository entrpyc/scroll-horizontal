function HorizontalSection(options: any) {

  this.selector = options.selector ? options.selector : '.section-horizontal-scroll'
  this.wrapper = options.wrapper ? options.wrapper : '.scroll-wrapper',
  this.sectionContainer = options.sectionContainer ? options.sectionContainer : '.section-container'
  this.pseudoHeight = options.pseudoHeight ? options.pseudoHeight : false
  this.settings = options.settings

  this.init = init
}

function init() {

  const options = this.settings
  const offsetScroll = options.offsetScroll
  const offsetPercent = options.offsetPercent
  const disableAfter =  options.disableAfter ? window.innerWidth < options.disableAfter : true
  const disableBefore = options.disableBefore ? window.innerWidth > options.disableBefore : true

  document.getElementsByTagName('body')[0].style.margin = '0'
  
  window.onload = () => {
    if (disableAfter && disableBefore) {  
      // var dynamicOffset = 20 //set in percent
      
      let realOffset = offsetPercent ? convertDynamicOffset(offsetPercent) : offsetScroll
      
      // convertDynamicOffset(dynamicOffset) // hardcode in pixels (minimum reccommended: 100)
      
      const selectorInner = document.querySelectorAll(this.selector)
      
      
      selectorInner.forEach((element) => {
        //set properties
        var container = element.querySelector(this.sectionContainer)
        var containerWidth = container.scrollWidth
        var sectionHeight = this.pseudoHeight ? element.querySelector(this.pseudoHeight) : element.querySelector(createPseudoHeight(element, this.wrapper)) 
        var barWidth = scrollbarWidth()
        
        element.style.overflowX = 'hidden'
        element.style.position = 'relative'
        element.querySelector(this.wrapper).style.position = 'relative'

        if (containerWidth > window.innerWidth - barWidth) {
          setTimeout(function() {
            var boundingContainer = container.scrollHeight
            sectionHeight.style.height = ((containerWidth - (window.innerWidth - barWidth)) + boundingContainer) + (realOffset * 2) + 'px'
          }, 5);
          setBounds(container, '100vw', '100vh')

          const documentBody = document.getElementsByTagName('body')
  
          //handle scroll
          window.addEventListener('scroll', function() {
            if (documentScrollTop() >= element.offsetTop &&
              documentScrollTop() <= ((element.offsetTop + containerWidth) - (window.innerWidth - barWidth)) + (realOffset * 2)) {
              container.scrollLeft = (documentScrollTop() - element.offsetTop) - realOffset
              playClass(container, 'play')
            } else if (documentScrollTop() < element.offsetTop) {
              container.scrollLeft = 0
              playClass(container, 'wait')
            } else if (documentScrollTop() > (element.offsetTop + containerWidth) - (window.innerWidth - barWidth)) {
              container.scrollLeft = containerWidth
              playClass(container, 'rest')
            }
          })
        }
      })
    }
  }
}

function documentScrollTop() {
  var supportPageOffset = window.pageXOffset !== undefined;
  var isCSS1Compat = ((document.compatMode || '') === 'CSS1Compat');

  return supportPageOffset ? window.pageYOffset : isCSS1Compat ? document.documentElement.scrollTop : document.body.scrollTop;
}

//set section size
function setBounds(el, w, h) {
  //use scrollbar width to set accurate bounds
  var scrollBWidth = scrollbarWidth()
  var thisWidth = `calc(${w} - ${scrollBWidth}px)`
  var thisHeight = h

  if (el.scrollWidth < (window.innerWidth - scrollBWidth)) {
    el.style.width = 'auto'
    el.style.height = thisHeight
    el.style.overflow = 'hidden'
  } else {
    el.style.width = thisWidth
    el.style.height = thisHeight
    el.style.overflow = 'hidden'
  }

}

function styleApply(el, position, top, left, bottom) {
  el.style.position = position
  el.style.top = top
  el.style.left = left
  el.style.bottom = bottom
}

//apply css to container depending on scroll position
function playClass(el, status) {
  if (status == 'play') {
    styleApply(el, 'fixed', '0', '0', 'auto')
  } else if (status == 'wait') {
    styleApply(el, 'absolute', '0', '0', 'auto')
  } else if (status == 'rest') {
    styleApply(el, 'absolute', 'auto', '0', '0')
  }
}

function createPseudoHeight(main, wrapper) {
  let node = document.createElement('div')
  node.className = 'pseudoHeight'
  main.querySelector(wrapper).appendChild(node)

  console.log(node)

  return '.pseudoHeight'
}

function convertDynamicOffset(dOffset) {
  var scrollBWidth = scrollbarWidth()
  var winWidth = window.innerWidth - scrollBWidth

  var pxOffset = winWidth * (dOffset / 100)

  return pxOffset
}

//get scrollbar width
function scrollbarWidth() {
  var scrollbarWidth, width;

  //skip if already calculated
  if (width === undefined) {
    // Creating invisible container
    const outer = document.createElement('div');
    outer.style.visibility = 'hidden';
    outer.style.overflow = 'scroll'; // forcing scrollbar to appear
    // outer.style.msOverflowStyle = 'scrollbar'; // needed for WinJS apps
    document.body.appendChild(outer);

    // Creating inner element and placing it in the container
    const inner = document.createElement('div');
    outer.appendChild(inner);

    // Calculating difference between container's full width and the child width
    scrollbarWidth = (outer.offsetWidth - inner.offsetWidth);

    // Removing temporary elements from the DOM
    outer.parentNode?.removeChild(outer);
  }

  return scrollbarWidth;
}